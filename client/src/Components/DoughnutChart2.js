import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';

const DoughnutChart2 = (props) => {
    const user = useSelector(state => state.user);
    const [topics, setTopics] = useState([]);
    const [topicCounts, setTopicCounts] = useState({});

    useEffect(() => {
        if (user) setTopicCounts(countTopicProblems(user.technicalData.topics))
    }, [user])

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

        for (const topic in topics) {
            if (mainTopics.includes(topic)) {
                counts[topic] = topics[topic].totalTopicProblemsSolved;
            } else {
                counts.Others += topics[topic].totalTopicProblemsSolved;
            }
        }

        return counts;
    }

    const getFilteredData = () => {
        const filteredLabels = Object.keys(topicCounts).filter((key) => topicCounts[key] > 0);
        const filteredValues = filteredLabels.map((label) => topicCounts[label]);

        // If all values are zero, set "Others" to 0.1
        if (filteredValues.every((value) => value === 0)) {
            filteredLabels.push('Others');
            filteredValues.push(0.1);
        }

        return { filteredLabels, filteredValues };
    };

    const { filteredLabels, filteredValues } = getFilteredData();

    const data = {
        labels: filteredLabels,
        datasets: [
            {
                data: filteredValues,
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
                        return context.parsed == 0.1 ? '0 Questions' : context.parsed + ' Questions';
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
