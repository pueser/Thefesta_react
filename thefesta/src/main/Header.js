import './Header.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
// import hbgBtn from './images/hbgBtn.svg';

function Header() {
    const [cookies, setCookie, removeCookie] = useCookies(['loginInfo']);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (cookies.loginInfo) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [cookies.loginInfo]);

    const handleLogout = async () => {
        await axios.get('http://localhost:9090/member/logout');

        removeCookie('loginInfo');
        setLoggedIn(false);
    };
    return (
        <div className='header'>
            <div className='header_hbgBtn'>
                <img src="/images/hbgBtn.svg" alt='hamburger button' />
            </div>
            <div className='header_logo hover' >
                <h1>THE<br />FESTA</h1>
            </div>
            <div className='header_menu hover'>
                {/* <p className='menu'>축제</p>
                <p className='menu menu_scheduler'>스케줄러</p>
                <p className='menu'>톡톡</p> */}
                <Link className='menu' to='/'><li className='menu'>축제</li></Link>
                <Link className='menu' to='/scheduler'><li className='menu menu_scheduler'>스케줄러</li></Link>
                <Link className='menu' to='/board'><li className='menu'>톡톡</li></Link>
            </div>
            <div className='header_member hover'>
                {loggedIn ? (
                    <p className='member' onClick={handleLogout}>Logout</p>
                ) : (
                    <>
                        <Link to='/login' className='member'>Login</Link>
                        <Link to='/join' className='member'>Join</Link>
                    </>
                )}
            </div>
        </div>
    );

}

export default Header;