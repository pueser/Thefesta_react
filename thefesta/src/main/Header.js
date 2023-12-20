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
        } else if (pathname === '/AgreementPage') {
            setSelMenu('join')
        } else if (pathname === '/admin/member') {
            console.log('test');
            console.log('setSelMenu admin member : ', selMenu);
            setSelMenu('adminMember')
        } else if (pathname === '/admin/report') {
            console.log('setSelMenu adminReport : ', selMenu);
            setSelMenu('adminReport')
        } else if (pathname === '/admin/festa') {
            console.log('setSelMenu adminFesta : ', selMenu);
            setSelMenu('adminFesta')
        } else if (pathname === '/admin/board') {
            console.log('setSelMenu adminBoard : ', selMenu);
            setSelMenu('adminBoard')
        } else if (pathname === '/admin/adminQuestion') {
            console.log('setSelMenu adminQuestion : ', selMenu);
            setSelMenu('adminQuestion')
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

    if (getStatecode === "0")  {
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
                        <h1>THE<br />FESTA</h1>
                    </div>
                        {loggedIn ? (
                            <>
                                <div className='header_menu hover'>
                                    <Link to={'/admin/member'}>
                                        <p className={`menu ${selMenu === 'adminMember' ? 'highlight' : ''}`}>회원</p>
                                    </Link>
                                    <Link to={'/admin/report'}>
                                        <p className={`menu  ${selMenu === 'adminReport' ? 'highlight' : ''}`}>신고</p>
                                    </Link>
                                    <Link to={'/admin/festa'}>
                                        <p className={`menu ${selMenu === 'adminFesta' ? 'highlight' : ''}`}>축제</p>
                                    </Link>
                                    <Link to={'/admin/board'}>
                                        <p className={`menu ${selMenu === 'adminBoard' ? 'highlight' : ''}`}>게시판</p>
                                    </Link>
                                    <Link to={'/admin/adminQuestion'}>
                                        <p className={`menu ${selMenu === 'adminQuestion' ? 'highlight' : ''}`}>문의사항</p>
                                    </Link>
                                </div>
                                <div className='header_member hover'>
                                    <button type="button" className='adminlogout' onClick={handleLogout} >로그아웃</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='header_menu hover'>
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
                                <div className='header_member hover'>
                                    <Link to='/login'>
                                        <p className={`member loginBtn ${selMenu === 'login' ? 'highlight2' : ''}`}>Login</p>
                                    </Link>
                                    <Link to='/AgreementPage'>
                                        <p className={`member joinBtn ${selMenu === 'join' ? 'highlight2' : ''}`}>Join</p>
                                    </Link>
                                </div>
                            </>
                            
                        )}
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
                    <div className='header_menu hover'>
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
                    <div className='header_member hover'>
                        {loggedIn ? (
                            <>
                                <Link to='/mypage' className='mypage member loginBtn'>{getNickname}</Link>
                                <p className='member-logout member joinBtn' onClick={handleLogout}>Logout</p>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>
                                    <p className={`member loginBtn ${selMenu === 'login' ? 'highlight2' : ''}`}>Login</p>
                                </Link>
                                <Link to='/AgreementPage'>
                                    <p className={`member joinBtn ${selMenu === 'join' ? 'highlight2' : ''}`}>Join</p>
                                </Link>
                            </>
                        )}

                    </div>
                </div>
                <div className='header__menulist'>
                    <Link to={'/'}>
                        <p className={`menu ${selMenu === 'festival' ? 'highlight' : ''}`}>축제</p>
                    </Link>
                    <Link to={'/scheduler'}>
                        <p className={`menu  ${selMenu === 'scheduler' ? 'highlight' : ''}`}>스케줄러</p>
                    </Link>
                    <Link to={'/board'}>
                        <p className={`menu ${selMenu === 'board' ? 'highlight' : ''}`}>톡톡</p>
                    </Link>
                    <Link to='/login'>
                        <p className={`member loginBtn ${selMenu === 'login' ? 'highlight2' : ''}`}>Login</p>
                    </Link>
                    <Link to='/AgreementPage'>
                        <p className={`member joinBtn ${selMenu === 'join' ? 'highlight2' : ''}`}>Join</p>
                    </Link>
                </div>
            </H>
        )
    }
}

export default Header;

const H = styled.div`
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

  .header__menulist {
    display: none;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;

    .header_hbgBtn {
      cursor: pointer;
    }

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
      align-items: center;
      margin-bottom: 10px;
    }

    .header__menulist p {
      margin: 1rem 0;
      padding: 0;
      
    }

    .header__menulist a {
      text-decoration: none;
    }

    .loginBtn {
        margin-right: 0;
    }

    .toggle {
      display: block;
    }
  }
`;