import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import StatusCircle from "./StatusCircle";

import './RecommendedBody.css'

function RecommendedBody() {
    const [problemsOpen, setProblemsOpen] = useState(true);
    const [topicsOpen, setTopicsOpen] = useState(true);

    const navigate = useNavigate();

    return (
        <div className="recommendedBody">
            <div className="recommendedBodyContainerOverview">
                <div className="recommendedBodyContainerOverviewLeft">
                    <p className="recommendedBodySmallText">OVERVIEW</p>
                    <p className="recommendedBodyHeaderText">Recommended</p>
                </div>
                <div className="recommendedBodyContainerOverviewRight">
                    <button className="recommendedBodyContainerOverviewRightButton" onClick={() => navigate('/new-problem')}>New Problem</button>
                </div>
            </div>

            <div className="recommendedBodyTitleContainer2" onClick={() => setTopicsOpen(!topicsOpen)}>
                <p className="recommendedBodyTitle">Topics to practice</p>
                <i className={topicsOpen ? "fa-solid fa-chevron-up recommendedBodyTitleIcon" : "fa-solid fa-chevron-down recommendedBodyTitleIcon"}></i>
            </div>
            {topicsOpen &&
            <>
            <div className="recommendedBodyCategoryContainer">
                <div className="recommendedBodyCategory11">
                    <p className="recommendedBodyCategoryText">PRIORITY</p>
                </div>
                <div className="recommendedBodyCategory22">
                    <p className="recommendedBodyCategoryText">TOPIC</p>
                </div>
                <div className="recommendedBodyCategory55">
                    <p className="recommendedBodyCategoryText">LAST PRACTICED</p>
                </div>
            </div>
            <div className="recommendedBodyProblemsContainer">
                <div className="recommendedBodyProblemsOption2">
                    <div className="recommendedBodyProblemsOptionText11 blueText1">High</div>
                    <p className="recommendedBodyProblemsOptionText22 blueText">Union Find</p>
                    <p className="recommendedBodyProblemsOptionText44">5 days ago</p>
                </div>
                <div className="recommendedBodyProblemsOption2">
                        <div className="recommendedBodyProblemsOptionText11 blueText2">Medium</div>
                        <p className="recommendedBodyProblemsOptionText22 blueText">K-way Merge</p>
                        <p className="recommendedBodyProblemsOptionText44">New</p>
                </div>
            </div>
            </>}

            <div className="recommendedBodyTitleContainer" onClick={() => setProblemsOpen(!problemsOpen)}>
                <p className="recommendedBodyTitle">Skill-based problem set</p>
                <i className={problemsOpen ? "fa-solid fa-chevron-up recommendedBodyTitleIcon" : "fa-solid fa-chevron-down recommendedBodyTitleIcon"}></i>
            </div>
            {problemsOpen &&
            <>
            <div className="recommendedBodyCategoryContainer">
                <div className="recommendedBodyCategory1">
                    <p className="recommendedBodyCategoryText">PRIORITY</p>
                </div>
                <div className="recommendedBodyCategory2">
                    <p className="recommendedBodyCategoryText">PROBLEM</p>
                </div>
                <div className="recommendedBodyCategory3">
                    <p className="recommendedBodyCategoryText">TOPICS</p>
                </div>
                <div className="recommendedBodyCategory4">
                    <p className="recommendedBodyCategoryText">DIFFICULTY</p>
                </div>
                <div className="recommendedBodyCategory5">
                    <p className="recommendedBodyCategoryText">LAST PRACTICED</p>
                </div>
            </div>
            <div className="recommendedBodyProblemsContainer">
                <div className="recommendedBodyProblemsOption">
                    <div className="recommendedBodyProblemsOptionText1 blueText1">High</div>
                    <p className="recommendedBodyProblemsOptionText2 blueText">1444. Number of Ways of Cutting a Pizza</p>
                    <div className="recommendedBodyProblemsTopics">
                        <p className="recommendedBodyProblemsTopic">Array</p>
                        <p className="recommendedBodyProblemsTopic">Dynamic Programming</p>
                        <p className="recommendedBodyProblemsTopic">Memoization</p>
                        <p className="recommendedBodyProblemsTopic">Matrix</p>
                    </div>
                    <p className="recommendedBodyProblemsOptionText3 redText">Hard</p>
                    <p className="recommendedBodyProblemsOptionText4">New</p>
                </div>
                <div className="recommendedBodyProblemsOption">
                        <div className="recommendedBodyProblemsOptionText1 blueText2">Medium</div>
                        <p className="recommendedBodyProblemsOptionText2 blueText">543. Diameter of Binary Tree</p>
                        <div className="recommendedBodyProblemsTopics">
                            <p className="recommendedBodyProblemsTopic">Tree</p>
                            <p className="recommendedBodyProblemsTopic">Depth-First Search</p>
                            <p className="recommendedBodyProblemsTopic">Binary Tree</p>
                        </div>
                        <p className="recommendedBodyProblemsOptionText3 greenText">Easy</p>
                        <p className="recommendedBodyProblemsOptionText4">New</p>
                </div>
            </div>
            </>}
        </div>
    )
}

export default RecommendedBody;
