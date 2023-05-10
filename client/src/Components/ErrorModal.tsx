import React, { useState } from "react";

import './ErrorModal.css'

function ErrorModal(props: {onClose: () => void; error: string;}) {
    return (
        <div className='errorModalBackdrop' onClick={props.onClose}>
            <div className="errorModal">
                <p className='errorModalText'>{props.error}</p>
            </div>
        </div>
    )
}

export default ErrorModal;
