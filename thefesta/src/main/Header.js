import './Header.css';
import '../admin/css/AdminHeader.css';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import axios from 'axios';

function Header() {
    const [isToggled, setIsToggled] = useState(false);
    const [userToggled, setUserToggled] = useState(false);

    const [cookies, setCookie, removeCookie] = useCookies(['loginInfo']);
    const [loggedIn, setLoggedIn] = useState(false);
    const [getNickname, setGetNickname] = useState('');
    const [getStatecode, setStatecode] = useState('');
    const id = Cookies.get('loginInfo');
    const parsedId = id ? JSON.parse(id) : '';
    console.log(parsedId);

    const navigate = useNavigate();

    const location = useLocation();
    const [selMenu, setSelMenu] = useState(null);

    useEffect(() => {
        const pathname = location.pathname;

        if (
            pathname === '/' ||
            pathname === '/festival/:pageNum/:keyword?' ||
            pathname === '/festival/detail/:contentid/:page?'
        ) {
            setSelMenu('festival');
        } else if (pathname === '/scheduler') {
            setSelMenu('scheduler');
        } else if (pathname === '/board') {
            setSelMenu('board');
        } else if (pathname === '/login') {
            setSelMenu('login')
        } else if (pathname === '/join') {
            setSelMenu('join')
        }
    }, [location.pathname]);

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
            <H isToggled={isToggled} userToggled={userToggled}>
                <div className='header'>
                    <div className='icons'>
                        {/* 햄버거 버튼(bar) */}
                        <div
                            className='toggle'
                            onClick={() => {
                                setIsToggled(!isToggled);
                            }}
                        >
                            <img className='header_hbgBtn' src="/images/hbgBtn.svg" alt='hamburger button' />
                        </div>
                        <div className='header_logo hover' >
                            <h1>THE<br />FESTA</h1>
                        </div>

                        <div className='header_menu hover header__menulist'>
                            {loggedIn ? (
                                <>
                                    <Link className='menu' to='/admin/member'><li className='menu'>회원</li></Link>
                                    <Link className='menu' to='/admin/report'><li className='menu menu_scheduler'>신고</li></Link>
                                    <Link className='menu' to='/admin/festa'><li className='menu'>축제</li></Link>
                                    <Link className='menu' to='/admin/board'><li className='menu'>게시판</li></Link>
                                </>
                            ) : (
                                <>
                                    <Link className='menu' to='/'><li className='menu'>축제</li></Link>
                                    <Link className='menu' to='/scheduler'><li className='menu menu_scheduler'>스케줄러</li></Link>
                                    <Link className='menu' to='/board'><li className='menu'>톡톡</li></Link>
                                </>
                            )}
                        </div>

                        <div className='header_member hover header__right'>
                            {loggedIn ? (
                                <>
                                    <button type="button" className='adminlogout' onClick={handleLogout} >로그아웃</button>
                                </>
                            ) : (
                                <>
                                    <Link to='/login' className='member'>Login</Link>
                                    <Link to='/AgreementPage' className='member'>Join</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </H>
        )
    } else {
        return (
            <H isToggled={isToggled} userToggled={userToggled}>
                <div className='header'>
                    <div className='icons'>
                        {/* 햄버거 버튼(bar) */}
                        <div
                            className='toggle'
                            onClick={() => {
                                setIsToggled(!isToggled);
                            }}
                        >
                            <img className='header_hbgBtn' src="/images/hbgBtn.svg" alt='hamburger button' />
                        </div>
                    </div>
                    <div className='header_logo hover' >
                        <Link to={'/'}><h1>THE<br />FESTA</h1></Link>
                    </div>
                    <div className='header_menu hover header__menulist'>
                        <Link to={'/'}>
                            <p className={`menu ${selMenu === 'festival' ? 'highlight' : ''}`}>축제</p>
                        </Link>
                        <Link to={'/scheduler'}>
                            <p className={`menu  ${selMenu === 'scheduler' ? 'highlight' : ''}`}>스케줄러</p>
                        </Link>
                        <Link to={'/board'}>
                            <p className={`menu ${selMenu === 'board' ? 'highlight' : ''}`}>톡톡</p>
                        </Link>
                    </div>
                    <div className='header_member hover header__right'>
                        {loggedIn ? (
                            <>
                                <Link to='/mypage' className='mypage'>{getNickname}</Link>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>
                                    <p className={`member loginBtn ${selMenu === 'login' ? 'highlight2' : ''}`}>Login</p>
                                </Link>
                                <Link to='/AgreementPage'>
                                    <p className={`member ${selMenu === 'join' ? 'highlight2' : ''}`}>Join</p>
                                </Link>
                            </>
                        )}

                    </div>
                </div>
            </H>
        )
    }
}

export default Header;

const H = styled.div`
  .logo {
    margin: 0 1rem;
    font-size: 2rem;
  }

  .header__menulist {
    list-style: none;
    display: flex;
  }

  .header__left {
    display: flex;
  }

  .header__right {
    list-style: none;
    display: flex;
  }

  .header__right div {
    margin: 0 1rem;
  }

  li {
    padding: 0 1rem;
  }

  .toggle {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  .user {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;

    .header__right {
      display: ${(props) => (props.userToggled ? 'flex' : 'none')};
      flex-direction: column;
      width: 100%;
      background-color: white;
    }

    .header__menulist {
      display: ${(props) => (props.isToggled ? 'flex' : 'none')};
      flex-direction: column;
      width: 100%;
      background-color: white;
      color: black;
    }

    .header__menulist li,
    .header__right li {
      margin: 1rem 0;
      padding: 0;
    }

    .toggle {
      display: block;
    }

    .user {
      display: block;
    }

    .icons {
      display: flex;
      flex-direction: row;
    }
  }
`;