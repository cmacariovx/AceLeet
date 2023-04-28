import React, { useState } from 'react';
import './Auth.css';

import { login } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

function Auth({ onClose }) {
    const isExistingUser = localStorage.getItem('existingUser')
    const [signup, setSignup] = useState(isExistingUser ? false : true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [text, setText] = useState('')

    const [usernameValid, setUsernameValid] = useState(null);
    const [emailValid, setEmailValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(null);

    const dispatch = useDispatch()

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
        setUsernameValid(usernameRegex.test(e.target.value));
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        setEmailValid(emailRegex.test(e.target.value));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        setPasswordValid(passwordRegex.test(e.target.value));
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordValid(password === e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset the error
        setError('');

        // Signup
        if (signup) {
            // Check username
            const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
            if (!usernameRegex.test(username)) {
                setError('Username must be at least 3 characters and contain only letters and numbers.');
                return;
            }

            // Check email
            const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            if (!emailRegex.test(email)) {
                setError('Please enter a valid email address.');
                return;
            }

            // Check password
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (!passwordRegex.test(password)) {
                setError('Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number.');
                return;
            }

            // Check confirm password
            if (password !== confirmPassword) {
                setError("Passwords must match.");
                return;
            }

            async function submitSignup(event) {
                event.preventDefault()
                const response = await fetch('http://localhost:5000' + '/auth/signup', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: username.toLowerCase(),
                        email: email.toLowerCase(),
                        password: password,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data = await response.json();
                if (data.error) setError(data.error);
                else {

                }
                return data;
            }

            submitSignup(e);
        }
        else {
            // Login
            // Check username/email
            if (!text) {
                setError('Please enter either a username or an email address.');
                return;
            }

            // Check password
            if (!password) {
                setError('Please enter a password.');
                return;
            }

            async function submitLogin(event) {
                event.preventDefault()
                const response = await fetch('http://localhost:5000' + '/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        text: text.toLowerCase(),
                        password: password,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data = await response.json();
                if (data.error) setError(data.error);
                else {
                    dispatch(
                        login({
                            userId: data.userId,
                            token: data.token,
                            email: data.email,
                            username: data.username,
                            joinedDate: data.joinedDate,
                        })
                    );
                    onClose();
                }
                return data;
            }

            submitLogin(e);
        }
    };

    const closeModal = () => {
        setError('');
    };

    return (
        <div className='authBackdrop' onClick={() => onClose()}>
        <div className="authContainer" style={!signup ? {height: '440px'} : {height: '600px'}} onClick={(e) => e.stopPropagation()}>
            <h1 className='authHeaderText'>{signup ? 'Create an account' : 'Welcome back!'}</h1>
            <form className="authForm" onSubmit={handleSubmit}>
            {signup && (
                    <>
                        <label className="authLabel" htmlFor="username">Username</label>
                        <input
                            className='authInput'
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            style={usernameValid === false ? { borderColor: 'red' } : {}}
                        />

                    <label className="authLabel" htmlFor="email">Email</label>
                    <input
                        className='authInput'
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        style={emailValid === false ? { borderColor: 'red' } : {}}
                    />
                    </>
                )}
                {!signup &&
                    <>
                        <label className="authLabel" htmlFor="text">Username or Email</label>
                        <input
                            className='authInput'
                            type="text"
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </>
                }
                <label className="authLabel" htmlFor="password">Password</label>
                <input
                    className='authInput'
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    style={passwordValid === false ? { borderColor: 'red' } : {}}
                />
                {signup && (
                    <>
                        <label className="authLabel" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            className='authInput'
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            style={confirmPasswordValid === false ? { borderColor: 'red' } : {}}
                        />
                    </>
                )}
                <button className='authButton' type="submit">{signup ? 'Create Account' : 'Login'}</button>
            </form>
            <button className="authFooter" onClick={() => setSignup(!signup)}>
                {signup
                ? "Already have an account? Log in"
                : "Don't have an account? Sign up"}
            </button>
            {error && (
                <div className='errorModalBackdrop' onClick={closeModal}>
                    <div className="errorModal">
                        <p className='errorModalText'>{error}</p>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}

export default Auth;
