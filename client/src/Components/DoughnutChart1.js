import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const DoughnutChart1 = (props) => {
    const data = {
        labels: ['Easy', 'Medium', 'Hard'],
        datasets: [
            {
                data: [25, 50, 25],
                backgroundColor: [
                    'rgba(148, 250, 89, 0.7)', // Green
                    'rgba(255, 215, 115, 0.7)', // Yellow
                    'rgba(255, 83, 83, 0.7)', // Red
                ],
                hoverBackgroundColor: [
                    'rgba(148, 250, 89, 1)', // Green
                    'rgba(255, 215, 115, 1)', // Yellow
                    'rgba(255, 83, 83, 1)', // Red
                ],
                borderWidth: 4,
                borderColor: 'rgba(255, 255, 255, 1)',
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    boxWidth: 6,
                    boxHeight: 6,
                    font: {
                        size: 12,
                    },
                    color: '#95aac9',
                    padding: 24,
                },
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    title: function (context) {
                        const index = context[0].dataIndex;
                        return data.labels[index];
                    },
                    label: function (context) {
                        return context.parsed + '%';
                    },
                },
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: { size: 12, weight: 'normal' },
                bodyFont: { size: 12, weight: 'normal' },
                boxWidth: 10,
                boxHeight: 10,
                padding: 12,
                usePointStyle: true,
            },
        },
        cutout: '86%',
    };

    return (
        <div>
            <Doughnut data={data} options={options} />
        </div>
    )
}

export default DoughnutChart1;
