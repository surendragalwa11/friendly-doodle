import React from 'react';
import { Bar } from 'react-chartjs-2';


export default class BarChart extends React.Component {
    render() {
        const state = {
            labels: ['Correct Answers', 'Wrong Ansers'],
            datasets: [
                {
                    label: 'Exam Result',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: this.props.data,
                }
            ]
        };

        return (
            <div>
                <Bar
                    data={state}
                    width={650}
                    height={500}
                    // options={{ maintainAspectRatio: false }}
                    options={{
                        title: {
                            display: true,
                            text: 'Result',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        },
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
}