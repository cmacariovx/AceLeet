import React from 'react';
import { Line } from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js/auto';
Chart.register(...registerables);

function LineChart(props: {dataSet: (number | null)[] | null}) {
    const data = {
        labels: ['5 wks ago', '4 wks ago', '3 wks ago', '2 wks ago', 'Last week', 'Current'],
        datasets: [
            {
                label: 'Average Difficulty',
                data: props.dataSet,
                borderColor: 'rgba(44, 123, 229, 0.7)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(44, 123, 229, 0.7)',
                pointHoverBackgroundColor: 'rgba(44, 123, 229, 1)',
            },
        ]
    };

    const options = {
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 5,
                stepSize: 1,
                grid: {
                    display: true,
                    color: '#dce1e8',
                    drawBorder: false,
                },
                ticks: {
                    stepSize: 1,
                    color: '#95aac9',
                    borderWidth: 0,
                    font: {
                        size: 12
                    },
                },
                border: {
                    display: false,
                    dash: [3, 4]
                },
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#95aac9',
                    font: {
                        size: 10
                    }
                }
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            }
        },
    }

    return (
        <div className='barContainer' style={{height: '300px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Line data={data} options={options}/>
        </div>
    )
}

export default LineChart;
