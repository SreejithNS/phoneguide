import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid, createStyles } from "@material-ui/core";
class PhoneCard extends Component {
  state = {
    open: false
  };
  onTap = event => { };
  render() {
    //const { open } = this.state;
    const { phone, classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={6}
              container
              direction="column"
              justify="space-between"
            >
              <Grid item>
                <span className={classes.antutu}>{"ANUTUTU #" + phone.antutu}</span>
              </Grid>
              <Grid item>
                <span className={classes.brand}>{phone.brand}</span>
              </Grid>
            </Grid>
            <Grid item xs={6} className={classes.storage}>
              <span style={{ fontSize: "0.4em", verticalAlign: "90%" }}>
                GB
              </span>
              {phone.storageValue}
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <span className={classes.phoneName}>{phone.name.split(" ").splice(1, phone.name.split(" ").length).join(" ")}</span>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item sm={6} className={classes.frontCamera}>
              FRONT {phone.frontCameraValue}MP
            </Grid>
            <Grid item sm={6} className={classes.frontCamera}>
              BATTERY {phone.batteryValue}mAh
            </Grid>
            <Grid item sm={6} className={classes.frontCamera}>
              BACK {phone.rearCameraValue}MP
            </Grid>
            <Grid item sm={6} className={classes.frontCamera}>
              RAM {phone.rearCameraValue}GB
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles((theme) => {
  return createStyles({
    root: {
      padding: 16,
      boxShadow: "10px 10px 20px 4px rgba(0, 0, 0, 0.17)",
      width: "90%",
      borderRadius: "12px",
      height: "auto",
      maxWidth: "600px",
      backgroundColor: theme.palette.background.paper,
      margin: "12px"
    },
    storage: {
      textAlign: "right",
      fontSize: "2.2em",
      fontFamily: "'Roboto Condensed', sans-serif;"
    },
    antutu: {
      color: "#0000009f",
      fontFamily: "'Open Sans Condensed', sans-serif",
      fontSize: "0.8em",
      letterSpacing: "2px"
    },
    brand: {
      color: "#000000bb",
      fontFamily: "'Rubik', sans-serif",
      fontSize: "1.2em",
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    phoneName: {
      textAlign: "left",
      fontFamily: "'Rubik', sans-serif",
      fontSize: "2.5em",
      marginTop: "-10px",
      marginLeft: "-3px"
    },
    frontCamera: {
      fontFamily: "'Roboto', sans-serif",
      color: "#00000099",
      fontSize: "1em"
    }
  });
})(PhoneCard);
