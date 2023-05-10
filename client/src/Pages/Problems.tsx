import React from "react";
import HomeHeader from "../Components/HomeHeader";
import HomeFooter from "../Components/HomeFooter";
import ProblemsBody from "../Components/ProblemsBody";

import './Problems.css';

function Problems() {
    return (
        <div className="problemsContainer">
            <HomeHeader/>
            <ProblemsBody/>
            <HomeFooter/>
        </div>
    )
}

export default Problems;
