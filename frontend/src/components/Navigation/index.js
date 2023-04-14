import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='header'>
            <div className='nameLogo'>
                <NavLink exact to="/"><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fdownload%2Fguacamole-green%2Fairbnb-512.jpg&f=1&nofb=1&ipt=f8fe3513725d315ae2a565903eb780bd7816d0dd30cd71d46bc129f93a9dcfab&ipo=images" alt='groundbnb Logo' /></NavLink>
                <NavLink exact to="/">groundbnb</NavLink> </div>
            <div className='right-header'><NavLink className={sessionUser !== null ? "new-spot-link" : 'hidden'} to={'/spots/new'}>Create a new Spot</NavLink>
                <div className='navbar'>
                    {isLoaded && (
                        <ProfileButton user={sessionUser} />
                    )}
                </div></div>
        </div >

    );
}

export default Navigation;
