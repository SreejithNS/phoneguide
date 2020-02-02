import React, { Component } from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/styles";
import './radioButton.css';
import { Grid } from "@material-ui/core";
import Typist from 'react-typist';

function Title(props){
  if(parseInt(props.offset)!==1) return "";
  return (<Typist stdTypingDelay={25} cursor={{blink:true,hideWhenDone:true}}>{props.title}</Typist>)
}

class PaperCard extends Component {
  state = {
    selected: this.props.question.check>1?[]:"",
    fade: false
  };
  onChange = event => {
    let selected = (this.props.question.check > 1)? this.state.selected.push(event.target.value)?this.state.selected:event.target.value:event.target.value
    let option = this.props.question.options.find(opt => opt.id === event.target.value)
    this.setState({
      selected
    })
    this.props.addToQuery(option.attr)
    //setTimeout(() => this.setState({ fade: true }), 500);
    if((this.props.question.check > 1 && this.state.selected.length===this.props.question.check)||this.props.question.check === 1) {
      setTimeout(() => this.props.next(this.props.question.id), 1000)
    }
  }
  useStyles = makeStyles((theme) => createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }));
  render() {
    const { selected} = this.state;
    const { classes, question, offset, loader,skip } = this.props;
    return (
      <div className={classes.root} style={{ transform: `translate(-50%,${(loader.remove) ? "80" : offset * 200 - 200}px) scale(${loader.remove ? 0.9 : offset})`, opacity: (loader.remove || skip) ? "0%" : "100%", filter: `blur(${loader.remove ? "2px" : 0},)`,scale: `${loader.remove ? 0.5 : 1}`, transition: "all 0.5s cubic-bezier(1, -0.01, 0.58, 1) 0s" }}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
          style={{ height: 100 + "%" }}
        >
          <Grid item className={classes.question}><Title offset={offset} title={question.question}/></Grid>
          <Grid item container direction="column" justify="space-evenly" alignItems="center">
            <form style={{ width: "100%",transition:"all 0.2s cubic-bezier(1, -0.01, 0.58, 1) 0s" }}>
            {question.check>1? <div className={classes.hint}>Select {question.check} options</div>:""}
              {(!loader.load)?question.options.map((opt, key) => (
                <Grid item key={key} id={question.id + opt.id} className={classes.option} style={selected.indexOf(opt.id)>-1? { backgroundColor: "#55efc4", border: "1px solid #00000000", color: "#282828"} : {}}>
                  <label className="btn-radio">
                    <input
                      type="radio"
                      onChange={this.onChange}
                      value={opt.id}
                      checked={selected.indexOf(opt.id)>-1}
                    />
                        <svg width="20px" height="20px" viewBox="0 0 20 20">
                          <circle cx="10" cy="10" r="9"></circle>
                          <path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" className="inner"></path>
                          <path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" className="outer"></path>
                        </svg>
                        
                        <span>{opt.text}</span>
                        
                  </label>
                </Grid>
              )):<span className="pulse" style={!!loader.phones?{backgroundColor:"#55efc4"}:{}}></span>}
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles((theme) => {
  return createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      padding: 16,
      position: 'absolute',
      // textAlign: 'center',
      boxShadow: "10px 10px 20px 4px rgba(0, 0, 0, 0.17)",
      width: "100%",
      left: "50%",
      top: '16px',
      borderRadius: "12px",
      height: "350px",
      maxWidth: "600px"
    },
    question: {
      fontSize: "1.9em",
      letterSpacing: "-1px",
      color: "#282828e0",
      width: 100 + "%"
    },
    hint: {
      fontSize: "1.3em",
      letterSpacing: "1px",
      color: "#282828",
      paddingLeft:"12px",
      width: 100 + "%"
    },
    cardContent: {
      position: "relative",
      height: "100%"
    },
    form: {
      position: "absolute",
      top: "50%",
      width: "100%",
      left: "50%",
      transform: "translate(-50%,-50%)"
    },
    optionLabel: {
      fontSize: "2em",
      fontWeight: "500",
      padding: "4px",
      backgroundColor: "#00000011",
      borderRadius: "8px"
    },
    option: {
      border: "1px solid #0000001f",
      padding: "0.4em 16px",
      width: "100%",
      borderRadius: "30px",
      margin: "0.4em 0px",
      //boxShadow: "1px 2px 7px -1px rgba(0, 0, 0, 0.12)",
      transition: "0.2s",
    }
  })
})(PaperCard)