import './Header.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Header() {
    const [cookies, setCookie, removeCookie] = useCookies(['loginInfo']);
    const [loggedIn, setLoggedIn] = useState(false);

    const id = cookies.loginInfo;
    console.log(id);

    useEffect(() => {
        if (cookies.loginInfo) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [cookies.loginInfo]);

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:9090/member/logout', {
                params: { id }
            });
    
            if (response.data === 'success') {
                removeCookie('loginInfo');
                setLoggedIn(false);
            } else {
                console.error('로그아웃 실패:', response.data);
            }
        } catch (error) {
            // 오류 처리
            console.error('로그아웃 중 오류 발생:', error);
        }
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
                <Link className='menu' to='/'><li className='menu'>축제</li></Link>
                <Link className='menu' to='/scheduler'><li className='menu'>스케줄러</li></Link>
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