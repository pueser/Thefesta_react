import './Header.css';
import '../admin/css/AdminHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import axios from 'axios';

function Header() {
    const [cookies, setCookie, removeCookie] = useCookies(['loginInfo']);
    const [loggedIn, setLoggedIn] = useState(false);
    const [getNickname, setGetNickname] = useState('');
    const [getStatecode, setStatecode] = useState('');

    const id = Cookies.get('loginInfo');
    const parsedId = id ? JSON.parse(id) : '';
    console.log(parsedId);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (parsedId !== '') {
                    const response = await axios.post('http://localhost:9090/member/selMember', {
                        id: parsedId
                    });
                    const memData = response.data;

                    if (memData.nickname) {
                        setGetNickname(memData.nickname);
                    }
                    if (memData.statecode) {
                        setStatecode(memData.statecode);
                    }
                }
            } catch (error) {
                console.error('Error fetching member data:', error);
            }
        };
        fetchData();
    }, [parsedId]);

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
                navigate('/')
                removeCookie('loginInfo');
            } else {
                console.error('로그아웃 실패:', response.data);
            }
        } catch (error) {
            // 오류 처리
            console.error('로그아웃 중 오류 발생:', error);
        }
    };


    if (getStatecode === "0") {
        return (
            <div className='header'>
                <div className='header_hbgBtn'>
                    <img src="/images/hbgBtn.svg" alt='hamburger button' />
                </div>
                <div className='header_logo hover' >
                    <h1>THE<br />FESTA</h1>
                </div>

                <div className='header_menu hover'>
                    {loggedIn ? (
                        <>
                            <Link className='menu' to='/member'><li className='menu'>회원</li></Link>
                            <Link className='menu' to='/report'><li className='menu menu_scheduler'>신고</li></Link>
                            <Link className='menu' to='/festa'><li className='menu'>축제</li></Link>
                            <Link className='menu' to='/board'><li className='menu'>게시판</li></Link>
                        </>
                    ) : (
                        <>
                            <Link className='menu' to='/'><li className='menu'>축제</li></Link>
                            <Link className='menu' to='/scheduler'><li className='menu menu_scheduler'>스케줄러</li></Link>
                            <Link className='menu' to='/board'><li className='menu'>톡톡</li></Link>
                        </>
                    )}
                </div>

                <div className='header_member hover'>
                    {loggedIn ? (
                        <>
                            <button type="button" className='adminlogout' onClick={handleLogout} >로그아웃</button>
                        </>
                    ) : (
                        <>
                            <Link to='/login' className='member'>Login</Link>
                            <Link to='/join' className='member'>Join</Link>
                        </>
                    )}
                </div>
            </div>
        )
    } else {
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
                    <Link className='menu' to='/scheduler'><li className='menu menu_scheduler'>스케줄러</li></Link>
                    <Link className='menu' to='/board'><li className='menu'>톡톡</li></Link>
                </div>
                <div className='header_member hover'>
                    {loggedIn ? (
                        <>
                            <Link to='/mypage' className='mypage'>{getNickname}</Link>
                        </>
                    ) : (
                        <>
                            <Link to='/login' className='member'>Login</Link>
                            <Link to='/join' className='member'>Join</Link>
                        </>
                    )}

                </div>
            </div>
        )
    }



}

export default Header;