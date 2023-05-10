import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

import questionFunctions from "../leetcodeSort";
import { Trie } from "../leetcodeSort";
import CountdownTimer from './CountdownTimer';
import CustomSlider from "./CustomSlider";
import { PuffLoader } from 'react-spinners';

import { SolvedProblem, Topic, User } from "../interfaces";

import './AddProblemBody.css';

function AddProblemBody() {
    const [questionsTrie, setQuestionsTrie] = useState<Trie | null>(null);
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
    const [difficulty, setDifficulty] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const isProduction = process.env.REACT_APP_ENV == 'production';

    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [addMode, setAddMode] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [key, setKey] = useState(0);
    const [duration, setDuration] = useState(45 * 60);
    const [sliderValue, setSliderValue] = useState('0');
    const [remainingTime, setRemainingTime] = useState(0);
    const [totalTimeTakenFancy, setTotalTimeTakenFancy] = useState('0');
    const [totalTimeTaken, setTotalTimeTaken] = useState(0);

    const user: User | null = useSelector((state: RootState) => state.user);
    const token: string | null = useSelector((state: RootState) => state.auth.token);

    const formatTime = (time: number) => {
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

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isPlaying || isPaused) return;
        setSliderValue(event.target.value);

        const num = +event.target.value;
        setDuration(num * 60);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        if (inputValue.length === 1 && inputValue === " ") return;

        setSearchTerm(inputValue);
        setSelectedQuestion("");
        setSelectedId(null);
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

    const searchQuestions = (trie: Trie | null, term: string) => {
        if (!term || !trie) {
            return [];
        }
        return trie.autoComplete(term.toLowerCase());
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(event.target as Node) &&
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsDropdownVisible(false);
            setSelectedQuestion("");
            setSelectedId(null);
            setSelectedTopics([]);
            setSelectedDifficulty('');
        }
    };

    function handleConfirm() {
        if (selectedQuestion == "" || selectedId == null || !user) {
            setShowTimer(false);
            setTextError('Please select a question from the list.');
        }
        else {
            const problemIds = user.technicalData.problemIds;
            if (problemIds.includes(selectedId)) {
                setTextError("You've already completed this problem.");
                return;
            }
            setShowTimer(true);
            setTextError('');
        }
    }

    const handleOptionClick = (question: any[]) => {
        setSelectedQuestion(question[0]);

        let searchQuestionSplit = question[0].split(' ');
        let id = searchQuestionSplit.shift();
        setSearchTerm(searchQuestionSplit.join(' '));

        let newIdArr = id.split('');
        newIdArr.pop();
        const newId = newIdArr.join('')

        setSelectedId(newId);
        setSelectedTopics(question[1]);
        setSelectedDifficulty(question[2]);
        setIsDropdownVisible(false);
        setTextError('');
    };


    async function handleSubmit() {
        if (completed) {
            if (!selectedQuestion || !difficulty) return;
        }
        else {
            if (!selectedQuestion) return;
        }

        let id = selectedQuestion.split(' ').slice(0, 1).join().split('');
        id.pop();
        const newId = id.join('');

        const solvedProblem: SolvedProblem = {
            id: newId,
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

        const copyUser = JSON.parse(JSON.stringify(user));
        calculateOverallAverageDifficulty(copyUser, solvedProblem, token, (updatedUser: User) => {
            dispatch(setUser(updatedUser));
        });
    }

    async function calculateOverallAverageDifficulty(user: User, solvedProblem: SolvedProblem, token: string | null, updateStateCallback: (updatedUser: User) => void) {
        let totalDifficulty = 0;
        let topicCount = 0;

        user.technicalData.problems.totalProblemsAttempted += 1;
        user.technicalData.totalPracticeTime += solvedProblem.totalTime.nonFancy;
        user.technicalData.averageProblemTime = user.technicalData.totalPracticeTime / (solvedProblem.solved ? user.technicalData.problems.totalProblemsSolved + 1 : user.technicalData.problems.totalProblemsSolved);

        if (!solvedProblem.solved) {
            user.technicalData.topics = incrementTopicProblemsAttempted(user, solvedProblem);
        }
        else {
            user.technicalData.problems.totalProblemsSolved += 1;
            updateProblemSolvedCount(user, solvedProblem);
            user.technicalData.problemIds.push(solvedProblem.id);

            const { updatedTopics, overallAverageDifficulty } = updateSolvedTopicData(user, solvedProblem, totalDifficulty, topicCount);

            user.technicalData.topics = updatedTopics;
            user.technicalData.averageDifficultyIntervals.push({
                overallAverageDifficulty: overallAverageDifficulty,
                timestamp: Date.now(),
            });
        }

        await updateUserTechnicalData(user, token);
        updateStateCallback(user);
    }


    function incrementTopicProblemsAttempted(user: User, solvedProblem: SolvedProblem) {
        const updatedTopics: { [key: string]: Topic } = {};

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

        return updatedTopics;
    }


    function updateProblemSolvedCount(user: User, solvedProblem: SolvedProblem) {
        if (solvedProblem.solvedWithoutSolution) {
            user.technicalData.problems.totalProblemsSolvedWithoutSolution += 1;
        } else {
            user.technicalData.problems.totalProblemsSolvedWithSolution += 1;
        };

        if (solvedProblem.difficultyLevel === 'Easy') {
            user.technicalData.problems.totalEasySolved += 1;
        } else if (solvedProblem.difficultyLevel === 'Medium') {
            user.technicalData.problems.totalMediumSolved += 1;
        } else if (solvedProblem.difficultyLevel === 'Hard') {
            user.technicalData.problems.totalHardSolved += 1;
        }
    }


    function updateSolvedTopicData(user: User, solvedProblem: SolvedProblem, totalDifficulty: number, topicCount: number) {
        const updatedTopics: {[key: string]: Topic} = {};

        for (const [topicName, topic] of Object.entries(user.technicalData.topics)) {
            if (solvedProblem.topics.includes(topicName)) {
                const { updatedTopic, newAvgDifficulty } = updateTopicSolvedData(topic, solvedProblem);
                totalDifficulty += newAvgDifficulty;
                topicCount += 1;
                updatedTopics[topicName] = updatedTopic;
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

        return { updatedTopics, overallAverageDifficulty };
    }


    function updateTopicSolvedData(topic: Topic, solvedProblem: SolvedProblem) {
        updateTopicProblemsCount(topic, solvedProblem);
        const diffNum = solvedProblem.difficultyNum;
        let newDifficultySum = 0;
        if (diffNum) {
            newDifficultySum = topic.topicDifficultySum + diffNum;
        }
        const newProblemCount = topic.totalTopicProblemsSolved + 1;
        topic.totalTopicProblemsAttempted += 1;
        const newAvgDifficulty = newDifficultySum / newProblemCount;

        const newTimeSum = topic.topicTimeSum + solvedProblem.totalTime.nonFancy;
        const newAvgTime = newTimeSum / newProblemCount;

        const problemIndex = topic.topicProblemsAttempted.findIndex(
            (problem) => problem.id === solvedProblem.id
        );

        if (problemIndex !== -1) {
            topic.topicProblemsAttempted.splice(problemIndex, 1);
        }

        topic.topicProblemsSolved.push(solvedProblem);

        const currentDate = Date.now();
        const lastPracticed = topic.lastPracticed || currentDate;
        const daysSinceLastPractice = daysBetween(currentDate, lastPracticed);

        if (lastPracticed === currentDate || daysSinceLastPractice >= topic.schedule[topic.scheduleIdx]) {
            topic.problemsDone += 1;

            if (topic.problemsDone >= 3) {
                topic.scheduleIdx += 1;
                topic.problemsDone = 0;
            }
        }

        return {
            updatedTopic: {
                ...topic,
                topicTimeSum: newTimeSum,
                averageTopicTime: newAvgTime,
                lastPracticed: solvedProblem.solvedAt,
                topicDifficultySum: newDifficultySum,
                totalTopicProblemsSolved: newProblemCount,
                averageTopicDifficulty: newAvgDifficulty,
            },
            newAvgDifficulty,
        };
    }


    function updateTopicProblemsCount(topic: Topic, solvedProblem: SolvedProblem) {
        if (solvedProblem.solvedWithoutSolution) {
            topic.totalTopicProblemsSolvedWithoutSolution += 1;
        }
        else if (!solvedProblem.solvedWithoutSolution) {
            topic.totalTopicProblemsSolvedWithSolution += 1;
        };

        if (solvedProblem.difficultyLevel === 'Easy') {
            topic.totalTopicEasySolved += 1;
        }
        else if (solvedProblem.difficultyLevel === 'Medium') {
            topic.totalTopicMediumSolved += 1;
        }
        else if (solvedProblem.difficultyLevel === 'Hard') {
            topic.totalTopicHardSolved += 1;
        };
    }

    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const value = parts.pop();
            if (value) {
                return value.split(";").shift();
            }
        }
        return '';
    }

    async function fetchCsrfToken() {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/user/csrf-token", {
          credentials: 'include',
        });
        const data = await response.json();
        return data.csrfToken;
    }

    async function updateUserTechnicalData(user: User, token: string | null) {
        setIsLoading(true);
        let csrfToken = getCookie("xsrf-token") || '';

        if (!csrfToken) {
          csrfToken = await fetchCsrfToken();
          document.cookie = `xsrf-token=${csrfToken}; path=/; samesite=${isProduction ? 'strict' : 'lax'}${isProduction ? '; secure' : ''}`;
        }

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/updateUserTech', {
            method: 'POST',
            body: JSON.stringify({
                userId: user._id,
                userTechnicalData: user.technicalData,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                "CSRF-Token": csrfToken,
            },
            credentials: 'include',
        });

        const data = await response.json();
        setIsLoading(false);
        navigate('/');
        return data;
    }


    function daysBetween(timestamp1: number, timestamp2: number) {
        const oneDay = 1000 * 60 * 60 * 24;
        const differenceInTime = timestamp1 - timestamp2;
        const differenceInDays = Math.floor(differenceInTime / oneDay);
        return differenceInDays;
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
                    <button className="addProblemBodyAddButton" onClick={handleConfirm}>Confirm</button>
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
                <p className={selectedDifficulty == 'Hard' ? "addProblemBodyProblemDifficulty redText" : selectedDifficulty == 'Easy' ? "addProblemBodyProblemDifficulty greenText" : selectedDifficulty == 'Medium' ? "addProblemBodyProblemDifficulty yellowText" : undefined}>{selectedDifficulty}</p>
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
