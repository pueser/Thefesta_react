import { useEffect, useState } from 'react';
import './Like.css';
import axios from 'axios';
import Cookies from 'js-cookie';

function Like({ contentid }) {
  const [isLiked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState(null);

  // 좋아요 DB 데이터 가져오기
  const likeInfo = (id) => {
    let lDto = {
      contentid: contentid,
      id: id,
    };
    axios
      .get('/festival/likeSearch', { params: lDto })
      .then((res) => {
        console.log('likeInfo res : ', res.data);
        if (res.data === 1) {
          setLikedStatusToLocalStorage(userId, contentid, !isLiked);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 좋아요 상태 로컬 스토리지에서 가져오기
  const getLikedStatusFromLocalStorage = (userId, contentid) => {
    const likedStatus = JSON.parse(
      localStorage.getItem(`likedStatus_${userId}_${contentid}`)
    );
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
    setIsLiked((prevIsLiked) => !prevIsLiked);

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
    const lDto = {
      id: userId,
      contentid: contentid,
    };
    console.log('lDto:', lDto);

    axios
      .post('/festival/likeInsert', lDto)
      .then((response) => {
        if (response.status === 200) {
          setIsLiked(true);
        } else {
          console.log('Like request failed.');
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  // 좋아요 취소 시 데이터 보내기
  const sendUnlikeRequest = () => {
    const lDto = {
      id: userId,
      contentid: contentid,
    };

    axios
      .post('/festival/likeDelete', lDto)
      .then((response) => {
        if (response.status === 200) {
          setIsLiked(false);
        } else {
          console.log('Unlike request failed.');
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  // 회원 정보 가져오기
  const getUserInfo = () => {
    const loginInfo = Cookies.get('loginInfo');
    if (loginInfo) {
      try {
        const parsedLoginInfo = JSON.parse(decodeURIComponent(loginInfo));
        setUserId(parsedLoginInfo.id);
        console.log('id:', parsedLoginInfo.id);
        likeInfo(parsedLoginInfo.id);
      } catch (error) {
        console.error('Error parsing loginInfo:', error);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    // 컴포넌트가 마운트 될 때, 로컬 스토리지에서 좋아요 상태를 불러와 설정
    setIsLiked(getLikedStatusFromLocalStorage(userId, contentid));
  }, [userId, contentid]);

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
