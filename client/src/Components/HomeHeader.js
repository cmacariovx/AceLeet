import React from "react";

import './HomeHeader.css'

function HomeHeader() {
    return (
        <div className="homeHeaderContainer">
            <div className="homeHeaderContainerMain">
                <div className="homeHeaderLeft">
                    <div className="homeHeaderLeftOption2">
                        <p className="homeHeaderLeftOptionText">Dashboard</p>
                    </div>
                    <div className="homeHeaderLeftOption">
                        <p className="homeHeaderLeftOptionText">Recommended</p>
                    </div>
                    <div className="homeHeaderLeftOption">
                        <p className="homeHeaderLeftOptionText">Problems</p>
                    </div>
                </div>
                <div className="homeHeaderMiddle">
                    <img src="#" className="homeHeaderBrand"/>
                </div>
                <div className="homeHeaderRight">
                    <p className="homeHeaderRightUsername">cmacariovx</p>
                </div>
            </div>
        </div>
    )
}

export default HomeHeader;
