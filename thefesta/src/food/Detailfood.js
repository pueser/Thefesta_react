import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Detailfood.css';
import DetailMap from './DetailMap';

function Detailfood() {
    const { contentid } = useParams();
    // console.log('contentid: ' + contentid);
    const [food, setFood] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [userId, setUserId] = useState(null);

    // 좋아요 상태 로컬 스토리지에서 가져오기
    const getLikedStatusFromLocalStorage = (userId, contentid) => {
        const likedStatus = JSON.parse(localStorage.getItem(`likedStatus_${userId}_${contentid}`));
        return likedStatus || false; // 기본값은 false로 설정
    };

    // 좋아요 상태 로컬 스토리지에 저장
    const setLikedStatusToLocalStorage = (userId, contentid, status) => {
        localStorage.setItem(`likedStatus_${userId}_${contentid}`, status);
    };

    // 회원 로그인 확인
    const isUserLoggedIn = () => {
        const loginInfo = Cookies.get('loginInfo');
        console.log(loginInfo);
        return !!loginInfo; // loginInfo 쿠키가 존재하면 true를 반환
    };

    // 좋아요 토글 및 로그인 상태 확인
    const toggleLike = () => {
        // 좋아요 상태를 토글
        setIsLiked(prevIsLiked => !prevIsLiked);

        if (isUserLoggedIn()) {
            // 토글된 상태에 따라 로컬 스토리지에 저장
            setLikedStatusToLocalStorage(userId, contentid, !isLiked);

            // 토글된 상태에 따라 요청 보내기
            if (!isLiked) {
                //좋아요 상태로 변경
                sendLikeRequest();
            } else {
                //좋아요 취소 상태로 변경
                sendUnlikeRequest();
            }
        } else {
            // 비회원 또는 미로그인 시
            setIsLiked(false);
            alert('로그인 후 이용해주세요.');
        }
    };

    // 좋아요 시 데이터 보내기
    const sendLikeRequest = () => {
        const requestData = {
            id: userId,
            contentid: food.contentid,
            cat3: food.cat3,
            title: food.title
        };
        console.log('requestData:', requestData);

        axios.post('http://localhost:9090/food/likefood', requestData)
            .then(response => {
                if (response.status === 200) {
                    setIsLiked(true);
                    document.getElementById('likeBtn').src = "/images/fullheart.png";
                } else {
                    console.log('Like request failed.');
                }
            })
            .catch(error => {
                console.log('Error', error);
            });
    };

    // 좋아요 취소 시 데이터 보내기
    const sendUnlikeRequest = () => {
        const requestData = {
            id: userId,
            contentid: food.contentid,
            cat3: food.cat3,
            title: food.title
        };

        axios.post('http://localhost:9090/food/unlikefood', requestData)
            .then(response => {
                if (response.status === 200) {
                    setIsLiked(false);
                    document.getElementById('likeBtn').src = "/images/emptyheart.png";
                } else {
                    console.log('Unlike request failed.');
                }
            })
            .catch(error => {
                console.log('Error', error);
            });
    };


    // 음식점 데이터 가져오기
    const getFood = async () => {
        try {
            const response = await fetch(`/food/detail?contentid=${contentid}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // console.log(data);

            // title () 안의 내용 삭제
            if (data.title && data.title.includes('(')) {
                data.title = data.title.replace(/\([^)]*\)/, '').trim();
            }


            setFood(data);
        } catch (error) {
            console.error("Error fetching data: " + error);
        }
    };

    // 회원 정보 가져오기
    const getUserInfo = () => {
        const loginInfo = Cookies.get('loginInfo');
        if (loginInfo) {
            try {
                const parsedLoginInfo = JSON.parse(decodeURIComponent(loginInfo));
                setUserId(parsedLoginInfo);
                console.log('id:', parsedLoginInfo);
            } catch (error) {
                console.error('Error parsing loginInfo:', error);
            }
        }
    };

    useEffect(() => {
        // 페이지 맨 위로 스크롤
        window.scrollTo(0, 0);

        // 음식 및 사용자 정보 가져오기
        getFood();
        getUserInfo();

        // 로컬 스토리지에서 좋아요 상태 불러오기
        setIsLiked(getLikedStatusFromLocalStorage(userId, contentid));
    }, [userId, contentid]);

    // 주소, 전화, 영업시간, 휴무일, 주차시설, 대표메뉴, 취급메뉴 데이터에서 <br>을 공백으로 대체
    const formatDataWithLineBreaks = (data) => {
        if (typeof data === 'string') {
            return data.replace(/<br>/g, ' ');
        }
        return data;
    };

    // 좋아요 상태 변경 시 로컬 스토리지에 상태 업데이트
    useEffect(() => {
        setLikedStatusToLocalStorage(userId, contentid, isLiked);
    }, [userId, contentid, isLiked]);

    //firstimage의 데이터 유무 확인
    const imageSource = food.firstimage ? food.firstimage : "/images/noimage.png";    

    return (
        <section className="Detail-container">
            <div className="Detail-food">
                <div className="Detail-food-flex">
                    <div className="Detail-food-image">
                        <img src={imageSource} title={food.title} alt={food.title} />
                    </div>
                    <div className="Detail-food-data">
                        <div className="Detail-food-data-flex1">
                            <h2 className="Detail-food-title">{food.title}</h2>
                            <span id="likeBtn" className="Detail-likeBtn" onClick={toggleLike}>
                                {isLiked ? <img className="Detail-heart" src="/images/fullheart.png" /> : <img className="Detail-heart" src="/images/emptyheart.png" />}
                            </span>
                        </div>
                        <table className="Detail-food-table">
                            <tbody>
                                <tr>
                                    <th>주소</th>
                                    <td>{formatDataWithLineBreaks(food.addr1)}</td>
                                </tr>
                                <tr>
                                    <th>전화</th>
                                    <td>{formatDataWithLineBreaks(food.infocenterfood)}</td>
                                </tr>
                                <tr>
                                    <th>영업시간</th>
                                    <td>{formatDataWithLineBreaks(food.opentimefood)}</td>
                                </tr>
                                <tr>
                                    <th>휴무일</th>
                                    <td>{formatDataWithLineBreaks(food.restdatefood)}</td>
                                </tr>
                                <tr>
                                    <th>주차시설</th>
                                    <td>{formatDataWithLineBreaks(food.parkingfood)}</td>
                                </tr>
                                <tr>
                                    <th>대표메뉴</th>
                                    <td>{formatDataWithLineBreaks(food.firstmenu)}</td>
                                </tr>
                                <tr>
                                    <th>취급메뉴</th>
                                    <td>{formatDataWithLineBreaks(food.treatmenu)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="Detail-food-info">
                    <p className="Detail-food-overview">소개</p>
                    <p className="Detail-food-content">{formatDataWithLineBreaks(food.overview)}</p>
                </div>
                <div className="Detail-food-map">
                    <p className="Detail-food-location">위치</p>
                    <DetailMap mapx={food.mapx} mapy={food.mapy} />
                </div>
            </div>
        </section >
    )
}

export default Detailfood;