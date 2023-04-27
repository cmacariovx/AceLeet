import React, { useEffect, useState, useRef } from "react";

import questionFunctions from "../leetcodeSort";

import './AddProblemBody.css';

function AddProblemBody() {
    const [questionsTrie, setQuestionsTrie] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState("");

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length === 1 && inputValue === " ") return;

        setSearchTerm(inputValue);
        setSelectedQuestion("");

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
        }
    };

    const handleOptionClick = (question) => {
        setSelectedQuestion(question);
        setSearchTerm(question);
        setIsDropdownVisible(false);
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
            <div className="addProblemBodyOverview">
                <p className="addProblemBodyOverviewText">New Problem</p>
            </div>
            <div className="addProblemBodyAdd">
                <p className="addProblemBodyAddTitle">Type in a LeetCode Problem Title...</p>
                <input
                    ref={inputRef}
                    className="addProblemBodyAddInput"
                    maxLength={50}
                    value={searchTerm}
                    onFocus={() => setIsDropdownVisible(true)}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                ></input>
                <div className="addProblemBodyAddButtonContainer">
                    <button className="addProblemBodyAddButton">Confirm</button>
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
                                    {question}
                                </div>
                            ))
                            : null
                        }
                    </div>
                )}
            </div>
            {/* <div className="addProblemBodyCustom">
                <p className="addProblemBodyCustom1">Can't find you're looking for?</p>
                <p className="addProblemBodyCustom2">Create Custom Problem</p>
            </div> */}
        </div>
    )
}

export default AddProblemBody;
