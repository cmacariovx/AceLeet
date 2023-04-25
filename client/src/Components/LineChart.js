import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
    const data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [
            {
                label: 'Average Difficulty',
                data: [4.7, 4.2, 2.9, 2.8, 2.4, 1.9],
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
        <>
            <Line data={data} options={options}/>
        </>
    )
}

export default LineChart;
