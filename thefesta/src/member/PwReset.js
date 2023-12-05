import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './PwReset.css';

function PwReset() {

  const [userData, setUserData] = useState({
    id: '',
    resetPassword: ''
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios.post('http://localhost:9090/member/mailSend', userData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const joinSubmit = () => {
    axios.post('http://localhost:9090/member/pwReset', userData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
    return (
      <div className='PwReset-container'>
      <h1>비밀번호 재설정</h1>
      <form className='PwReset-form'>
        <label className='PwReset-label'>
          <input
            type="text"
            name="id"
            value={userData.id}
            onChange={handleInputChange}
            placeholder="이메일"
            className='PwReset-input'
          />
        </label><br/>
        <label className='PwReset-randomCode-label'>
          <input
            type="text"
            name="randomCode"
            placeholder="인증번호"
            className='PwReset-input'
          />
        </label>
        <button type="button" onClick={handleSubmit} className='PwReset-button'>
          인증번호 전송
        </button>
        <button type="button" onClick={handleSubmit} className='PwReset-button'>
          확인
        </button><br/>
        <label>
          <input
            type="text"
            name="resetPassword"
            value={userData.resetPassword}
            onChange={handleInputChange}
            placeholder="새 비밀번호"
            className='PwReset-input'
          />
        </label><br/>
        <label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호 확인"
            className='PwReset-input'
          />
        </label><br/>
        <button type="button" onClick={joinSubmit} className='PwReset-button'>
          확인
        </button>
        <button type="button" className='PwReset-button'>
          취소
        </button>
      </form>
    </div>
    );
}

export default PwReset;