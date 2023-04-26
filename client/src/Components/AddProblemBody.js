import React, { useState } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import CountdownTimer from "./CountdownTimer";

import './AddProblemBody.css';

function AddProblemBody() {
    const [addMode, setAddMode] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [key, setKey] = useState(0);
    const [duration, setDuration] = useState(10 * 60);

    const handleComplete = () => {
        setIsPlaying(false);
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
        if (isPlaying) console.log('');
        else setIsPlaying(true);
    }

    return (
        <div className="addProblemBody">
            {addMode &&
                <>
                <div className="addProblemBodyOverview">
                    <p className="addProblemBodyOverviewText">New Problem</p>
                </div>
                <div className="addProblemBodyAdd">
                    <p className="addProblemBodyAddTitle">Type in a LeetCode Problem Title...</p>
                    <input className="addProblemBodyAddInput" maxLength={50}></input>
                    <div className="addProblemBodyAddButtonContainer">
                        <button className="addProblemBodyAddButton">Create</button>
                    </div>
                </div>
                <div className="addProblemBodyCustom">
                    <p className="addProblemBodyCustom1">Can't find you're looking for?</p>
                    <p className="addProblemBodyCustom2">Create Custom Problem</p>
                </div>
                </>
            }
            <div className="addProblemBodyProblem">
                <p className="addProblemBodyProblemTitle">543. Diameter of a Binary Tree</p>
                <div className="addProblemBodyProblemTopics">
                    <p className="addProblemBodyProblemTopic">Tree</p>
                    <p className="addProblemBodyProblemTopic">Depth-First Search</p>
                    <p className="addProblemBodyProblemTopic">Binary Tree</p>
                </div>
                <p className="addProblemBodyProblemDifficulty greenText">Easy</p>
            </div>
            <div className="addProblemBodyTimer">
                <CountdownTimer key={key} duration={duration} onComplete={handleComplete} isPlaying={isPlaying}/>
                <div className="addProblemBodyTimerUpper">
                    <button className="addProblemBodyTimerUpperButton1" onClick={isPaused ? handleResume : handlePause}>{isPaused ? 'Resume' : 'Pause'}</button>
                    <button className="addProblemBodyTimerUpperButton2" onClick={handleReset}>Reset</button>
                </div>
                <div className="addProblemBodyTimerLower">
                    <button className="addProblemBodyTimerLowerButton1" onClick={handleStart}>{(isPlaying) ? 'Completed?' : isPaused ? 'Completed?' : 'Start'}</button>
                </div>
            </div>
        </div>
    )
}

export default AddProblemBody;
