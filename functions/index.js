/* eslint-disable default-case */
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
var admin = require("firebase-admin");
var serviceAccount = require("./key.json");

admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://phoneguide-dev.firebaseio.com"
  }
);
const cors = require("cors")
const express = require("express")

/* Express with CORS */
const app = express()

app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (request, response) => {
  response.send("Hello from Express on Firebase with CORS!")
})

app.post('/uploadData', function (request, response) {
  const jsonData = request.body;
  const db = admin.firestore();
  const batch = db.batch();
  jsonData.forEach(data => {
    data = emptyCheck(data);
    console.log(data);
    let ref = db.collection('phones').doc();
    batch.set(ref, data);
  })
  return batch.commit().then(function (e) {
    response.status(200).send(JSON.stringify(e))
  });
});

app.post('/query', function (request, response) {
  const jsonData = request.body;
  const db = admin.firestore().collection('phones');
  const query = queryBuilder(db, jsonData);
  query.get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        response.status(503).send("No matching phones")
        return;
      }
      var docs = [];
      snapshot.forEach(doc => docs.push(doc.data()));
      response.status(200).send(docs)
    })
    .catch(err => {
      console.log('Error getting documents', err);
      response.status(503).send("Internal server error" + JSON.stringify(err))
    });
});

const adminAPI = functions.https.onRequest(app)
function emptyCheck(data) {
  for (var i in data) {
    if (i == null || i === undefined || i === '' || data[i] === '' || data[i] === undefined) delete data[i]
  }
  return data
}
module.exports = {
  adminAPI
}

function queryBuilder(ref, array) {
  const parameter = (str) => {
    switch (str) {
      case "br":
        return "brand";
      case "pe":
        return "performance";
      case "fr":
        return "frontCamera"
      case "re":
        return "rearCamera";
      case "ba":
        return "battery";
      case "st":
        return "storage";
      case "ra":
        return "ram";
      case "fc":
        return "fastCharging";
      case "gg":
        return "gorillaGlass";
      case "no":
        return "notch";
      case "th":
        return "thickness";
      case "sd":
        return "sdCardSlot";
    }
  }
  const grade = (num) => {
    if (Array.isArray(num)) return false;
    switch (num) {
      case 4:
        return "A"
      case 3:
        return "B";
      case 2:
        return "C";
      case 1:
        return "D";
      default:
        return num;
    }
  }
  const query = (ref, arr, i,p) => {
    if (i < arr.length) {
      let param = parameter(arr[i][0])
      let value = p||grade(arr[i][1])
      console.log("Log:", param, value);
      if (value) {
        // if(fromLetters(value)<4 && value !=="YES" && value !== "NO"){
        //   return query(ref.where(param, "==", value), arr, i,toLetters(fromLetters(value)+1))
        // }else{
          return query(ref.where(param, "==", value), arr, ++i)
        //}
      }
    } else {
      return ref
    }
  }
  return query(ref, array, 0)
}
