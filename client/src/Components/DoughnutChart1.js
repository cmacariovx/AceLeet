import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';

const DoughnutChart1 = (props) => {
    const user = useSelector(state => state.user)

    const [totalEasy, setTotalEasy] = useState(null);
    const [totalMedium, setTotalMedium] = useState(null);
    const [totalHard, setTotalHard] = useState(null);

    useEffect(() => {
        if (user) {
            setTotalEasy(user.technicalData.problems.totalEasySolved);
            setTotalMedium(user.technicalData.problems.totalMediumSolved);
            setTotalHard(user.technicalData.problems.totalHardSolved);
        }
    }, [user])

    const getFilteredData = () => {
        const labels = ['Easy', 'Medium', 'Hard'];
        const values = [(totalEasy || 0), (totalMedium || 0), (totalHard || 0)];

        const filteredLabels = labels.filter((_, index) => values[index] > 0);
        const filteredValues = values.filter((value) => value > 0);

        if (filteredValues.length === 0) {
            filteredLabels.push('Easy');
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
                        return context.parsed == 0.1 ? '0 Questions' : context.parsed + ' Questions' ;
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

export default DoughnutChart1;
