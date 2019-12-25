import React, { Component } from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/styles";
import './radioButton.css';
class PaperCard extends Component {
  state = {
    selected: "",
    fade:false
  };
  onChange = event => {
    let selected = event.target.value;
    this.setState({
      selected
    });
    let option = this.props.question.options.find(opt=>opt.id===selected)
    this.props.addToQuery(option.attr)
    setTimeout(()=>this.setState({fade:true}),500);
    setTimeout(()=>this.props.next(this.props.question.id),1000)
  };
  useStyles = makeStyles((theme) => createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }));
  render() {
    const { selected,fade } = this.state;
    const { classes, question, offset } = this.props;
    return (
      <div className={classes.root} style={{ transform: `translate(${/*(fade)?"-35%":*/"-50%"},${(fade)?"80":offset * 200 - 200}px) scale(${offset})`,opacity:(fade)?"0%":"100%",transition:"0.5s" }}>
        <div className={classes.cardContent}>
          <div className={classes.question}>{question.question}</div>
          <form className={classes.form}>
            {question.options.map((opt, key) => (
              <div key={key} id={question.id + opt.id} className={classes.option}>
                <label className="btn-radio">
                  <input
                    type="radio"
                    onChange={this.onChange}
                    value={opt.id}
                    checked={opt.id === selected}
                  />
                  <svg width="20px" height="20px" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="9"></circle>
                    <path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" className="inner"></path>
                    <path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" className="outer"></path>
                  </svg>
                  <span>{opt.text}</span>
                </label>
              </div>
            ))}
          </form>
        </div>  
      </div>
    );
  }
}

export default withStyles((theme) => {
  console.log(theme)
  return createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      padding: 16,
      position: 'absolute',
      textAlign: 'center',
      boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.16)",
      width: "90%",
      left: "50%",
      top: '16px',
      borderRadius: "8px",
      height: "300px",
      maxWidth: "95%"
    },
    question: {
      fontSize: "2.1em",
      letterSpacing: "-1px",
      color: "#282828e0"
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
      margin: "8px",
    }
  })
})(PaperCard)