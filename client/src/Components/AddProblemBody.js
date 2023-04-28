import React, { useEffect, useState, useRef } from "react";

import questionFunctions from "../leetcodeSort";
import CountdownTimer from './CountdownTimer'
import CustomSlider from "./CustomSlider";

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

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const [addMode, setAddMode] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [key, setKey] = useState(0);
    const [duration, setDuration] = useState(45 * 60);
    const [sliderValue, setSliderValue] = useState(45);

    const handleComplete = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setKey((prevKey) => prevKey + 1)
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
        handleComplete();
    };

    function handleStart() {
        // completed logic
        if (isPlaying) console.log('');
        else setIsPlaying(true);
    }

    const handleSliderChange = (event) => {
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
            <div className="addProblemBodyTimer">
                <i className="fa-solid fa-circle-chevron-left timerLeftArrowIcon" onClick={() => setShowTimer(false)}></i>
                <CountdownTimer key={key} duration={duration} onComplete={handleComplete} isPlaying={isPlaying}/>
                <div className="addProblemBodyTimerUpper">
                    <button className="addProblemBodyTimerUpperButton" onClick={isPlaying ? handlePause : handleResume}>{isPlaying ? 'Pause' : 'Resume'}</button>
                    <button className="addProblemBodyTimerUpperButton" onClick={handleReset}>Reset</button>
                </div>
                <button className="addProblemBodyTimerLowerButton" onClick={handleStart}>{(isPlaying || isPaused) ? 'Completed?' : 'Start'}</button>
                <div className="addProblemBodyTimerSlider">
                    <CustomSlider value={sliderValue} onChange={handleSliderChange} />
                </div>
            </div>
            </>}
        </div>
    )
}

export default AddProblemBody;
