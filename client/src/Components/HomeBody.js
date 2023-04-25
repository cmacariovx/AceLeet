import React, { useState } from "react";
import BarChart from "./BarChart";
import StatusCircle from "./StatusCircle";

import './HomeBody.css'
import DoughnutChart1 from "./DoughnutChart1";
import DoughnutChart2 from "./DoughnutChart2";

function HomeBody() {
    const [isOpen1, setIsOpen1] = useState(true);
    const [isOpen2, setIsOpen2] = useState(true);

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
                        <p className="homeBodyContainerKPILeftLower">82</p>
                    </div>
                    <div className="homeBodyContainerKPIRight">
                        <i className="fa-solid fa-code"></i>
                    </div>
                </div>
                <div className="homeBodyContainerKPI">
                    <div className="homeBodyContainerKPILeft">
                        <p className="homeBodyContainerKPILeftUpper">TOTAL PRACTICE HOURS</p>
                        <p className="homeBodyContainerKPILeftLower">18.21</p>
                    </div>
                    <div className="homeBodyContainerKPIRight">
                        <i className="fa-regular fa-clock"></i>
                    </div>
                </div>
                <div className="homeBodyContainerKPI">
                    <div className="homeBodyContainerKPILeft">
                        <p className="homeBodyContainerKPILeftUpper">SOLVED W/O SOLUTION</p>
                        <p className="homeBodyContainerKPILeftLower">56.00%</p>
                    </div>
                    <div className="homeBodyContainerKPIRight">
                        <i className="fa-regular fa-object-ungroup"></i>
                    </div>
                </div>
            </div>
            <div className="homeBodyDailyRecommendedContainer">
            <div className="homeBodyDailyRecommendedUpper" style={isOpen1 ? {overflow: 'hidden'} : {overflow: 'visible'}}>
                    <div className="homeBodyDailyRecommendedUpper1">
                        <div className="homeBodyDailyRecommendedUpperText1" style={!isOpen1 ? {borderRadius: 10} : null} onClick={() => setIsOpen1(!isOpen1)}>
                            <p className="homeBodyDailyRecommendedUpperText11">Recommended Topics to Revisit</p>
                            {isOpen1 ? <i className="fa-solid fa-chevron-up"></i> :
                            <i className="fa-solid fa-chevron-down"></i>}
                        </div>
                        {isOpen1 && <div className="homeBodyDailyRecommendedUpperText2Container">
                            <p className="homeBodyDailyRecommendedUpperText2">PRIORITY</p>
                            <p className="homeBodyDailyRecommendedUpperText22">TOPIC</p>
                            <p className="homeBodyDailyRecommendedUpperText23">LAST PRACTICED</p>
                        </div>}
                    </div>
                    {isOpen1 && <>
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
                    </>}
                </div>
                <div className="homeBodyDailyRecommendedLower" style={isOpen2 ? {overflow: 'hidden'} : {overflow: 'visible'}}>
                    <div className="homeBodyDailyRecommendedLower1">
                        <div className="homeBodyDailyRecommendedLowerText1" style={!isOpen2 ? {borderRadius: 10} : null} onClick={() => setIsOpen2(!isOpen2)}>
                            <p className="homeBodyDailyRecommendedLowerText11">Recommended Problems</p>
                            {isOpen2 ? <i className="fa-solid fa-chevron-up"></i> :
                            <i className="fa-solid fa-chevron-down"></i>}
                        </div>
                        {isOpen2 && <div className="homeBodyDailyRecommendedLowerText2Container">
                            <p className="homeBodyDailyRecommendedLowerText2">STATUS</p>
                            <p className="homeBodyDailyRecommendedLowerText22">PROBLEM</p>
                            <p className="homeBodyDailyRecommendedLowerText23">TOPICS</p>
                            <p className="homeBodyDailyRecommendedLowerText24">DIFFICULTY</p>
                        </div>}
                    </div>
                    {isOpen2 && <>
                    <div className="homeBodyDailyRecommendedLowerOption">
                        <div className="homeBodyDailyRecommendedLowerOptionText1 blueText2"><StatusCircle color={'yellow'}/></div>
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
                        <div className="homeBodyDailyRecommendedLowerOptionText1 blueText1"><StatusCircle color={'green'}/></div>
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
                        <div className="homeBodyDailyRecommendedLowerOptionText1 blueText3"><StatusCircle color={'green'}/></div>
                        <p className="homeBodyDailyRecommendedLowerOptionText2 blueText">543. Diameter of Binary Tree</p>
                        <div className="homeBodyDailyRecommendedLowerTopics">
                            <p className="homeBodyDailyRecommendedLowerTopic">Depth-First Search</p>
                            <p className="homeBodyDailyRecommendedLowerTopic">Breadth-First Search</p>
                            <p className="homeBodyDailyRecommendedLowerTopic">Union Find</p>
                            <p className="homeBodyDailyRecommendedLowerTopic">Graph</p>
                        </div>
                        <p className="homeBodyDailyRecommendedLowerOptionText3 greenText">Easy</p>
                    </div>
                    </>}
                </div>
            </div>
            <div className="homeBodyChartsContainer">
                <div className="homeBodyChartsContainerUpper">
                    <div className="homeBodyChartsContainerUpperLeft">
                        <div className="homeBodyChartsContainerUpperLeftUpper">
                            <p className="homeBodyChartsContainerUpperLeftUpperText">Average Difficulty Per Topic</p>
                        </div>
                        <div className="homeBodyChartsContainerUpperLeftLower">
                            <BarChart />
                        </div>
                    </div>
                    <div className="homeBodyChartsContainerUpperRight">
                        <div className="homeBodyChartsContainerUpperRightUpper">
                            <p className="homeBodyChartsContainerUpperRightUpperText">Difficulty</p>
                        </div>
                        <div className="homeBodyChartsContainerUpperRightLower">
                            <DoughnutChart1 />
                        </div>
                    </div>
                </div>
                <div className="homeBodyChartsContainerLower">
                    <div className="homeBodyChartsContainerLowerLeft">
                        <div className="homeBodyChartsContainerLowerLeftUpper">
                            <p className="homeBodyChartsContainerLowerLeftUpperText">Topics</p>
                        </div>
                        <div className="homeBodyChartsContainerLowerLeftLower">
                            <DoughnutChart2 />
                        </div>
                    </div>
                    <div className="homeBodyChartsContainerLowerRight">
                        <div className="homeBodyChartsContainerLowerRightUpper">
                            <p className="homeBodyChartsContainerLowerRightUpperText">Solved w/o Solution %</p>
                        </div>
                        <div className="homeBodyChartsContainerLowerRightLower">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeBody;
