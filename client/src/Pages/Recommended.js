import React from "react";
import HomeHeader from "../Components/HomeHeader";
import RecommendedBody from "../Components/RecommendedBody";
import HomeFooter from "../Components/HomeFooter";

import './Recommended.css'

function Recommended() {
    return (
        <div className="recommended">
            <HomeHeader />
            <RecommendedBody />
            <HomeFooter />
        </div>
    )
}

export default Recommended;
