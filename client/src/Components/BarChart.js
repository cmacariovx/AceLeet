import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarChart = (props) => {
    const data = {
        labels: ['Arrays/Strings', 'Binary Trees', 'Graphs', 'Linked Lists', 'Dynamic Programming'],
        datasets: [{
            label: 'Average Difficulty',
            data: [3.4, 2.2, 3.7, 3.1, 4.4],
        }]
    }

    const options = {
        barThickness: 12,
        borderWidth: 0,
        borderColor: 'rgba(0, 0, 0, 0)',
        backgroundColor: '#2c7be5',
        borderRadius: 10,
        base: 0,
        scales: {
            y: {
                border: {
                    display: false,
                    dash: [3, 4]
                },
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
            },
            x: {
                border: {
                    display: false,
                },
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
                enabled: false,
            }
        },
    }

    return (
        <>
            <Bar data={data} options={options} />
        </>
    )
}

export default BarChart;
