import React, { useState } from 'react';

import BarChart from './bar-chart';

import './index.css';

import gkQuestions from '../../data/gk-exam.json';


const Paper = (props) => {
    const [answers, setAnswers] = useState({});
    const [unAttemptedQue, setUnAttemptedQue] = useState([]);
    const [wrongAns, setWrongAns] = useState([]);
    const [percent, setPercent] = useState(null);

    const onSelect = (e, i) => {
        const newAnswers = { ...answers, [i]: e.target.value };
        setAnswers(newAnswers);
        if (unAttemptedQue.length > 0 && unAttemptedQue.indexOf(i) !== -1) {
            const newUnAttemptedQue = unAttemptedQue.filter((q) => q !== i);
            setUnAttemptedQue(newUnAttemptedQue)
        }
        console.log(e.target.value, i);
    }

    const onClear = () => {
        setAnswers({});
        setPercent(null);
        setUnAttemptedQue([]);
        setWrongAns([]);
    }

    const onSubmit = () => {
        const answeredQstn = Object.keys(answers);
        // if all question are not attempted
        if (answeredQstn.length !== gkQuestions.length) {
            const newUnAttemptedQue = [];
            gkQuestions.map((q, i) => {
                if (answeredQstn.indexOf(String(i)) === -1) {
                    newUnAttemptedQue.push(i)
                }
            });
            setUnAttemptedQue(newUnAttemptedQue);
        } else {
            // calculate marks
            const correctAnswers = gkQuestions.map(q => q.answer);
            let wrongAns = []
            correctAnswers.map((ans, i) => {
                if (answers[i] !== ans) {
                    wrongAns.push(i)
                }
            });
            setWrongAns(wrongAns);
            setPercent((1 - wrongAns.length / correctAnswers.length) * 100)
        }
    }

    const redBorder = (i) => {
        return (
            (unAttemptedQue.length > 0 && unAttemptedQue.indexOf(i) !== -1)
            ||
            (wrongAns.length > 0 && wrongAns.indexOf(i) !== -1)
        );
    }

    return (
        <div className='paper-container'>
            <div className='paper-section'>
                {
                    gkQuestions.map((que, i) => (
                        <div
                            key={answers[i] ? answers[i] + i : i}
                            arryIndex={answers[i] ? answers[i] + i : i}
                            className={redBorder(i) ? 'question-container error' : 'question-container'}
                        >
                            <p className='qstn'>
                                {i + 1}. {que.question}
                            </p>
                            <div className='options'>
                                <select value={answers[i] ? answers[i] : 'select'} onChange={(e) => onSelect(e, i)}>
                                    <option value='select' disabled hidden>Choose an option</option>
                                    {
                                        que.options.map(o => <option key={o} value={o}>{o}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                    ))
                }
                <div className='controls'>
                    <button onClick={onSubmit}>Submit</button>
                    <button onClick={onClear}>Clear</button>
                </div>
            </div>
            <div className='result-section'>
                {
                    (percent !== null) ?
                        <BarChart
                            data={[percent, 100 - percent, 0]}
                        />
                        :
                        <p>Result will appear here</p>

                }

            </div>
        </div>
    )
}

export default Paper;