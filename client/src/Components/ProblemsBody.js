import React, { useState, useRef, useEffect } from "react";
import StatusCircle from "./StatusCircle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import './ProblemsBody.css';

function ProblemsBody() {
    const [statusOpen, setStatusOpen] = useState(false);
    const [difficultyOpen, setDifficultyOpen] = useState(false);
    const [showOpen, setShowOpen] = useState(false);

    const [statusSort, setStatusSort] = useState(0);
    const [problemSort, setProblemSort] = useState(0);
    const [difficultySort, setDifficultySort] = useState(0);
    const [lastPracticedSort, setLastPracticedSort] = useState(1);

    const [status, setStatus] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [showNum, setShowNum] = useState(null);

    const [problems, setProblems] = useState([]);

    const problemsPerPage = showNum || 25;
    const [currentPage, setCurrentPage] = useState(1);

    const statusDropdownRef = useRef(null);
    const difficultyDropdownRef = useRef(null);
    const showDropdownRef = useRef(null);

    const user = useSelector(state => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setProblems(getUserProblems(user))
        }
    }, [user])

    function getUserProblems(user) {
        const result = [];
        const uniqueIds = new Set();
        const topics = user.technicalData.topics;

        for (const topic in topics) {
            const attempted = topics[topic].topicProblemsAttempted;
            const solved = topics[topic].topicProblemsSolved;

            const addUniqueProblem = (problem) => {
                const problemId = problem.title.split(' ')[0].toString();

                if (!uniqueIds.has(problemId)) {
                    uniqueIds.add(problemId);
                    result.push(problem);
                }
            };

            if (attempted.length > 0) attempted.forEach(addUniqueProblem);
            if (solved.length > 0) solved.forEach(addUniqueProblem);
        }

        return result;
    }

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

    function clearFilters() {
        setStatus(null);
        setDifficulty(null);
        setShowNum(null);
    }

    function timeSince(solvedAt) {
        const now = Date.now();
        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerWeek = msPerDay * 7;

        const elapsed = now - solvedAt;

        if (elapsed < msPerHour) {
            return '< 1 hour ago';
        }
        else if (elapsed < msPerDay) {
            const hours = Math.round(elapsed / msPerHour);
            return hours + ' hour' + (hours === 1 ? '' : 's') + ' ago';
        }
        else if (elapsed < msPerWeek) {
            const days = Math.round(elapsed / msPerDay);
            return days + ' day' + (days === 1 ? '' : 's') + ' ago';
        }
        else {
            const weeks = Math.round(elapsed / msPerWeek);
            return weeks + ' week' + (weeks === 1 ? '' : 's') + ' ago';
        }
    }

    function sortProblems(problems) {
        return problems.slice().sort((a, b) => {
            if (statusSort === 1) {
                return a.solved - b.solved;
            } else if (statusSort === 2) {
                return b.solved - a.solved;
            } else if (problemSort === 1) {
                const aId = parseInt(a.title.split(" ")[0].replace(".", ""));
                const bId = parseInt(b.title.split(" ")[0].replace(".", ""));
                return aId - bId;
            } else if (problemSort === 2) {
                const aId = parseInt(a.title.split(" ")[0].replace(".", ""));
                const bId = parseInt(b.title.split(" ")[0].replace(".", ""));
                return bId - aId;
            } else if (difficultySort === 1) {
                if (a.difficultyLevel === b.difficultyLevel) {
                    return 0;
                }
                const difficultyLevels = ["Easy", "Medium", "Hard"];
                return difficultyLevels.indexOf(a.difficultyLevel) - difficultyLevels.indexOf(b.difficultyLevel);
            } else if (difficultySort === 2) {
                if (a.difficultyLevel === b.difficultyLevel) {
                    return 0;
                }
                const difficultyLevels = ["Easy", "Medium", "Hard"];
                return difficultyLevels.indexOf(b.difficultyLevel) - difficultyLevels.indexOf(a.difficultyLevel);
            } else if (lastPracticedSort === 1) {
                return b.solvedAt - a.solvedAt;
            } else if (lastPracticedSort === 2) {
                return a.solvedAt - b.solvedAt;
            } else {
                return 0;
            }
        });
    }

    const [sortedProblems, setSortedProblems] = useState([]);

    const filteredProblems = sortedProblems
    .filter((problem) => {
        if (status !== null && (status === 'Solved' ? true : false) !== problem.solved) {
            return false;
        }
        if (difficulty && problem.difficultyLevel !== difficulty) {
            return false;
        }
        return true;
    })
    .slice((currentPage - 1) * problemsPerPage, currentPage * problemsPerPage);

    useEffect(() => {
        setSortedProblems(sortProblems(problems));
    }, [problems, statusSort, problemSort, difficultySort, lastPracticedSort]);


    useEffect(() => {
        function handleClickOutside(event) {
            if (
                statusDropdownRef.current &&
                !statusDropdownRef.current.contains(event.target)
            ) {
                setStatusOpen(false);
            }
            if (
                difficultyDropdownRef.current &&
                !difficultyDropdownRef.current.contains(event.target)
            ) {
                setDifficultyOpen(false);
            }
            if (
                showDropdownRef.current &&
                !showDropdownRef.current.contains(event.target)
            ) {
                setShowOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [statusDropdownRef, difficultyDropdownRef, showDropdownRef]);

    return (
        <div className="problemsBody">
            <div className="problemsBodyContainerOverview">
                <div className="problemsBodyContainerOverviewLeft">
                    <p className="problemsBodySmallText">OVERVIEW</p>
                    <p className="problemsBodyHeaderText">History</p>
                </div>
            </div>
            <div className="problemsBodyOptionsContainer">
                <div className="problemsBodyOptionContainer">
                    <div className="problemsBodyOptionMain" onClick={() => {setStatusOpen(!statusOpen); clearDropdowns(0);}}>
                        <p className="problemsBodyOptionMainText">{status == null ? 'Status' : status}</p>
                        {statusOpen ? <i className="fa-solid fa-chevron-up problemsBodyOptionChevron"></i> :
                            <i className="fa-solid fa-chevron-down problemsBodyOptionChevron"></i>}
                    </div>
                    {statusOpen &&
                    <div className="problemsBodyOptionDropdown" ref={statusDropdownRef}>
                        <div
                            className="problemsBodyOption"
                            onClick={() => {
                                setStatus("Attempted");
                                setStatusOpen(false);
                            }}
                        >
                            <p className="problemsBodyOptionText">Attempted</p>
                        </div>
                        <div
                            className="problemsBodyOption"
                            onClick={() => {
                                setStatus("Solved");
                                setStatusOpen(false);
                            }}
                        >
                            <p className="problemsBodyOptionText">Solved</p>
                        </div>
                    </div>
                    }
                </div>
                <div className="problemsBodyOptionContainer2">
                    <div className="problemsBodyOptionMain" onClick={() => {setDifficultyOpen(!difficultyOpen); clearDropdowns(1);}}>
                        <p className="problemsBodyOptionMainText">{difficulty == null ? 'Difficulty' : difficulty}</p>
                        {difficultyOpen ? <i className="fa-solid fa-chevron-up problemsBodyOptionChevron"></i> :
                            <i className="fa-solid fa-chevron-down problemsBodyOptionChevron"></i>}
                    </div>
                    {difficultyOpen &&
                    <div className="problemsBodyOptionDropdown" ref={difficultyDropdownRef}>
                        <div
                            className="problemsBodyOption"
                            onClick={() => {
                                setDifficulty("Easy");
                                setDifficultyOpen(false);
                            }}
                        >
                            <p className="problemsBodyOptionText">Easy</p>
                        </div>
                        <div
                            className="problemsBodyOption"
                            onClick={() => {
                                setDifficulty("Medium");
                                setDifficultyOpen(false);
                            }}
                        >
                            <p className="problemsBodyOptionText">Medium</p>
                        </div>
                        <div
                            className="problemsBodyOption"
                            onClick={() => {
                                setDifficulty("Hard");
                                setDifficultyOpen(false);
                            }}
                        >
                            <p className="problemsBodyOptionText">Hard</p>
                        </div>
                    </div>
                    }
                </div>
                <div className="problemsBodyOptionContainer3">
                    <div className="problemsBodyOptionMain" onClick={() => {setShowOpen(!showOpen); clearDropdowns(2);}}>
                        <p className="problemsBodyOptionMainText">{showNum == null ? 'Show 25' : 'Show ' + showNum}</p>
                        {showOpen ? <i className="fa-solid fa-chevron-up problemsBodyOptionChevron"></i> :
                            <i className="fa-solid fa-chevron-down problemsBodyOptionChevron"></i>}
                    </div>
                    {showOpen &&
                    <div className="problemsBodyOptionDropdown" ref={showDropdownRef}>
                        <div
                            className="problemsBodyOption"
                            onClick={() => {
                                setShowNum(10);
                                setShowOpen(false);
                            }}
                        >
                            <p className="problemsBodyOptionText">Show 10</p>
                        </div>
                        <div
                            className="problemsBodyOption"
                            onClick={() => {
                                setShowNum(25);
                                setShowOpen(false);
                            }}
                        >
                            <p className="problemsBodyOptionText">Show 25</p>
                        </div>
                        <div
                            className="problemsBodyOption"
                            onClick={() => {
                                setShowNum(50);
                                setShowOpen(false);
                            }}
                        >
                            <p className="problemsBodyOptionText">Show 50</p>
                        </div>
                    </div>
                    }
                </div>
                <div className="problemsBodyOptionContainer4"></div>
                <div className="problemsBodyOptionContainer5">
                    <button className="problemsBodyOptionMainButton" onClick={clearFilters}>Clear Filters</button>
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
                {filteredProblems.length > 0 && filteredProblems.map((problem, index) => (
                    <div key={index} className="problemsBodyProblemsOption" onClick={() =>
                        window.open(
                            "https://leetcode.com/problems/" +
                            problem.title
                                .split(" ")
                                .slice(1)
                                .join("-")
                                .toLowerCase() +
                            "/",
                            "_blank"
                        )
                    }>
                        <div className="problemsBodyProblemsOptionText1 blueText2"><StatusCircle color={problem.solved ?'green': 'yellow'}/></div>
                        <p className="problemsBodyProblemsOptionText2 blueText">{problem.title}</p>
                        <div className="problemsBodyProblemsTopics">
                            {problem.topics.map((topic, index) => (
                                <p key={index} className="problemsBodyProblemsTopic">{topic}</p>
                            ))}
                        </div>
                        <p className={problem.difficultyLevel == 'Easy' ? "problemsBodyProblemsOptionText3 greenText" : problem.difficultyLevel == 'Medium' ? "problemsBodyProblemsOptionText3 yellowText" : "problemsBodyProblemsOptionText3 redText"}>{problem.difficultyLevel}</p>
                        <p className="problemsBodyProblemsOptionText4">{timeSince(problem.solvedAt)}</p>
                    </div>
                ))}
            </div>
            <div className="problemsBodyNav">
                <button
                    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    disabled={currentPage === 1}
                >
                Prev
                </button>
                <button
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    disabled={filteredProblems.length < problemsPerPage}
                >
                Next
                </button>
            </div>
        </div>
    )
}

export default ProblemsBody;
