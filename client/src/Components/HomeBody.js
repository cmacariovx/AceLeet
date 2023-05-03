import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import StatusCircle from "./StatusCircle";
import LineChart from "./LineChart";
import { useSelector } from "react-redux";
import readJsonFile from "../readJsonFile";

import { useNavigate } from "react-router-dom";

import './HomeBody.css'
import DoughnutChart1 from "./DoughnutChart1";
import DoughnutChart2 from "./DoughnutChart2";

function HomeBody() {
    const [isOpen1, setIsOpen1] = useState(true);
    const [isOpen2, setIsOpen2] = useState(true);
    const [topicWeights, setTopicWeights] = useState(null);
    const [topicProblems, setTopicProblems] = useState(null);
    const [recommendedProblems, setRecommendedProblems] = useState([]);
    const [recommendedTopics, setRecommendedTopics] = useState([]);
    const [currentTime, setCurrentTime] = useState(Date.now());

    const navigate = useNavigate();

    const user = useSelector(state => state.user);
    const token = useSelector(state => state.auth.token);

    const [totalProblems, setTotalProblems] = useState(null);
    const [solvedRatio, setSolvedRatio] = useState(null);
    const [totalHours, setTotalHours] = useState(null);
    const [sixWeekAvgDiff, setSixWeekAvgDiff] = useState(null);

    function avgDifficultyHistory() {
        const sixWeeksAgo = Date.now() - 6 * 7 * 24 * 60 * 60 * 1000;
        const pastSixWeeksData = user.technicalData.averageDifficultyIntervals.filter(
            interval => interval.timestamp >= sixWeeksAgo
        );

        const weeklyAverageDifficulty = calculateWeeklyAverageDifficulty(pastSixWeeksData, user.joinedDate);
        return weeklyAverageDifficulty;
    }

    function calculateWeeklyAverageDifficulty(data, userJoinDate) {
        const weeks = groupDataByWeek(data, userJoinDate);
        const lastSixWeeks = weeks.slice(-6); // Get the last 6 weeks
        return lastSixWeeks.map(weekData => {
            if (weekData.length === 0) {
                return null;
            }
            const total = weekData.reduce((sum, item) => sum + item.overallAverageDifficulty, 0);
            return total / weekData.length;
        });
    }

    function groupDataByWeek(data, userJoinDate) {
        const weeks = [];
        const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

        data.sort((a, b) => a.timestamp - b.timestamp);
        let weekStart = new Date(userJoinDate).getTime();
        let weekData = [];

        data.forEach(item => {
            if (item.timestamp >= weekStart && item.timestamp < weekStart + weekInMilliseconds) {
                weekData.push(item);
            }
            else {
                weeks.push(weekData);
                weekData = [item];
                weekStart += weekInMilliseconds;
            }
        });

        if (weekData.length > 0) {
            weeks.push(weekData);
        }

        while (weeks.length < 6) {
            weeks.unshift([]);
        }

        return weeks;
    }

    async function getTopics() {
        const topicWeights = await readJsonFile('topicWeights.json');
        const topicProblems = await readJsonFile('topicProblems.json');
        setTopicWeights(topicWeights);
        setTopicProblems(topicProblems);
    }

    useEffect(() => {
        getTopics();
    }, [])


    // ------------------------------------------------------


    function recommendTopicsAndProblems(user, topicWeights, topicProblems) {
        const practicedTopics = getPracticedTopics(user);
        const scheduledTopics = getScheduledTopics(user, practicedTopics);
        const additionalTopics = getAdditionalTopics(user, practicedTopics, topicWeights, 5 - scheduledTopics.length, scheduledTopics);

        const recommendedTopics = [...scheduledTopics, ...additionalTopics];
        const recommendedProblems = recommendProblems(user, recommendedTopics, topicProblems);

        return {
            recommendedTopics,
            recommendedProblems: recommendedProblems.slice(0, 10),
        };
    }

    function getPracticedTopics(user) {
        const practicedTopics = new Set();

        for (const topic in user.technicalData.topics) {
            const topicData = user.technicalData.topics[topic];
            if (topicData.topicProblemsSolved.length > 0) {
                practicedTopics.add(topic);
            }
        }

        return practicedTopics;
    }

    function getScheduledTopics(user, practicedTopics) {
        const scheduledTopics = [];

        for (const topic of practicedTopics) {
            const topicData = user.technicalData.topics[topic];

            const lastPracticed = topicData.lastPracticed || 0;
            const schedule = topicData.schedule;
            const elapsedTime = Math.floor((currentTime - lastPracticed) / (1000 * 60 * 60 * 24));

            const scheduleIdx = topicData.scheduleIdx;
            topicData.name = topic;

            if (scheduleIdx > -1 && Math.round(elapsedTime) === schedule[scheduleIdx]) {
                const averageDifficulty = topicData.averageTopicDifficulty;
                const averageTime = topicData.averageTopicTime;
                const solvedRatio = (topicData.totalTopicProblemsSolved / topicData.totalTopicProblemsAttempted) || 0.01;

                const priorityScore = calculatePriorityScore(averageDifficulty, averageTime, solvedRatio);
                topicData.priorityScore = priorityScore;

                scheduledTopics.push(topicData);
            }
        }

        // Sort scheduledTopics by priorityScore in descending order and return the top 3 topics
        return scheduledTopics.sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 3);
    }

    function getAdditionalTopics(user, practicedTopics, topicWeights, numAdditionalTopics, scheduledTopics) {
        const additionalTopics = [];

        const sortedTopicWeights = Object.entries(topicWeights)
            .filter(([topic]) => !practicedTopics.has(topic))
            .sort((a, b) => b[1] - a[1]);

        for (const [topic] of sortedTopicWeights) {
            if (additionalTopics.length + scheduledTopics.length < 5) {
                let newTopic = user.technicalData.topics[topic];
                newTopic.name = topic;
                newTopic.priorityScore = 0.40;
                additionalTopics.push(newTopic);
            }
            else break;
        }

        return additionalTopics;
    }

    function recommendProblems(user, recommendedTopics, topicProblems) {
        const recommendedProblems = [];

        recommendedTopics.forEach((topic, index) => {
            const priorityScore = topic.priorityScore || 0.40;
            const problems = getFilteredProblems(topic, topicProblems, "Easy", "Medium", priorityScore <= 40 ? 50 : 40);

            const numProblemsToRecommend = index < 2 ? 3 : 2;
            recommendedProblems.push(problems.slice(0, numProblemsToRecommend));
        });

        return recommendedProblems;
    }

    function getFilteredProblems(topic, topicProblems, minDifficulty, maxDifficulty, minAccRate) {
        const problems = topicProblems[topic.name];

        return problems.filter(
            (problem) =>
                !user.technicalData.topics[topic.name].topicProblemsSolved.includes(problem.frontendQuestionId) &&
                (problem.difficulty === minDifficulty || problem.difficulty === maxDifficulty) &&
                problem.acRate >= minAccRate
        );
    }

    function calculatePriorityScore(averageDifficulty, averageTime, solvedRatio) {
        // Normalize the inputs based on your desired scaling factors
        const normalizedAvgDifficulty = averageDifficulty / 5;
        const normalizedAvgTime = averageTime / 1000;
        const normalizedSolvedRatio = solvedRatio;

        const priorityScore = normalizedAvgDifficulty * 0.60 + normalizedAvgTime * 0.10 + normalizedSolvedRatio * 0.30;

        return priorityScore;
    }

    function daysAgo(timestamp) {
        const now = new Date();
        const lastPracticedDate = new Date(timestamp);
        const differenceInTime = now - lastPracticedDate;
        const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

        return Math.floor(differenceInDays) == 0 ? 'Today' : `${Math.floor(differenceInDays)} days ago`;
    }

    function getPriorityLabel(priorityScore) {
        if (priorityScore < 0.3) return "Low";
        else if (priorityScore < 0.45) return "Medium";
        else return "High";
    }

    useEffect(() => {
        if (user && topicWeights && topicProblems) {
            setTotalProblems(user.technicalData.problems.totalProblemsSolved);
            setSolvedRatio(((user.technicalData.problems.totalProblemsSolvedWithoutSolution /
            user.technicalData.problems.totalProblemsSolved) * 100).toFixed(0));
            setTotalHours(((user.technicalData.totalPracticeTime) / 60 / 60).toFixed(2));
            setSixWeekAvgDiff(avgDifficultyHistory);
            const recommended = recommendTopicsAndProblems(user, topicWeights, topicProblems);
            setRecommendedProblems(recommended.recommendedProblems);
            setRecommendedTopics(recommended.recommendedTopics);
        }
    }, [user, topicWeights, topicProblems])

    return (
        <div className="homeBodyContainer">
            <div className="homeBodyContainerOverview">
                <div className="homeBodyContainerOverviewLeft">
                    <p className="homeBodySmallText">OVERVIEW</p>
                    <p className="homeBodyHeaderText">Dashboard</p>
                </div>
                <div className="homeBodyContainerOverviewRight">
                    <button className="homeBodyContainerOverviewRightButton" onClick={() => navigate('/new-problem')}>New Problem</button>
                </div>
            </div>
            <div className="homeBodyContainerKPIs">
                <div className="homeBodyContainerKPI">
                    <div className="homeBodyContainerKPILeft">
                        <p className="homeBodyContainerKPILeftUpper">TOTAL PROBLEMS SOLVED</p>
                        <p className="homeBodyContainerKPILeftLower">{totalProblems ? totalProblems : 0}</p>
                    </div>
                    <div className="homeBodyContainerKPIRight">
                        <i className="fa-solid fa-code"></i>
                    </div>
                </div>
                <div className="homeBodyContainerKPI">
                    <div className="homeBodyContainerKPILeft">
                        <p className="homeBodyContainerKPILeftUpper">TOTAL PRACTICE HOURS</p>
                        <p className="homeBodyContainerKPILeftLower">{totalHours ? totalHours : 0}</p>
                    </div>
                    <div className="homeBodyContainerKPIRight">
                        <i className="fa-regular fa-clock"></i>
                    </div>
                </div>
                <div className="homeBodyContainerKPI">
                    <div className="homeBodyContainerKPILeft">
                        <p className="homeBodyContainerKPILeftUpper">SOLVED W/O SOLUTION</p>
                        <p className="homeBodyContainerKPILeftLower">{solvedRatio !== null && solvedRatio !== NaN ? solvedRatio + '%' : 0 + '%'}</p>
                    </div>
                    <div className="homeBodyContainerKPIRight">
                        <i className="fa-regular fa-object-ungroup"></i>
                    </div>
                </div>
            </div>
            <div className="homeBodyDailyRecommendedContainer">
            <div className="homeBodyDailyRecommendedUpper" style={isOpen1 ? {overflow: 'hidden'} : {overflow: 'visible'}}>
                    <div className="homeBodyDailyRecommendedUpper1">
                        <div className="homeBodyDailyRecommendedUpperText1" style={!isOpen1 ? {borderRadius: 10} : null} onClick={() => setIsOpen1(!isOpen1)}>
                            <p className="homeBodyDailyRecommendedUpperText11">Recommended Topics to Revisit</p>
                            {isOpen1 ? <i className="fa-solid fa-chevron-up"></i> :
                            <i className="fa-solid fa-chevron-down"></i>}
                        </div>
                        {isOpen1 && <div className="homeBodyDailyRecommendedUpperText2Container">
                            <p className="homeBodyDailyRecommendedUpperText2">PRIORITY</p>
                            <p className="homeBodyDailyRecommendedUpperText22">TOPIC</p>
                            <p className="homeBodyDailyRecommendedUpperText23">LAST PRACTICED</p>
                        </div>}
                    </div>
                    {isOpen1 && <>
                        {recommendedTopics.length > 0 &&
                        recommendedTopics.map((topic, index) => (
                            <div key={index} className="homeBodyDailyRecommendedUpperOption">
                                <p className={`homeBodyDailyRecommendedUpperOptionText1 ${
                                    getPriorityLabel(topic.priorityScore) === 'High' ? 'blueText1' :
                                    getPriorityLabel(topic.priorityScore) === 'Medium' ? 'blueText2' : 'blueText3'
                                }`}>
                                    {getPriorityLabel(topic.priorityScore)}
                                </p>
                                <p className="homeBodyDailyRecommendedUpperOptionText2 blueText">{topic.name}</p>
                                <p className="homeBodyDailyRecommendedUpperOptionText3">{topic.lastPracticed ? daysAgo(topic.lastPracticed) : 'New'}</p>
                            </div>
                        ))}
                    </>}
                </div>
                <div className="homeBodyDailyRecommendedLower" style={isOpen2 ? {overflow: 'hidden'} : {overflow: 'visible'}}>
                    <div className="homeBodyDailyRecommendedLower1">
                        <div className="homeBodyDailyRecommendedLowerText1" style={!isOpen2 ? {borderRadius: 10} : null} onClick={() => setIsOpen2(!isOpen2)}>
                            <p className="homeBodyDailyRecommendedLowerText11">Recommended Problems</p>
                            {isOpen2 ? <i className="fa-solid fa-chevron-up"></i> :
                            <i className="fa-solid fa-chevron-down"></i>}
                        </div>
                        {isOpen2 && <div className="homeBodyDailyRecommendedLowerText2Container">
                            <p className="homeBodyDailyRecommendedLowerText2">STATUS</p>
                            <p className="homeBodyDailyRecommendedLowerText22">PROBLEM</p>
                            <p className="homeBodyDailyRecommendedLowerText23">TOPICS</p>
                            <p className="homeBodyDailyRecommendedLowerText24">DIFFICULTY</p>
                        </div>}
                    </div>
                    {isOpen2 && <>
                        {recommendedProblems.length > 0 &&
                            recommendedProblems.map((problemsForTopic, topicIndex) => (
                                <>
                                    {topicIndex < recommendedProblems.length && <p className="homeBodyDailyRecommendedDivider">{recommendedTopics[topicIndex].name}</p>}
                                    {problemsForTopic.map((problem, index) => (
                                        <div key={index} className="homeBodyDailyRecommendedLowerOption" onClick={() =>
                                            window.open(
                                                "https://leetcode.com/problems/" +
                                                problem.title
                                                    .split(" ")
                                                    .join("-")
                                                    .toLowerCase() +
                                                "/",
                                                "_blank"
                                            )
                                        }>
                                            <div className="homeBodyDailyRecommendedLowerOptionText1 blueText2"><StatusCircle color={'yellow'}/></div>
                                            <p className="homeBodyDailyRecommendedLowerOptionText2 blueText">{problem.frontendQuestionId + '. ' + problem.title}</p>
                                            <div className="homeBodyDailyRecommendedLowerTopics">
                                                {problem.topicTags.map((tag, tagIndex) => (
                                                    <p key={tagIndex} className="homeBodyDailyRecommendedLowerTopic">{tag}</p>
                                                ))}
                                            </div>
                                            <p className={`homeBodyDailyRecommendedLowerOptionText3 ${
                                                problem.difficulty === 'Easy' ? 'greenText' :
                                                problem.difficulty === 'Medium' ? 'yellowText' : 'redText'
                                            }`}>
                                                {problem.difficulty}
                                            </p>
                                        </div>
                                    ))}
                                </>
                            ))
                        }
                    </>}
                </div>
            </div>
            <div className="homeBodyChartsContainer">
                <div className="homeBodyChartsContainerUpper">
                    <div className="homeBodyChartsContainerUpperLeft">
                        <div className="homeBodyChartsContainerUpperLeftUpper">
                            <p className="homeBodyChartsContainerUpperLeftUpperText">Average Difficulty Per Topic</p>
                        </div>
                        <div className="homeBodyChartsContainerUpperLeftLower">
                            <BarChart />
                        </div>
                    </div>
                    <div className="homeBodyChartsContainerUpperRight">
                        <div className="homeBodyChartsContainerUpperRightUpper">
                            <p className="homeBodyChartsContainerUpperRightUpperText">Difficulty</p>
                        </div>
                        <div className="homeBodyChartsContainerUpperRightLower">
                            <DoughnutChart1 />
                        </div>
                    </div>
                </div>
                <div className="homeBodyChartsContainerLower">
                    <div className="homeBodyChartsContainerLowerLeft">
                        <div className="homeBodyChartsContainerLowerLeftUpper">
                            <p className="homeBodyChartsContainerLowerLeftUpperText">Topics</p>
                        </div>
                        <div className="homeBodyChartsContainerLowerLeftLower">
                            <DoughnutChart2 />
                        </div>
                    </div>
                    <div className="homeBodyChartsContainerLowerRight">
                        <div className="homeBodyChartsContainerLowerRightUpper">
                            <p className="homeBodyChartsContainerLowerRightUpperText">Average Difficulty - Past 6 Weeks</p>
                            {/* <p className="homeBodyChartsContainerLowerRightUpperText2">36% Improvement</p> */}
                        </div>
                        <div className="homeBodyChartsContainerLowerRightLower">
                            <LineChart dataSet={sixWeekAvgDiff}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeBody;
