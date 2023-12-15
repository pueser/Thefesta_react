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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const id = Cookies.get('loginInfo').trim();
  const parsedId = id ? JSON.parse(id) : '';
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:9090/member/selMember', {
          id: parsedId
        });

        const memData = response.data;
        setNickname(memData.nickname);
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
          
          setTimeout(() => {
            setImageUrl(memData.profileImg);
          }, 4000);
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='MyPage-myPage'>
      <h1 className='MyPage-title'>마이페이지</h1>
      <div className='MyPage-container'>
        <div className='MyPage-menuBtn'>
          <img className='MyPage-kebabBtn' src='./images/kebab_btn.png' onClick={toggleMenu}></img>
        </div>

        {isMenuOpen && (
          <div className='MyPage-selectMenu'>
            <div className='MyPage-box'>
              <img src='./images/memInfoReset.png' />
              <Link to='/MemInfoReset' className='MyPage-memInfoReset'>회원 정보 수정</Link>
            </div>
            <div className='MyPage-box'>
              <img src='./images/user_basic.png' />
              <Link to='/withdrawal' className='MyPage-withdrawal'>회원 탈퇴</Link>
            </div>
          </div>
        )}

        <div className='MyPage-image'>
          <img className='MyPage-profileImg' src={imageUrl} alt="Profile Preview" onClick={handleImageClick} />
          <input className='MyPage-uploadImg' type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
        </div>
        <div className='MyPage-nickname'>
          <p className='MyPage-name'>{nickname} 님</p>
        </div>

        <div className='MyPage-activity'>
          <div className='MyPage-festival'>
            <Link to={`/member/likeList/${parsedId}`}><img className='MyPage-likeFesta' src='./images/star.png' alt='좋아요' /></Link>
            <Link to={`/member/likeList/${parsedId}`}><p>좋아요</p></Link>
          </div>
          <div className='MyPage-board'>
            <Link to='/member/talktalk'><img className='MyPage-talktalk' src='./images/ttalk.png' alt='톡톡' /></Link>
            <Link to='/member/talktalk'><p>톡톡</p></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;