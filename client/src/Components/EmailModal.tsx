import React, { useState } from 'react';

import './EmailModal.css';

const EmailModal = ({ closeModal }: { closeModal: () => void }) => {
    const [emailSent, setEmailSent] = useState(false);

    const gmailLink = 'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=aceleetx@gmail.com&su=Feedback&body=Your%20feedback%20here';
    const outlookLink = 'https://outlook.live.com/owa/?path=/mail/action/compose&to=aceleetx%40gmail.com&subject=Feedback&body=Your%20feedback%20here';

    const handleEmailButtonClick = (url: string) => {
        window.open(url, '_blank');
        setEmailSent(true);
    }

    return (
        <div className='emailBackdrop' onClick={closeModal}>
            <div className='emailContainer' onClick={(e) => e.stopPropagation()}>
                {!emailSent && <>
                    <p className='emailText'>Choose your preferred email service or</p>
                    <p className='emailText'>Email us manually at aceleetx@gmail.com.</p>
                    <div className='emailButtons'>
                        <button onClick={() => handleEmailButtonClick(gmailLink)}>Gmail</button>
                        <button onClick={() => handleEmailButtonClick(outlookLink)}>Outlook</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </>}
                {emailSent &&
                <>
                    <p className='thankYouText'>We appeciate your feedback. We will be reviewing it shortly.</p>
                    <button className='closeButton' onClick={closeModal}>Close</button>
                </>
                }
            </div>
        </div>
    );
};

export default EmailModal;
