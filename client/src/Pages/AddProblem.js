import React, { useState } from "react";
import HomeHeader from "../Components/HomeHeader";
import AddProblemBody from "../Components/AddProblemBody";
import HomeFooter from "../Components/HomeFooter";

import './AddProblem.css'

function AddProblem() {
    return (
        <div className="addProblem">
            <HomeHeader />
            <AddProblemBody />
            <HomeFooter />
        </div>
    )
}

export default AddProblem;
