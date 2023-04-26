import React, { useState } from "react";
import StatusCircle from "./StatusCircle";

import './ProblemsBody.css';

function ProblemsBody() {
    const [statusOpen, setStatusOpen] = useState(false);
    const [difficultyOpen, setDifficultyOpen] = useState(false);
    const [showOpen, setShowOpen] = useState(false);

    const [statusSort, setStatusSort] = useState(0);
    const [problemSort, setProblemSort] = useState(0);
    const [difficultySort, setDifficultySort] = useState(0);
    const [lastPracticedSort, setLastPracticedSort] = useState(0);
    let arr1 = [() => setStatusOpen(false), () => setDifficultyOpen(false), () => setShowOpen(false)];

    function clearDropdowns(current) {
        for (let i = 0; i < arr1.length; i++) {
            if (i != current) arr1[i]();
        }
    }

    let arr2 = [() => setStatusSort(0), () => setProblemSort(0), () => setDifficultySort(0), () => setLastPracticedSort(0)];

    function clearSorts(current) {
        for (let i = 0; i < arr2.length; i++) {
            if (i != current) arr2[i]();
        }
    }

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
                    <div className="problemsBodyOptionMain" onClick={() => {setStatusOpen(!statusOpen); clearDropdowns(0);}}>
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
                    <div className="problemsBodyOptionMain" onClick={() => {setDifficultyOpen(!difficultyOpen); clearDropdowns(1);}}>
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
                    <div className="problemsBodyOptionMain" onClick={() => {setShowOpen(!showOpen); clearDropdowns(2);}}>
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
            <div className="problemsBodyCategoryContainer">
                <div className="problemsBodyCategory1" onClick={() => {setStatusSort(() => (statusSort + 1) % 3); clearSorts(0);}}>
                    <p className="problemsBodyCategoryText">STATUS</p>
                    <div className="problemsBodyCategoryArrows">
                        {statusSort == 0 &&
                            <>
                            <i className="fa-solid fa-caret-up problemsBodyCategoryArrowUp"></i>
                            <i className="fa-solid fa-caret-down problemsBodyCategoryArrowDown"></i>
                            </>
                        }
                        {statusSort == 1 &&
                            <i className="fa-solid fa-caret-up problemsBodyCategoryArrowUp"></i>
                        }
                        {statusSort == 2 &&
                            <i className="fa-solid fa-caret-down problemsBodyCategoryArrowDown"></i>
                        }
                    </div>
                </div>
                <div className="problemsBodyCategory2" onClick={() => {setProblemSort(() => (problemSort + 1) % 3); clearSorts(1);}}>
                    <p className="problemsBodyCategoryText">PROBLEM</p>
                    <div className="problemsBodyCategoryArrows">
                        {problemSort == 0 &&
                            <>
                            <i className="fa-solid fa-caret-up problemsBodyCategoryArrowUp"></i>
                            <i className="fa-solid fa-caret-down problemsBodyCategoryArrowDown"></i>
                            </>
                        }
                        {problemSort == 1 &&
                            <i className="fa-solid fa-caret-up problemsBodyCategoryArrowUp"></i>
                        }
                        {problemSort == 2 &&
                            <i className="fa-solid fa-caret-down problemsBodyCategoryArrowDown"></i>
                        }
                    </div>
                </div>
                <div className="problemsBodyCategory3">
                    <p className="problemsBodyCategoryText">TOPICS</p>
                </div>
                <div className="problemsBodyCategory4" onClick={() => {setDifficultySort(() => (difficultySort + 1) % 3); clearSorts(2);}}>
                    <p className="problemsBodyCategoryText">DIFFICULTY</p>
                    <div className="problemsBodyCategoryArrows">
                        {difficultySort == 0 &&
                            <>
                            <i className="fa-solid fa-caret-up problemsBodyCategoryArrowUp"></i>
                            <i className="fa-solid fa-caret-down problemsBodyCategoryArrowDown"></i>
                            </>
                        }
                        {difficultySort == 1 &&
                            <i className="fa-solid fa-caret-up problemsBodyCategoryArrowUp"></i>
                        }
                        {difficultySort == 2 &&
                            <i className="fa-solid fa-caret-down problemsBodyCategoryArrowDown"></i>
                        }
                    </div>
                </div>
                <div className="problemsBodyCategory5" onClick={() => {setLastPracticedSort(() => (lastPracticedSort + 1) % 3); clearSorts(3);}}>
                    <p className="problemsBodyCategoryText">LAST PRACTICED</p>
                    <div className="problemsBodyCategoryArrows">
                        {lastPracticedSort == 0 &&
                            <>
                            <i className="fa-solid fa-caret-up problemsBodyCategoryArrowUp"></i>
                            <i className="fa-solid fa-caret-down problemsBodyCategoryArrowDown"></i>
                            </>
                        }
                        {lastPracticedSort == 1 &&
                            <i className="fa-solid fa-caret-up problemsBodyCategoryArrowUp"></i>
                        }
                        {lastPracticedSort == 2 &&
                            <i className="fa-solid fa-caret-down problemsBodyCategoryArrowDown"></i>
                        }
                    </div>
                </div>
            </div>
            <div className="problemsBodyProblemsContainer">
                <div className="problemsBodyProblemsOption">
                    <div className="problemsBodyProblemsOptionText1 blueText2"><StatusCircle color={'yellow'}/></div>
                    <p className="problemsBodyProblemsOptionText2 blueText">1444. Number of Ways of Cutting a Pizza</p>
                    <div className="problemsBodyProblemsTopics">
                        <p className="problemsBodyProblemsTopic">Array</p>
                        <p className="problemsBodyProblemsTopic">Dynamic Programming</p>
                        <p className="problemsBodyProblemsTopic">Memoization</p>
                        <p className="problemsBodyProblemsTopic">Matrix</p>
                    </div>
                    <p className="problemsBodyProblemsOptionText3 redText">Hard</p>
                    <p className="problemsBodyProblemsOptionText4">3 days ago</p>
                </div>
                <div className="problemsBodyProblemsOption">
                        <div className="problemsBodyProblemsOptionText1 blueText3"><StatusCircle color={'green'}/></div>
                        <p className="problemsBodyProblemsOptionText2 blueText">543. Diameter of Binary Tree</p>
                        <div className="problemsBodyProblemsTopics">
                            <p className="problemsBodyProblemsTopic">Tree</p>
                            <p className="problemsBodyProblemsTopic">Depth-First Search</p>
                            <p className="problemsBodyProblemsTopic">Binary Tree</p>
                        </div>
                        <p className="problemsBodyProblemsOptionText3 greenText">Easy</p>
                        <p className="problemsBodyProblemsOptionText4">3 days ago</p>
                </div>
            </div>
        </div>
    )
}

export default ProblemsBody;
