import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const DoughnutChart2 = (props) => {
    const topics = [
        { name: 'Arrays', count: 25 },
        { name: 'Binary Trees', count: 50 },
        { name: 'Graphs', count: 15 },
        { name: 'Linked Lists', count: 10 },
        { name: 'DP', count: 15 },
        { name: 'Others', count: 20 },
    ];

    const countTopicProblems = (topics) => {
        const mainTopics = ['Arrays', 'Binary Trees', 'Graphs', 'Linked Lists', 'DP'];
        const counts = {
            'Arrays': 0,
            'Binary Trees': 0,
            'Graphs': 0,
            'Linked Lists': 0,
            'DP': 0,
            'Others': 0
        };

        topics.forEach((topic) => {
            if (mainTopics.includes(topic.name)) {
                counts[topic.name] = topic.count;
            } else {
                counts.Others += topic.count;
            }
        });

        return counts;
    }

    const topicCounts = countTopicProblems(topics);

    const data = {
        labels: Object.keys(topicCounts),
        datasets: [
            {
                data: Object.values(topicCounts),
                backgroundColor: [
                    'rgba(41, 128, 64, 0.5)', // Green
                    'rgba(41, 93, 148, 0.5)', // Blue
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

export default DoughnutChart2;
