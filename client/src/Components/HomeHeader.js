import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router"

import './HomeHeader.css'

function HomeHeader() {
    const navigate = useNavigate();

    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (selected == null) {
            setSelected(window.location.pathname)
        }
    }, [window.location.pathname, selected])

    return (
        <div className="homeHeaderContainer">
            <div className="homeHeaderContainerMain">
                <div className="homeHeaderLeft">
                    <div className={selected == '/' ? "homeHeaderLeftOption2 homeHeaderBorderBottom " : "homeHeaderLeftOption2"} onClick={() => navigate('/')}>
                        <p className="homeHeaderLeftOptionText">Dashboard</p>
                    </div>
                    <div className={selected == '/recommended' ? "homeHeaderLeftOption homeHeaderBorderBottom " : "homeHeaderLeftOption"} onClick={() => navigate('/recommended')}>
                        <p className="homeHeaderLeftOptionText">Recommended</p>
                    </div>
                    <div className={selected == '/history' ? "homeHeaderLeftOption homeHeaderBorderBottom " : "homeHeaderLeftOption"} onClick={() => navigate('/history')}>
                        <p className="homeHeaderLeftOptionText">History</p>
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
