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
        </div>
    )
}

export default HomeBody;
