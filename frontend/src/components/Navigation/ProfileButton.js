import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        console.log('on click logout')
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/')
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button onClick={openMenu}>
                <i className="fa-solid fa-bars" />
                <i className="fas fa-user-circle" />
            </button>
            <div className={`${ulClassName} top`} ref={ulRef}>
                {user ? (
                    <>
                        <p>Hello, {user.username}<br />
                            {user.email}</p>
                        <p className="current-links"><NavLink className={"current-user-spots"} to={'/spots/current'}>Manage Spots</NavLink>                            <NavLink className={"current-user-reviews"} to={'/reviews/current'}>Manage Reviews</NavLink></p>
                        <button onClick={logout}>Log Out</button>

                    </>
                ) : (
                    <>
                        <OpenModalMenuItem
                            itemText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </>
                )}
            </div>
        </>
    );
}

export default ProfileButton;
