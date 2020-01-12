import React, { Component } from 'react';
import PaperCard from './PaperCard';
import { Box, Grid } from '@material-ui/core';
import PhoneCard from './PhoneCard';
import NoMatch from './NoMatch';

export default class Questions extends Component {
    constructor() {
        super()
        this.state = {
            lastQueryParams: [],
            lastQueriedPhones: [],
            phones: [],
            showMatch: false,
            skipBasics: false,
            questionLoad: { load: false, questionId: "" },
            noMatch: false,
            completedQuestions: [],
            dynamicQuestions: {
                questions: [
                    {
                        question: "Does your phone gets a lot of scratch and breaks?",
                        id: "a4",
                        check: 1,
                        options: [
                            {
                                text: "Yes",
                                id: "o1",
                                attr: { gg: 'YES' }
                            },
                            {
                                text: "No",
                                id: "o2",
                                attr: {}
                            }
                        ]
                    },
                    {
                        question: "Are you busy with your phone most of the time?",
                        id: "a6",
                        check: 1,
                        options: [
                            {
                                text: "Yes",
                                id: "o1",
                                attr: { fc: 'YES' }
                            },
                            {
                                text: "No",
                                id: "o2",
                                attr: {}
                            }
                        ]
                    },
                    {
                        question: "No matter what the internal sotrage is you always feel like using an extra memeory card?",
                        id: "a10",
                        check: 1,
                        options: [
                            {
                                text: "Yes",
                                id: "o1",
                                attr: { sd: 'YES' }
                            },
                            {
                                text: "No",
                                id: "o2",
                                attr: {}
                            }
                        ]
                    },
                    {
                        question: "Do you like phone with notch?",
                        id: "a8",
                        check: 1,
                        options: [
                            {
                                text: "No",
                                id: "o1",
                                attr: {}
                            },
                            {
                                text: "Water Drop",
                                id: "o2",
                                attr: { no: 'Waterdrop' }
                            },
                            {
                                text: "Punch Hole",
                                id: "o3",
                                attr: { no: 'Punch Hole' }
                            }
                        ]
                    }
                ],
            },
            questions: [
                {
                    question: "For which purpose your phone is mostly being used?",
                    id: "a1",
                    check: 2,
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
                    check: 1,
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
                    question: "Which social media you use the most?",
                    id: "a3",
                    check: 1,
                    options: [
                        {
                            text: "Facebook",
                            id: "o1",
                            attr: { st: 3 }
                        },
                        {
                            text: "Snapchat",
                            id: "o2",
                            attr: { re: 3, fr: 3 }
                        },
                        {
                            text: "Instagram",
                            id: "o3",
                            attr: { re: 3 }
                        },
                        {
                            text: "Whatsapp",
                            id: "o4",
                            attr: { st: 3 }
                        }
                    ]
                },
                {
                    question: "Do you travel a lot?",
                    id: "a5",
                    check: 1,
                    options: [
                        {
                            text: "Yes (with power bank)",
                            id: "o1",
                            attr: {}
                        },
                        {
                            text: "Yes",
                            id: "o2",
                            attr: { ba: 4 }
                        },
                        {
                            text: "No",
                            id: "o3",
                            attr: {}
                        }
                    ]
                },

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
                {
                    question: "Does thickness of the phone matters to you?",
                    id: "a9",
                    check: 1,
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
                    question: "How much are looking for to invest on your next phone?",
                    id: "a0",
                    check: 1,
                    options: [
                        {
                            text: "A good budget",
                            id: "o1",
                            attr: { pr: 'FLAGSHIP' }
                        },
                        {
                            text: "To full my basic needs",
                            id: "o2",
                            attr: { pr: 'BUDGET' }
                        }
                    ]
                },

            ],
            queryParams: new Map()
        }
    }


