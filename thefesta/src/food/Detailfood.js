import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Detailfood.css';
import DetailMap from './components/DetailMap';

function Detailfood() {
    const { contentid } = useParams();
    // console.log('contentid: ' + contentid);
    const [food, setFood] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [userId, setUserId] = useState(null);

    // 회원 로그인 확인
    const isUserLoggedIn = () => {
        const loginInfo = Cookies.get('loginInfo');
        console.log("login check : ", loginInfo);
        return !!loginInfo; // loginInfo 쿠키가 존재하면 true를 반환
    };

    // 회원이 좋아요한 음식점 가져오기
    const getUserLike = async () => {
        try {
            const userLikedResponse = await fetch(`/food/userlikelist?id=${userId}`);
            if (userLikedResponse.ok) {

                const likeData = await userLikedResponse.json();
                console.log("data:", likeData);
    
                const isLikedByUser = likeData.likeDTOList.some(item => item.contentid === contentid);
                console.log("isLikedByUser", isLikedByUser);
                setIsLiked(isLikedByUser);
            }
        } catch (error) {
            console.error("Error fetching data: " + error);
        }
    };

    // 좋아요 토글 및 로그인 상태 확인
    const toggleLike = () => {

        setIsLiked(prevIsLiked => !prevIsLiked);

        if (isUserLoggedIn()) {
            if (!isLiked) {
                sendLikeRequest();  //좋아요
            } else {
                sendUnlikeRequest();  //좋아요 취소
            }
        } else {
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

            // title의 ()내용 삭제
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
        window.scrollTo(0, 0);

        getFood();
        getUserInfo();

        if(userId) {
            getUserLike();
        }

    }, [userId, contentid, isLiked]);

    // 데이터에서 <br>을 공백으로 대체
    const formatDataWithLineBreaks = (data) => {
        if (typeof data === 'string') {
            return data.replace(/<br>/g, ' ');
        }
        return data;
    };

    //firstimage의 데이터 유무 확인
    const imageSource = food.firstimage ? food.firstimage : "/images/noimage.png";

    // title 글자 수에 따라 클래스네임 설정
    const titleClassName = food && food.title && food.title.length > 15 ? 'Detail-food-title-long' : 'Detail-food-title';

    return (
        <section className="Detail-container">
            <div className="Detail-food">
                <div className="Detail-food-flex">
                    <div className="Detail-food-image">
                        <img src={imageSource} title={food.title} alt={food.title} />
                    </div>
                    <div className="Detail-food-data">
                        <div className="Detail-food-data-flex1">
                            <h2 className={titleClassName}>{food.title}</h2>
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