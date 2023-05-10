import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { Topic } from '../interfaces';

Chart.register(...registerables);
function DoughnutChart2() {
    interface Counts {
        'Array': number;
        'Binary Tree': number;
        'Graph': number;
        'Linked List': number;
        'Dynamic Programming': number,
        'Others': number
    }

    const user = useSelector((state: RootState) => state.user);
    const [topicCounts, setTopicCounts] = useState<Counts>({
        'Array': 0,
        'Binary Tree': 0,
        'Graph': 0,
        'Linked List': 0,
        'Dynamic Programming': 0,
        'Others': 0
    });

    useEffect(() => {
        if (user) setTopicCounts(countTopicProblems(user.technicalData.topics))
    }, [user])

    const countTopicProblems = (topics: {[key: string]: Topic}) => {
        const mainTopics = ['Array', 'Binary Tree', 'Graph', 'Linked List', 'Dynamic Programming'];

        const counts: Counts = {
            'Array': 0,
            'Binary Tree': 0,
            'Graph': 0,
            'Linked List': 0,
            'Dynamic Programming': 0,
            'Others': 0
        };

        function isMainTopic(topic: string): topic is keyof Counts {
            return mainTopics.includes(topic);
        }

        let initial = user.technicalData.problems.totalProblemsSolved

        for (const topic in topics) {
            if (isMainTopic(topic)) {
                counts[topic] = topics[topic].totalTopicProblemsSolved;
                initial--;
            }
        }

        counts['Others'] = initial;

        return counts;
    }

    const isKeyOfCounts = (key: string): key is keyof Counts => {
        return key in topicCounts;
    };

    const getFilteredData = () => {
        const filteredLabels = Object.keys(topicCounts).filter((key) => {
            if (isKeyOfCounts(key)) {
                return topicCounts[key] > 0
            }
        });
        const filteredValues = filteredLabels.map((label) => {
            if (isKeyOfCounts(label)) {
                return topicCounts[label]
            }
        });

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

    const options: any = {
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
                    title: function (context: any) {
                        const index = context[0].dataIndex;
                        return data.labels[index];
                    },
                    label: function (context: any) {
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
        <div className='barContainer' style={{height: '300px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Doughnut data={data} options={options} />
        </div>
    )
}

export default DoughnutChart2;
