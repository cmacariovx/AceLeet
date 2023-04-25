import React, { useState } from "react";

import './ProblemsBody.css';

function ProblemsBody() {
    const [statusOpen, setStatusOpen] = useState(false);
    const [difficultyOpen, setDifficultyOpen] = useState(false);
    const [showOpen, setShowOpen] = useState(false);

    return (
        <div className="problemsBody">
            <div className="problemsBodyContainerOverview">
                <div className="problemsBodyContainerOverviewLeft">
                    <p className="problemsBodySmallText">OVERVIEW</p>
                    <p className="problemsBodyHeaderText">Problems</p>
                </div>
                <div className="problemsBodyContainerOverviewRight">
                    <button className="problemsBodyContainerOverviewRightButton">New Problem</button>
                </div>
            </div>
            <div className="problemsBodyOptionsContainer">
                <div className="problemsBodyOptionContainer">
                    <div className="problemsBodyOptionMain" onClick={() => setStatusOpen(!statusOpen)}>
                        <p className="problemsBodyOptionMainText">Status</p>
                        {statusOpen ? <i className="fa-solid fa-chevron-up problemsBodyOptionChevron"></i> :
                            <i className="fa-solid fa-chevron-down problemsBodyOptionChevron"></i>}
                    </div>
                    {statusOpen &&
                    <div className="problemsBodyOptionDropdown">
                        <div className="problemsBodyOption">
                            <p className="problemsBodyOptionText">Attempted</p>
                        </div>
                        <div className="problemsBodyOption">
                            <p className="problemsBodyOptionText">Solved</p>
                        </div>
                    </div>
                    }
                </div>
                <div className="problemsBodyOptionContainer2">
                    <div className="problemsBodyOptionMain" onClick={() => setDifficultyOpen(!difficultyOpen)}>
                        <p className="problemsBodyOptionMainText">Difficulty</p>
                        {difficultyOpen ? <i className="fa-solid fa-chevron-up problemsBodyOptionChevron"></i> :
                            <i className="fa-solid fa-chevron-down problemsBodyOptionChevron"></i>}
                    </div>
                    {difficultyOpen &&
                    <div className="problemsBodyOptionDropdown">
                        <div className="problemsBodyOption">
                            <p className="problemsBodyOptionText">Easy</p>
                        </div>
                        <div className="problemsBodyOption">
                            <p className="problemsBodyOptionText">Medium</p>
                        </div>
                        <div className="problemsBodyOption">
                            <p className="problemsBodyOptionText">Hard</p>
                        </div>
                    </div>
                    }
                </div>
                <div className="problemsBodyOptionContainer3">
                    <div className="problemsBodyOptionMain" onClick={() => setShowOpen(!showOpen)}>
                        <p className="problemsBodyOptionMainText">Show 25</p>
                        {showOpen ? <i className="fa-solid fa-chevron-up problemsBodyOptionChevron"></i> :
                            <i className="fa-solid fa-chevron-down problemsBodyOptionChevron"></i>}
                    </div>
                    {showOpen &&
                    <div className="problemsBodyOptionDropdown">
                        <div className="problemsBodyOption">
                            <p className="problemsBodyOptionText">Show 10</p>
                        </div>
                        <div className="problemsBodyOption">
                            <p className="problemsBodyOptionText">Show 25</p>
                        </div>
                        <div className="problemsBodyOption">
                            <p className="problemsBodyOptionText">Show 50</p>
                        </div>
                    </div>
                    }
                </div>
                <div className="problemsBodyOptionContainer4">
                    <input className="problemsBodyOptionMain2" placeholder="Search" maxLength={50}/>
                </div>
                <div className="problemsBodyOptionContainer5">
                    <button className="problemsBodyOptionMainButton">Clear Filters</button>
                </div>
            </div>
        </div>
    )
}

export default ProblemsBody;
