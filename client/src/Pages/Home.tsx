import React from "react";
import HomeHeader from "../Components/HomeHeader";
import HomeBody from "../Components/HomeBody";
import HomeFooter from "../Components/HomeFooter";

import './Home.css';

function Home() {
    return (
        <div className="homeContainer">
            <HomeHeader/>
            <HomeBody/>
            <HomeFooter/>
        </div>
    )
}

export default Home;
