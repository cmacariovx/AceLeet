import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const DonutDemo = (props) => {
    const data = {
        labels: ['Array', 'Binary Tree', 'Graph', 'Linked List', 'Dynamic Programming'],
        datasets: [
            {
                data: [15, 23, 18, 12, 8],
                backgroundColor: [
                    'rgba(72, 212, 109, 0.5)', // Green
                    'rgba(60, 131, 207, 0.5)', // Blue
                    'rgba(255, 159, 64, 0.5)', // Orange
                    'rgba(255, 51, 51, 0.5)', // Red
                    'rgba(255, 205, 86, 0.5)', // Yellow
                    'rgba(90, 98, 239, 0.5)', // Indigo
                ],
                hoverBackgroundColor: [
                    'rgba(42, 209, 95, 1)',
                    'rgba(44, 123, 229, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 51, 51, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(90, 98, 239, 1)',
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
                    padding: 18,
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
                        return context.parsed + ' Questions';
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
        <div className='barContainer' style={{height: '300px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Doughnut data={data} options={options} />
        </div>
    )
}

export default DonutDemo;
