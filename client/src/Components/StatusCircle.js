import React from "react";

import './StatusCircle.css'

function StatusCircle(props) {
    return (
        <div className="statusCircle" style={{border: `1.4px solid var(--${props.color})`}}></div>
    )
}

export default StatusCircle;
