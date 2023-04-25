import React from "react";

import './HomeBody.css'

function HomeBody() {
    return (
        <div className="homeBodyContainer">
            <div className="homeBodyContainerOverview">
                <div className="homeBodyContainerOverviewLeft">
                    <p className="homeBodySmallText">OVERVIEW</p>
                    <p className="homeBodyHeaderText">Dashboard</p>
                </div>
                <div className="homeBodyContainerOverviewRight">
                    <button className="homeBodyContainerOverviewRightButton">New Problem</button>
                </div>
            </div>
            <div className="homeBodyContainerKPIs">
                <div className="homeBodyContainerKPI">
                    <div className="homeBodyContainerKPILeft">
                        <p className="homeBodyContainerKPILeftUpper">TOTAL PROBLEMS</p>
                        <p className="homeBodyContainerKPILeftLower">4</p>
                    </div>
                    <div className="homeBodyContainerKPIRight">

                    </div>
                </div>
                <div className="homeBodyContainerKPI">
                    <div className="homeBodyContainerKPILeft">
                        <p className="homeBodyContainerKPILeftUpper">TOTAL PRACTICE HOURS</p>
                        <p className="homeBodyContainerKPILeftLower">18.21</p>
                    </div>
                    <div className="homeBodyContainerKPIRight">

                    </div>
                </div>
                <div className="homeBodyContainerKPI">
                    <div className="homeBodyContainerKPILeft">
                        <p className="homeBodyContainerKPILeftUpper">SOLVED W/O SOLUTION</p>
                        <p className="homeBodyContainerKPILeftLower">56.00%</p>
                    </div>
                    <div className="homeBodyContainerKPIRight">

                    </div>
                </div>
            </div>
            <div className="homeBodyDailyRecommendedContainer">
            <div className="homeBodyDailyRecommendedUpper">
                    <div className="homeBodyDailyRecommendedUpper1">
                        <p className="homeBodyDailyRecommendedUpperText1">Recommended Topics to Revisit</p>
                        <div className="homeBodyDailyRecommendedUpperText2Container">
                            <p className="homeBodyDailyRecommendedUpperText2">PRIORITY</p>
                            <p className="homeBodyDailyRecommendedUpperText22">TOPIC</p>
                            <p className="homeBodyDailyRecommendedUpperText23">LAST PRACTICED</p>
                        </div>
                    </div>
                    <div className="homeBodyDailyRecommendedUpperOption">
                        <p className="homeBodyDailyRecommendedUpperOptionText1 blueText1">High</p>
                        <p className="homeBodyDailyRecommendedUpperOptionText2 blueText">Union Find</p>
                        <p className="homeBodyDailyRecommendedUpperOptionText3">3 days ago</p>
                    </div>
                    <div className="homeBodyDailyRecommendedUpperOption">
                        <p className="homeBodyDailyRecommendedUpperOptionText1 blueText2">Medium</p>
                        <p className="homeBodyDailyRecommendedUpperOptionText2 blueText">Topological Sort</p>
                        <p className="homeBodyDailyRecommendedUpperOptionText3">3 days ago</p>
                    </div>
                    <div className="homeBodyDailyRecommendedUpperOption">
                        <p className="homeBodyDailyRecommendedUpperOptionText1 blueText3">Low</p>
                        <p className="homeBodyDailyRecommendedUpperOptionText2 blueText">Dynamic Programming</p>
                        <p className="homeBodyDailyRecommendedUpperOptionText3">3 days ago</p>
                    </div>
                </div>
                <div className="homeBodyDailyRecommendedLower">
                    <div className="homeBodyDailyRecommendedLower1">
                        <p className="homeBodyDailyRecommendedLowerText1">Recommended Problems</p>
                        <div className="homeBodyDailyRecommendedLowerText2Container">
                            <p className="homeBodyDailyRecommendedLowerText2">PRIORITY</p>
                            <p className="homeBodyDailyRecommendedLowerText22">PROBLEM</p>
                            <p className="homeBodyDailyRecommendedLowerText23">TOPICS</p>
                            <p className="homeBodyDailyRecommendedLowerText24">DIFFICULTY</p>
                        </div>
                    </div>
                    <div className="homeBodyDailyRecommendedLowerOption">
                        <p className="homeBodyDailyRecommendedLowerOptionText1 blueText1">High</p>
                        <p className="homeBodyDailyRecommendedLowerOptionText2 blueText">684. Redundant Connection</p>
                        <div className="homeBodyDailyRecommendedLowerTopics">
                            <p className="homeBodyDailyRecommendedLowerTopic">Depth-First Search</p>
                            <p className="homeBodyDailyRecommendedLowerTopic">Breadth-First Search</p>
                            <p className="homeBodyDailyRecommendedLowerTopic">Union Find</p>
                            <p className="homeBodyDailyRecommendedLowerTopic">Graph</p>
                        </div>
                        <p className="homeBodyDailyRecommendedLowerOptionText3 yellowText">Medium</p>
                    </div>
                    <div className="homeBodyDailyRecommendedLowerOption">
                        <p className="homeBodyDailyRecommendedLowerOptionText1 blueText2">Medium</p>
                        <p className="homeBodyDailyRecommendedLowerOptionText2 blueText">1444. Number of Ways of Cutting a Pizza</p>
                        <div className="homeBodyDailyRecommendedLowerTopics">
                            <p className="homeBodyDailyRecommendedLowerTopic">Array</p>
                            <p className="homeBodyDailyRecommendedLowerTopic">Dynamic Programming</p>
                            <p className="homeBodyDailyRecommendedLowerTopic">Memoization</p>
                            <p className="homeBodyDailyRecommendedLowerTopic">Matrix</p>
                        </div>
                        <p className="homeBodyDailyRecommendedLowerOptionText3 redText">Hard</p>
                    </div>
                    <div className="homeBodyDailyRecommendedLowerOption">
                        <p className="homeBodyDailyRecommendedLowerOptionText1 blueText3">Low</p>
                        <p className="homeBodyDailyRecommendedLowerOptionText2 blueText">543. Diameter of Binary Tree</p>
                        <div className="homeBodyDailyRecommendedLowerTopics">
                            <p className="homeBodyDailyRecommendedLowerTopic">Depth-First Search</p>
                            <p className="homeBodyDailyRecommendedLowerTopic">Breadth-First Search</p>
                            <p className="homeBodyDailyRecommendedLowerTopic">Union Find</p>
                            <p className="homeBodyDailyRecommendedLowerTopic">Graph</p>
                        </div>
                        <p className="homeBodyDailyRecommendedLowerOptionText3 greenText">Easy</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeBody;
