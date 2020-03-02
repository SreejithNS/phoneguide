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
  const jsonData = priceBasedQueryRefiner(request.body);
  const db = admin.firestore().collection('phones');
  const query = queryBuilder(db, jsonData);
  query.get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        response.status(204).send("No matching phones")
        return;
      }
      var docs = [];
      snapshot.forEach(doc => docs.push(doc.data()));
      docs.sort((a, b)=>parseInt(b.antutu)-parseInt(a.antutu))
      response.status(200).send(docs.splice(0,10))
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
      case "pr":
        return "price";
    }
  }
  const query = (ref, arr, i, p) => {
    if (i < arr.length) {
      let param = parameter(arr[i][0])
      let value = p || grade(arr[i][1])
      if (value) {
        if(value==="ANDROID") return query(ref.where(param, ">", "APPLE"), arr, ++i)
        else return query(ref.where(param, "==", value), arr, ++i)
      }
    } else {
      return ref
    }
  }
  return query(ref, array, 0)
}

function priceBasedQueryRefiner(params){//This limits the query paramters values within the given range
  // NOTE: This function won't remove the price parameter ('pr') from the query
  const price = params.indexOf(params.find(parameter=>parameter[0]==="pr"))[1];
  const limitParamater = (param,limits)=>{
    limits = new Map(limits);
    if(limits.has(param) && param[1]>limits.get(param)){
      param[1] = limits.get(param)
    }
    return param;
  }
  switch(price){
    case "LOWBUDGET":
      params.forEach((param,index)=>{
        params[index] = limitParamater(param,[
          ["st",4],
          ["pe",3],
          ["ba",4],
          ["fr",3],
          ["re",4],
        ])
      })
    break;
    case "BUDGET":
      params.forEach((param,index)=>{
        params[index] = limitParamater(param,[
          ["ra",3],
          ["st",4],
          ["pe",4],
          ["ba",4],
          ["fr",4],
          ["re",4],
        ])
      })
    break;
    case "FLAGSHIP":
      params.forEach((param,index)=>{
        params[index] = limitParamater(param,[
          ["ra",4],
          ["st",4],
          ["pe",4],
          ["ba",3],
          ["fr",2],
          ["re",2],
        ])
      })
    break;
  }
  return params
}