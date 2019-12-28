import React, { Component } from 'react';
import PaperCard from './PaperCard';
import { Box } from '@material-ui/core';

export default class Questions extends Component {
    constructor() {
        super()
        this.state = {
            res: "",
            showRes: false,
            completedQuestions: [],
            questions: [
                {
                    question: "For which purpose your phone is mostly being used?",
                    id: "a1",
                    options: [
                        {
                            text: "Gaming",
                            id: "o1",
                            attr: { pe: 3, ba: 3, st: 3 }
                        },
                        {
                            text: "Photography",
                            id: "o2",
                            attr: { re: 3, pe: 2, st: 3, ba: 3 }
                        },
                        {
                            text: "Videos",
                            id: "o3",
                            attr: { re: 2, fr: 2, pe: 2, st: 3, ba: 3 }
                        },
                        {
                            text: "Social Media",
                            id: "o4",
                            attr: { re: 3, pe: 2, st: 3 }
                        }
                    ]
                },
                {
                    question: "How many apps you use at a time?",
                    id: "a2",
                    options: [
                        {
                            text: "1-2",
                            id: "o1",
                            attr: {}
                        },
                        {
                            text: "3-4",
                            id: "o2",
                            attr: { pe: 3 }
                        },
                        {
                            text: "More than that",
                            id: "o3",
                            attr: { pe: 4 }
                        }
                    ]
                },
                {
                    question: "Which socil media you use the most?",
                    id: "a3",
                    options: [
                        {
                            text: "Facebook",
                            id: "o1",
                            attr: {st:3}
                        },
                        {
                            text: "Snapchat",
                            id: "o2",
                            attr: { re: 3, fr: 3 }
                        },
                        {
                            text: "Instagram",
                            id: "o3",
                            attr: {re:3}
                        },
                        {
                            text: "Whatsapp",
                            id: "o4",
                            attr: {st:3}
                        }
                    ]
                },
                // {
                //     question: "Does your phone gets a lot of scratch and breaks?",
                //     id: "a4",
                //     options: [
                //         {
                //             text: "Yes",
                //             id: "o1",
                //             attr: { gg: 'YES' }
                //         },
                //         {
                //             text: "No",
                //             id: "o2",
                //             attr: {}
                //         }
                //     ]
                // },
                {
                    question: "Do you travel a lot?",
                    id: "a5",
                    options: [
                        {
                            text: "A lot",
                            id: "o1",
                            attr: {ba:4}
                        },
                        {
                            text: "Not often",
                            id: "o2",
                            attr: { ba: 3}
                        },
                        {
                            text: "No",
                            id: "o3",
                            attr: {}
                        }
                    ]
                },
                // {
                //     question: "Are you busy with your phone most of the time?",
                //     id: "a6",
                //     options: [
                //         {
                //             text: "Yes",
                //             id: "o1",
                //             attr: { fc: 'YES' }
                //         },
                //         {
                //             text: "No",
                //             id: "o2",
                //             attr: {}
                //         }
                //     ]
                // },
                // {
                //     question: "Does branding of the phone matters to you?",
                //     id: "a7",
                //     options: [
                //         {
                //             text: "Yes",
                //             id: "o1",
                //             attr: { br: ['APPLE', 'GOOGLE', 'SAMSUNG', 'ONEPLUS'] }
                //         },
                //         {
                //             text: "No",
                //             id: "o2",
                //             attr: { re: 3, fr: 3 }
                //         }
                //     ]
                // },
                // {
                //     question: "Do you like phone with notch?",
                //     id: "a8",
                //     options: [
                //         {
                //             text: "Yes",
                //             id: "o1",
                //             attr: {}
                //         },
                //         {
                //             text: "No",
                //             id: "o2",
                //             attr: { no: 'NO' }
                //         },
                //         {
                //             text: "Small",
                //             id: "o3",
                //             attr: { no: ['Waterdrop', 'Punch Hole'] }
                //         }
                //     ]
                // },
                {
                    question: "Does thickness of the phone matters to you?",
                    id: "a9",
                    options: [
                        {
                            text: "Yes",
                            id: "o1",
                            attr: { th: 'YES' }
                        },
                        {
                            text: "No",
                            id: "o2",
                            attr: {}
                        }
                    ]
                },
                {
                    question: "Which type of phone lover are you?",
                    id: "a11",
                    options: [
                        {
                            text: "Flagship",
                            id: "o1",
                            attr: { pr: 'FLAGSHIP' }
                        },
                        {
                            text: "Midrange",
                            id: "o2",
                            attr: {pr:'BUDGET'}
                        }
                    ]
                },
                // {
                //     question: "No matter what the internal sotrage is you always feel like using an extra memeory card?",
                //     id: "a10",
                //     options: [
                //         {
                //             text: "Yes",
                //             id: "o1",
                //             attr: { sd: 'YES' }
                //         },
                //         {
                //             text: "No",
                //             id: "o2",
                //             attr: {}
                //         }
                //     ]
                // }
            ],
            queryParams: new Map()
        }
    }

    nextQuestion = (id) => {
        let question = this.state.questions.find(q => q.id === id);
        var questions = this.state.questions;
        var completedQuestions = this.state.completedQuestions;
        completedQuestions.push(question);
        questions.splice(questions.indexOf(question), 1);

        if (!questions.length) this.sendQuery()
        this.setState({
            completedQuestions,
            questions
        })
    }

    addToQuery = (optionParams) => {
        let params = this.state.queryParams;
        for (var i in optionParams) params.set(i, optionParams[i]);
        this.setState({ queryParams: params })
    }
    sendQuery = () => {
        const query = Array.from(this.state.queryParams)
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = "http://localhost:5000/phoneguide-dev/us-central1/adminAPI/query";
        //var theUrl = "https://us-central1-phoneguide-dev.cloudfunctions.net/adminAPI/query";
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(query));
        xmlhttp.addEventListener('load', (e) => {
            const res = e.target.response
            if (res === "No matching phones") this.setState({ res: "No phones" })
            else {
                this.setState({
                    res: JSON.parse(res),
                    showRes: true
                })
            }
        })
    }
    render() {
        const { nextQuestion, addToQuery } = this;
        const { questions, showRes, res } = this.state;
        return (
            <Box my={2} style={{ position: "relative" }}>
                {(questions.length && !showRes) ? questions
                    .sort((a, b) => (parseInt(a.id.replace(/[^\d.-]/g, '')) > parseInt(b.id.replace(/[^\d.-]/g, ''))) ? -1 : 1)
                    .map((q, k) =>
                        <PaperCard question={q} offset={(parseInt(k + 5) / (questions.length + 4))} key={k} next={nextQuestion} addToQuery={addToQuery} />
                    ) : ""}
                {showRes ?
                    res.map((d, key) =>
                        <div key={key}>
                            <div>Name:{d.name}</div>
                        </div>
                    ) : ""}
                {res==="No phones"?"No Phones matched":""}
            </Box>
        )
    }
}
