import React, { useState } from "react";
import './HomeFooter.css';
import EmailModal from "./EmailModal";

function HomeFooter() {
    const [showEmail, setShowEmail] = useState(false);

    return (
        <div className="homeFooter">
            {showEmail && <EmailModal closeModal={() => setShowEmail(false)} />}
            <button className="homeFooterText2" onClick={() => setShowEmail(true)}>Give Feedback</button>
            <p className="homeFooterText1">© 2023 AceLeet</p>
        </div>
    )
}

export default HomeFooter;
