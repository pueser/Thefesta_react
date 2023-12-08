import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import './MyPage.css';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

function MyPage() {

  const [cookies, setCookie, removeCookie] = useCookies(['loginInfo']);

  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);
  const id = Cookies.get('loginInfo').trim();
  const parsedId = id ? JSON.parse(id) : '';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:9090/member/selMember', {
          id: parsedId
        });
        
        const memData = response.data;

        if (memData.profileImg) {
          setImageUrl(memData.profileImg);
        }
      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    };
    fetchData();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    
    const formData = new FormData();
    formData.append('id', parsedId); 
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:9090/member/updateImg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data === 'success') {
        const memberResponse = await axios.post('http://localhost:9090/member/selMember', {
          id: parsedId,
          randomParam: Math.random(),
        });
        
        const memData = memberResponse.data;
        console.log("memData : " + memData.profileImg);

        if (memData.profileImg) {
          setImageUrl(memData.profileImg);
        }
      }

      console.log(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

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

  return (
    <div>
      <img
        src={`${imageUrl}`}
        alt="Profile Preview"
        onClick={handleImageClick}
        className='mypageimage'
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      /><br/>

      <>
        <Link to='/MemInfoReset' className='MemInfoReset'>회원정보수정</Link><br/>
        <Link to='/withdrawal' className='withdrawal'>회원탈퇴</Link>
      </>

      <button type="button" onClick={handleLogout} className='PwReset-button'>
          로그아웃
        </button>
    </div>
  );
}

export default MyPage;