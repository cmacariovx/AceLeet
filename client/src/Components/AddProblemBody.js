import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import questionFunctions from "../leetcodeSort";
import CountdownTimer from './CountdownTimer';
import CustomSlider from "./CustomSlider";
import { PuffLoader } from 'react-spinners';

import './AddProblemBody.css';

function AddProblemBody() {
    const [questionsTrie, setQuestionsTrie] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState("");
    const [showTimer, setShowTimer] = useState(false);
    const [showLower, setShowLower] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [textError, setTextError] = useState('');
    const [completed, setCompleted] = useState(true);
    const [completedWo, setCompletedWo] = useState(true);
    const [showQuestions, setShowQuestions] = useState(false);
    const [difficulty, setDifficulty] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    const [addMode, setAddMode] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [key, setKey] = useState(0);
    const [duration, setDuration] = useState(45 * 60);
    const [sliderValue, setSliderValue] = useState(45);
    const [remainingTime, setRemainingTime] = useState(0);
    const [totalTimeTakenFancy, setTotalTimeTakenFancy] = useState(0);
    const [totalTimeTaken, setTotalTimeTaken] = useState(0);

    const user = useSelector(state => state.user);
    const token = useSelector(state => state.auth.token);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    const handleComplete = (reset = false) => {
        setIsPlaying(false);
        setIsPaused(false);

        if (!reset) {
            setShowQuestions(true);
            setTotalTimeTakenFancy(formatTime(duration - remainingTime));
            setTotalTimeTaken(duration - remainingTime);
        }

        setKey((prevKey) => prevKey + 1);
    }

    async function handleSubmit() {
        const solvedProblem = {
            title: selectedQuestion,
            difficultyLevel: selectedDifficulty,
            difficultyNum: difficulty,
            topics: selectedTopics,
            totalTime: {
                fancy: totalTimeTakenFancy,
                nonFancy: totalTimeTaken,
            },
            solved: completed,
            solvedAt: Date.now(),
            solvedWithoutSolution: completedWo,
        }

        calculateOverallAverageDifficulty(user, solvedProblem);
    }

    const handlePause = () => {
        setIsPlaying(false);
        setIsPaused(true);
    };

    const handleResume = () => {
        setIsPlaying(true);
        setIsPaused(false);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setIsPaused(false);
        handleComplete(true);
    };

    function handleStart() {
        if (isPlaying) handleComplete();
        else setIsPlaying(true);
    }

    const handleSliderChange = (event) => {
        if (isPlaying || isPaused) return;
        setSliderValue(event.target.value);
        setDuration(event.target.value * 60);
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length === 1 && inputValue === " ") return;

        setSearchTerm(inputValue);
        setSelectedQuestion("");
        setSelectedTopics([]);
        setSelectedDifficulty('');
        setShowTimer(false);

        if (inputValue === "") setIsDropdownVisible(false);
        else setIsDropdownVisible(true);
    }

    const handleInputBlur = () => {
        setTimeout(() => setIsDropdownVisible(false), 100);
    }

    async function getQuestions() {
        let trie = await questionFunctions.problemTitles();
        setQuestionsTrie(trie);
    }

    const searchQuestions = (trie, term) => {
        if (!term || !trie) {
            return [];
        }
        return trie.autoComplete(term.toLowerCase());
    }

    const handleClickOutside = (event) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(event.target) &&
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsDropdownVisible(false);
            setSelectedQuestion("");
            setSelectedTopics([]);
            setSelectedDifficulty('');
        }
    };

    const handleOptionClick = (question) => {
        setSelectedQuestion( question[0]);
        let searchQuestionSplit = question[0].split(' ');
        searchQuestionSplit.shift();

        setSearchTerm(searchQuestionSplit.join(' '));
        setSelectedTopics(question[1]);
        setSelectedDifficulty(question[2]);
        setIsDropdownVisible(false);
        setTextError('');
    };




    // schedule idx is today, increment idx in db




    async function calculateOverallAverageDifficulty(user, solvedProblem) {
        let totalDifficulty = 0;
        let topicCount = 0;

        user.technicalData.problems.totalProblemsAttempted += 1;
        user.technicalData.totalPracticeTime += solvedProblem.totalTime.nonFancy;

        user.technicalData.averageProblemTime = user.technicalData.totalPracticeTime / (solvedProblem.solved ? user.technicalData.problems.totalProblemsSolved + 1 : user.technicalData.problems.totalProblemsSolved)

        if (!solvedProblem.solved) {
            const updatedTopics = {};

            for (const [topicName, topic] of Object.entries(user.technicalData.topics)) {
                if (solvedProblem.topics.includes(topicName)) {
                    topic.totalTopicProblemsAttempted += 1;
                    topic.topicProblemsAttempted.push(solvedProblem);

                    const newTimeSum = topic.topicTimeSum + solvedProblem.totalTime.nonFancy;
                    const newAvgTime = newTimeSum / topic.totalTopicProblemsSolved;

                    updatedTopics[topicName] = {
                        ...topic,
                        topicTimeSum: newTimeSum,
                        averageTopicTime: newAvgTime,
                    };
                } else {
                    updatedTopics[topicName] = topic;
                }
            }

            user.technicalData.topics = updatedTopics;
        }
        else {
            user.technicalData.problems.totalProblemsSolved += 1;
            const updatedTopics = {};

            if (solvedProblem.solvedWithoutSolution) {
                user.technicalData.problems.totalProblemsSolvedWithoutSolution += 1;
            }
            else if (!solvedProblem.solvedWithoutSolution) {
                user.technicalData.problems.totalProblemsSolvedWithSolution += 1;
            };

            if (solvedProblem.difficultyLevel == 'Easy') {
                user.technicalData.problems.totalEasySolved += 1;
            }
            else if (solvedProblem.difficultyLevel == 'Medium') {
                user.technicalData.problems.totalMediumSolved += 1;
            }
            else if (solvedProblem.difficultyLevel == 'Hard') {
                user.technicalData.problems.totalHardSolved += 1;
            }

            for (const [topicName, topic] of Object.entries(user.technicalData.topics)) {
                if (solvedProblem.topics.includes(topicName)) {
                    if (solvedProblem.solvedWithoutSolution) {
                        topic.totalTopicProblemsSolvedWithoutSolution += 1;
                    }
                    else if (!solvedProblem.solvedWithoutSolution) {
                        topic.totalTopicProblemsSolvedWithSolution += 1;
                    };

                    if (solvedProblem.difficultyLevel == 'Easy') {
                        topic.totalTopicEasySolved += 1;
                    }
                    else if (solvedProblem.difficultyLevel == 'Medium') {
                        topic.totalTopicMediumSolved += 1;
                    }
                    else if (solvedProblem.difficultyLevel == 'Hard') {
                        topic.totalTopicHardSolved += 1;
                    };

                    const newDifficultySum = topic.topicDifficultySum + solvedProblem.difficultyNum;
                    const newProblemCount = topic.totalTopicProblemsSolved + 1;
                    topic.totalTopicProblemsAttempted += 1;
                    const newAvgDifficulty = newDifficultySum / newProblemCount;

                    const newTimeSum = topic.topicTimeSum + solvedProblem.totalTime.nonFancy;
                    const newAvgTime = newTimeSum / newProblemCount;

                    totalDifficulty += newAvgDifficulty;
                    topicCount += 1;

                    topic.topicProblemsSolved.push(solvedProblem);
                    topic.scheduleIdx += 1;

                    updatedTopics[topicName] = {
                        ...topic,
                        schedule: [0, 1, 4, 7, 14, 28],
                        topicTimeSum: newTimeSum,
                        averageTopicTime: newAvgTime,
                        lastPracticed: solvedProblem.solvedAt,
                        topicDifficultySum: newDifficultySum,
                        totalTopicProblemsSolved: newProblemCount,
                        averageTopicDifficulty: newAvgDifficulty,
                    };
                }
                else {
                    if (topic.averageTopicDifficulty !== null) {
                        totalDifficulty += topic.averageTopicDifficulty;
                        topicCount += 1;
                    }
                    updatedTopics[topicName] = topic;
                }
            }

            const overallAverageDifficulty = totalDifficulty / topicCount;
            user.technicalData.topics = updatedTopics;
            user.technicalData.averageDifficultyIntervals.push({
                overallAverageDifficulty: overallAverageDifficulty,
                timestamp: Date.now(),
            });
        }

        async function userTechnicalDataUpdate() {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000' + '/user/updateUserTech', {
                method: 'POST',
                body: JSON.stringify({
                    userId: user._id,
                    userTechnicalData: user.technicalData,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })

            const data = await response.json();
            setIsLoading(false);
            navigate('/');
            return data;
        }

        await userTechnicalDataUpdate();
    }

    useEffect(() => {
        getQuestions();

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    useEffect(() => {
        let questions = searchQuestions(questionsTrie, searchTerm)
        setFilteredQuestions(questions);
    }, [searchTerm, questionsTrie]);

    return (
        <div className="addProblemBody">
            {!showTimer && <>
            <div className="addProblemBodyOverview">
                <p className="addProblemBodyOverviewText">New Problem</p>
            </div>
            <div className="addProblemBodyAdd">
                <p className="addProblemBodyAddTitle">Type in a LeetCode Problem Title...</p>
                <input
                    ref={inputRef}
                    className="addProblemBodyAddInput"
                    maxLength={70}
                    value={searchTerm}
                    onFocus={() => setIsDropdownVisible(true)}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                ></input>
                {textError != '' && <p className="addProblemTextError">{textError}</p>}
                <div className="addProblemBodyAddButtonContainer">
                    <button className="addProblemBodyAddButton" onClick={() => {
                        if (selectedQuestion != "") {
                            setShowTimer(true);
                            setTextError('');
                        }
                        else {
                            setShowTimer(false);
                            setTextError('Please select a question from the list.');
                        }
                    }}>Confirm</button>
                </div>
                {isDropdownVisible && (
                    <div ref={dropdownRef} className="addProblemBodyDropdown">
                        {filteredQuestions.length > 0
                            ? filteredQuestions.map((question, id) => (
                                <div
                                    key={id}
                                    className="addProblemBodyDropdownOption"
                                    onClick={() => handleOptionClick(question)}
                                >
                                    {question[0]}
                                </div>
                            ))
                            : null
                        }
                    </div>
                )}
            </div></>}
            {showTimer && <>
            <div className="addProblemBodyProblem">
                <p className="addProblemBodyProblemTitle">{selectedQuestion}</p>
                <div className="addProblemBodyProblemTopics">
                    {selectedTopics.map((topic, id) => (
                        <p key={id}
                        className="addProblemBodyProblemTopic">{topic}</p>
                    ))}
                </div>
                <p className={selectedDifficulty == 'Hard' ? "addProblemBodyProblemDifficulty redText" : selectedDifficulty == 'Easy' ? "addProblemBodyProblemDifficulty greenText" : selectedDifficulty == 'Medium' ? "addProblemBodyProblemDifficulty yellowText" : null}>{selectedDifficulty}</p>
            </div>
            {!showQuestions && <div className="addProblemBodyTimer">
                <i className="fa-solid fa-circle-chevron-left timerLeftArrowIcon" onClick={() => setShowTimer(false)}></i>
                <CountdownTimer key={key} duration={duration} onComplete={handleComplete} isPlaying={isPlaying} onRemainingTimeUpdate={setRemainingTime}/>
                <div className="addProblemBodyTimerUpper">
                    <button className="addProblemBodyTimerUpperButton" onClick={isPlaying ? handlePause : handleResume}>{isPlaying ? 'Pause' : 'Resume'}</button>
                    <button className="addProblemBodyTimerUpperButton" onClick={handleReset}>Reset</button>
                </div>
                <button className="addProblemBodyTimerLowerButton" onClick={handleStart}>{(isPlaying || isPaused) ? 'Completed?' : 'Start'}</button>
                <div className="addProblemBodyTimerSlider">
                    <CustomSlider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        isInvalid={isPlaying || isPaused}
                    />
                </div>
            </div>}
            {showQuestions && <>
                <div className="addProblemQuestionContainer">
                    <p className="addProblemQuestionText">{`Did you solve ${selectedQuestion.split(' ').slice(1).join(' ')}?`}</p>
                    <div className="addProblemQuestionOptions">
                        <div className={!completed ? "addProblemQuestionOption selectedButton" : "addProblemQuestionOption"} onClick={() => setCompleted(true)}>Yes</div>
                        <div className={!completed ? "addProblemQuestionOption" : "addProblemQuestionOption selectedButton"} onClick={() => setCompleted(false)}>No</div>
                    </div>
                </div>
                <div className="addProblemQuestionContainer">
                    <p className="addProblemQuestionText">{`Did you solve it without looking at the solution?`}</p>
                    <div className="addProblemQuestionOptions">
                        <div className={!completedWo ? "addProblemQuestionOption selectedButton" : "addProblemQuestionOption"} onClick={() => completed ? setCompletedWo(true) : null}>Yes</div>
                        <div className={!completedWo ? "addProblemQuestionOption" : "addProblemQuestionOption selectedButton"} onClick={() => completed ? setCompletedWo(false) : null}>No</div>
                    </div>
                    {!completed && <div className="addProblemQuestionOverlay"/>}
                </div>
                <div className="addProblemQuestionContainer2">
                    <p className="addProblemQuestionText">{`What difficulty was this problem for you?`}</p>
                    <div className="addProblemQuestionOptions2">
                        <div className={difficulty == 1 ? "addProblemQuestionOption2 selectedButton" : "addProblemQuestionOption2"} onClick={() => completed ? setDifficulty(1) : null}>1</div>
                        <div className={difficulty == 2 ? "addProblemQuestionOption2 selectedButton" : "addProblemQuestionOption2"} onClick={() => completed ? setDifficulty(2) : null}>2</div>
                        <div className={difficulty == 3 ? "addProblemQuestionOption2 selectedButton" : "addProblemQuestionOption2"} onClick={() => completed ? setDifficulty(3) : null}>3</div>
                        <div className={difficulty == 4 ? "addProblemQuestionOption2 selectedButton" : "addProblemQuestionOption2"} onClick={() => completed ? setDifficulty(4) : null}>4</div>
                        <div className={difficulty == 5 ? "addProblemQuestionOption2 selectedButton" : "addProblemQuestionOption2"} onClick={() => completed ? setDifficulty(5) : null}>5</div>
                    </div>
                    {!completed && <div className="addProblemQuestionOverlay"/>}
                </div>
                <div className="addProblemQuestionsButtonContainer" onClick={handleSubmit}>
                    <button className="addProblemQuestionsButton">Add problem</button>
                </div>
                {isLoading &&
                    <div className="questionSpinnerBackdrop">
                        <div className='questionSpinner'>
                            <PuffLoader color="#2c7be5"/>
                        </div>
                    </div>
                }
            </>}
            </>}
        </div>
    )
}

export default AddProblemBody;
