import { useEffect, useState } from 'react';
import './Like.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

function Like({ contentid }) {
  const [userId, setUserId] = useState(null);

  // 좋아요 DB 데이터 가져오기
  const likeInfo = async (id) => {
    let lDto = {
      contentid: contentid,
      id: id,
    };
    try {
      const res = await axios.get('/festival/likeSearch', { params: lDto });
      console.log('likeInfo res:', res.data);

      if (res.data === 1) {
        setLikedStatusToLocalStorage(userId, contentid, true);
      } else if (res.data === 0) {
        setLikedStatusToLocalStorage(userId, contentid, false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 좋아요 상태 로컬 스토리지에서 가져오기
  const getLikedStatusFromLocalStorage = (userId, contentid) => {
    const likedStatus = JSON.parse(
      localStorage.getItem(`likedStatus_${userId}_${contentid}`)
    );
    return likedStatus || false;
  };

  // 좋아요 상태 로컬 스토리지에 저장
  const setLikedStatusToLocalStorage = (userId, contentid, status) => {
    localStorage.setItem(`likedStatus_${userId}_${contentid}`, status);
  };

  // 회원 로그인 확인
  const isUserLoggedIn = () => {
    const loginInfo = Cookies.get('loginInfo');
    return !!loginInfo;
  };

  // 좋아요 토글 및 로그인 상태 확인
  const toggleLike = async () => {
    if (isUserLoggedIn()) {
      setLikedStatusToLocalStorage(userId, contentid, !isLiked);

      if (!isLiked) {
        await sendLikeRequest();
      } else {
        await sendUnlikeRequest();
      }
    } else {
      setIsLiked(false);
      alert('로그인 후 이용해주세요.');
    }
  };

  // 좋아요 시 데이터 보내기
  const sendLikeRequest = async () => {
    const lDto = {
      id: userId,
      contentid: contentid,
    };

    try {
      const response = await axios.post('/festival/likeInsert', lDto);
      if (response.status === 200) {
        setLikedStatusToLocalStorage(userId, contentid, true);
      } else {
        console.log('Like request failed.');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  // 좋아요 취소 시 데이터 보내기
  const sendUnlikeRequest = async () => {
    const lDto = {
      id: userId,
      contentid: contentid,
    };

    try {
      const response = await axios.post('/festival/likeDelete', lDto);
      if (response.status === 200) {
        setLikedStatusToLocalStorage(userId, contentid, false);
      } else {
        console.log('Unlike request failed.');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  // 회원 정보 가져오기
  const getUserInfo = async () => {
    const loginInfo = Cookies.get('loginInfo');
    if (loginInfo) {
      try {
        const parsedLoginInfo = JSON.parse(loginInfo);
        setUserId(parsedLoginInfo);
        console.log('아이디 :', parsedLoginInfo);
        await likeInfo(parsedLoginInfo);
      } catch (error) {
        console.error('Error parsing loginInfo:', error);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []); // 두 번째 매개변수로 빈 배열을 전달하여 한 번만 실행되도록 설정

  // 컴포넌트가 마운트 될 때, 로컬 스토리지에서 좋아요 상태를 불러와 설정
  const initialLikedStatus = getLikedStatusFromLocalStorage(userId, contentid);
  const [isLiked, setIsLiked] = useState(initialLikedStatus);

  // 좋아요 상태 변경 시 로컬 스토리지에 상태 업데이트
  useEffect(() => {
    setLikedStatusToLocalStorage(userId, contentid, isLiked);
  }, [userId, contentid, isLiked]);

  return (
    <div className='likeContainer'>
      <div
        className={`likeStar ${isLiked ? 'selLikestar' : ''}`}
        onClick={toggleLike}
      ></div>
    </div>
  );
}

export default Like;
