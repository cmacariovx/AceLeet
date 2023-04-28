import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux";

import Auth from "./Auth";

import { logout } from "../redux/slices/authSlice";

import './HomeHeader.css'

function HomeHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const username = useSelector(state => state.auth.username)

    const [selected, setSelected] = useState(null);
    const [dropdownActive, setDropdownActive] = useState(false);
    const [showAuth, setShowAuth] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        if (selected == null) {
            setSelected(window.location.pathname)
        }
    }, [window.location.pathname, selected])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="homeHeaderContainer">
            {showAuth && <Auth onClose={() => setShowAuth(false)}/>}
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
                    <p className="homeHeaderRightUsername" onClick={() => setDropdownActive(!dropdownActive)}>{isLoggedIn ? username : 'Log in'}</p>
                    {dropdownActive && <div className="homeHeaderRightDropdown" ref={dropdownRef}>
                        <div className="homeHeaderRightDropdownOption" onClick={() => {isLoggedIn ? dispatch(logout()): setShowAuth(true)}}>
                            <p className="homeHeaderRightDropdownOptionText">{isLoggedIn ? 'Log out' : 'Log in'}</p>
                            <i className={isLoggedIn ? "fa-solid fa-arrow-up-right-from-square homeHeaderRightUsernameIcon" : "fa-solid fa-arrow-right-to-bracket homeHeaderRightUsernameIcon"}></i>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default HomeHeader;