    nextQuestion = (thisQuestionId) => {
        let question = this.state.questions.find(q => q.id === thisQuestionId);
        var questions = this.state.questions;
        var completedQuestions = this.state.completedQuestions;
        completedQuestions.push(question);

        this.sendQuery(false, (isEmptyRes) => {
            this.setState({
                questionLoad: { load: true, questionId: thisQuestionId, remove: false, phones: !isEmptyRes },
                completedQuestions
            })
            setTimeout(() => {
                this.setState({
                    questionLoad: { load: true, questionId: thisQuestionId, remove: true, phones: !isEmptyRes },
                })
            }, 200)
            setTimeout(() => {
                questions.splice(questions.indexOf(question), 1);
                this.setState({
                    questions,
                    skipBasics: isEmptyRes
                })
            }, 700)
            setTimeout(() => {
                if (isEmptyRes) { questions = [] }
                this.setState({
                    questions
                })
                this.dynamicQuestions()
            }, 1000)
        })
        this.setState({
            completedQuestions,
            questions,
            questionLoad: { load: true, questionId: thisQuestionId, remove: false }
        })
    }

    addToQuery = (optionParams) => {
        this.setState(({ queryParams }) => {
            const lastQueryParams = new Map(queryParams)
            for (var i in optionParams) {
                if (queryParams.has(i) && queryParams.get(i) < optionParams[i]) queryParams.set(i, optionParams[i])
                else if (!queryParams.has(i)) queryParams.set(i, optionParams[i])
            };
            return { queryParams, lastQueryParams }
        })
    }
    sendQuery = (isLastQuestion, callback) => {
        const query = Array.from(this.state.queryParams)
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        //var url = "http://localhost:5000/phoneguide-dev/us-central1/adminAPI/query";
        //var url = "https://us-central1-phoneguide-dev.cloudfunctions.net/adminAPI/query";
        var url = "https://us-central1-twominutephones.cloudfunctions.net/adminAPI/query";
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(query));
        xmlhttp.addEventListener('load', (e) => {
            const _raw = e.target;
            const status = _raw.status
            const lastQueriedPhones = this.state.phones;
            const phones = (status !== 204) ? JSON.parse(_raw.response) : {}
            if (status === 204) this.setState({ lastQueriedPhones, phones: [] })
            else {
                this.setState({
                    phones: phones,
                    noMatch: !!isLastQuestion
                })
            }
            if (callback) callback(status === 204);
        })
    }
    dynamicQuestions = () => {
        const { questions, noMatch, phones, skipBasics, dynamicQuestions} = this.state;
        if (dynamicQuestions.questions.length === 0 && phones.length) {
            this.setState({
                showMatch: true,
            })
            return;
        }
        if (dynamicQuestions.questions.length === 0 && phones.length === 0) {
            this.setState({
                noMatch: true
            })
            return;
        }
        if (                        // Case: After basic question still with more than one phone
            !questions.length &&
            !noMatch &&
            phones.length > 1 &&
            !skipBasics
        ) {
            let question = dynamicQuestions.questions.pop()
            this.setState((state) => {
                return {
                    questions: [...state.questions, question],
                    dynamicQuestions
                }
            })
            return
        } else if (                  // Case: Zero match between basic questions
            !questions.length &&
            !noMatch &&
            skipBasics
        ) {
            let question = dynamicQuestions.questions.pop()
            this.setState((state) => {
                return {
                    questions: [...state.questions, question],
                    dynamicQuestions,
                    queryParams: new Map(state.lastQueryParams),
                    skipBasics: false
                }
            })
        }else if(phones.length===1){
            this.setState({
                skipBasics:true,
                questions:[],
                showMatch:true
            })
        }


    }
    render() {
        const { nextQuestion, addToQuery } = this;
        const { questions, noMatch, phones, questionLoad, skipBasics, showMatch } = this.state;
        return (
            <Box my={2}>

                    <div style={{ position: "relative" }}>
                        {(questions.length && !showMatch) ? questions
                            .sort((a, b) => (parseInt(a.id.replace(/[^\d.-]/g, '')) > parseInt(b.id.replace(/[^\d.-]/g, ''))) ? -1 : 1)
                            .map((q, k) =>
                                
                                    <PaperCard skip={skipBasics} question={q} loader={(q.id === questionLoad.questionId) ? questionLoad : { load: false, remove: false }} offset={(parseInt(k + 5) / (questions.length + 4))} key={k} next={nextQuestion} addToQuery={addToQuery} />
                                
                            ) : ""}
                    </div>
                    <Grid container direction="row" justify="center" alignItems="center">
                    {showMatch ?
                        phones.map((d, key) =>
                            <PhoneCard key={key} phone={d} />
                        ) : ""}
                    {noMatch ? <NoMatch /> : ""}
                    </Grid>

            </Box>
        )
    }
}
