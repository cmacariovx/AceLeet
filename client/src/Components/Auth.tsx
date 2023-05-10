import React, { useState, useRef } from 'react';
import './Auth.css';

import { login } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import ErrorModal from './ErrorModal';

import { PuffLoader } from 'react-spinners'

function Auth({ onClose }: { onClose: () => void}) {
    const isExistingUser = localStorage.getItem('existingUser')
    const [signup, setSignup] = useState(isExistingUser ? false : true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [text, setText] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [textError, setTextError] = useState('');

    const [usernameValid, setUsernameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

    const [mouseDownOnInput, setMouseDownOnInput] = useState(false);
    const backdropRef = useRef(null);

    const handleMouseDownOnInput = () => {
        setMouseDownOnInput(true);
    }

    const handleMouseUpOnBackdrop = (e: React.MouseEvent) => {
        if (e.target === backdropRef.current && !mouseDownOnInput) onClose();
        setMouseDownOnInput(false);
    }

    const dispatch = useDispatch()

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
        setUsernameValid(usernameRegex.test(e.target.value));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        setEmailValid(emailRegex.test(e.target.value));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        setPasswordValid(passwordRegex.test(e.target.value));
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordValid(password === e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError('');
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        setPasswordMatchError('');
        setTextError('')

        // Signup
        if (signup) {
            let isValid = true;

            const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
            if (!usernameRegex.test(username)) {
                setUsernameError('Username must be at least 3 characters and contain only letters and numbers.');
                isValid = false;
            }

            const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            if (!emailRegex.test(email)) {
                setEmailError('Please enter a valid email address.');
                isValid = false;
            }

            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (!passwordRegex.test(password)) {
                setPasswordError('Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number.');
                isValid = false;
            }

            if (password !== confirmPassword) {
                setPasswordMatchError("Passwords must match.");
                isValid = false;
            }

            if (isValid == false) return;

            submitSignup(e);
        }
        else {
            let isValid = true;

            if (!text) {
                setTextError('Please enter either a username or an email address.');
                isValid = false;
            }

            if (!password) {
                setPasswordError('Please enter a password.');
                isValid = false;
            }

            if (isValid == false) return;

            submitLogin(e);
        }

        async function submitSignup(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault()
            setIsLoading(true);
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/signup', {
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
            setIsLoading(false);
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

        async function submitLogin(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault()
            setIsLoading(true);
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/login', {
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
            setIsLoading(false);
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
    };

    return (
        <div
            className="authBackdrop"
            onMouseUp={handleMouseUpOnBackdrop}
            ref={backdropRef}
        >
        <div className="authContainer" style={!signup ? {height: '440px'} : {height: '600px'}} onClick={(e) => e.stopPropagation()}>
            {isLoading &&
                <div className='authSpinner'>
                    <PuffLoader color="#2c7be5"/>
                </div>
            }
            <h1 className='authHeaderText'>{signup ? 'Create an account' : 'Welcome back!'}</h1>
            <form className="authForm" onSubmit={handleSubmit}>
            {signup && (
                    <>
                        <label className="authLabel" htmlFor="username">Username</label>
                        <input
                            className='authInput'
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleUsernameChange}
                            style={usernameValid === false ? { borderColor: 'red' } : {}}
                            onMouseDown={handleMouseDownOnInput}
                        />
                        {usernameError && <p className='authError'>{usernameError}</p>}

                    <label className="authLabel" htmlFor="email">Email</label>
                    <input
                        className='authInput'
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        style={emailValid === false ? { borderColor: 'red' } : {}}
                        onMouseDown={handleMouseDownOnInput}
                    />
                        {emailError && <p className='authError'>{emailError}</p>}
                    </>
                )}
                {!signup &&
                    <>
                        <label className="authLabel" htmlFor="username">Username</label>
                        <input
                            className='authInput'
                            type="username"
                            id="username"
                            name="username"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onMouseDown={handleMouseDownOnInput}
                        />
                        {textError && <p className='authError'>{textError}</p>}
                    </>
                }
                <label className="authLabel" htmlFor="password">Password</label>
                <input
                    className='authInput'
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    style={(signup && passwordValid === false) ? { borderColor: 'red' } : {}}
                    onMouseDown={handleMouseDownOnInput}
                />
                {passwordError && <p className='authError'>{passwordError}</p>}
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
                            onMouseDown={handleMouseDownOnInput}
                        />
                        {passwordMatchError && <p className='authError'>{passwordMatchError}</p>}
                    </>
                )}
                <button className='authButton' type="submit">{signup ? 'Create Account' : 'Login'}</button>
            </form>
            <button className="authFooter" onClick={() => setSignup(!signup)}>
                {signup
                ? "Already have an account? Log in"
                : "Don't have an account? Sign up"}
            </button>
            {error != '' && <ErrorModal onClose={() => setError('')} error={error} />}
        </div>
        </div>
    );
}

export default Auth;
