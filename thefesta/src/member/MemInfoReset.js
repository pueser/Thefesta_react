import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './MemInfoReset.css';

function MemInfoReset() {

  const [userData, setUserData] = useState({
    id: 'user1@naver.com',
    nickname: '',
    password: '',
    resetPassword: '',
    resetPasswordRe: ''
  });

  const [nicknameError, setNicknameError] = useState('');
  const [nicknameCheckResult, setNicknameCheckResult] = useState('');

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

  const nicknameCheckSubmit = () => {

    // 최대 글자 유효성 검사
    if (userData.nickname.length > 10) {
      setNicknameError('*닉네임은 최대 10글자까지 입력 가능합니다.');
      return;
    }

    // 한글만 입력 가능 유효성 검사
    const koreanRegex = /^[ㄱ-힣]+$/;
    if (!koreanRegex.test(userData.nickname)) {
      setNicknameError('*한글로 된 닉네임만 사용 가능합니다.');
      return;
    }

    axios.post('http://localhost:9090/member/nicknameCheck', userData)
      .then(response => {
        if (response.data === 'success') {
          setNicknameCheckResult('사용가능한 닉네임입니다.');
        } else if (response.data === 'fail') {
          setNicknameCheckResult('사용중인 닉네임입니다. 다시 입력해주세요.');
        }
      })
    .catch(error => {
      console.error('Error:', error);
    });
};

  const handleSubmit = () => {
    axios.post('http://localhost:9090/member/memInfoReset', userData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
    return (
      <div>
      <h1>회원 정보 수정</h1>
      <form className='MemInfoReset-form'>
        <label className='MemInfoReset-label'>
          아이디  
          <input
            type="text"
            name="id"
            value={userData.id}
            onChange={handleInputChange}
            style={{ border: 'none', outline: 'none', background: 'transparent' }}
            className='MemInfoReset-input'
          />
        </label><br/>
        <label className='MemInfoReset-label'>
          닉네임  
          <input
            type="text"
            name="nickname"
            value={userData.nickname}
            onChange={handleInputChange}
            className='MemInfoReset-input'
          />
        </label>
        <button type="button" onClick={nicknameCheckSubmit} className='MemInfoReset-button'>
          중복체크
        </button><br/>
        <div className="error-message">{nicknameError}</div>
        <div className="error-message">{nicknameCheckResult}</div>
        <label className='MemInfoReset-label'>
          현재 비밀번호  
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            className='MemInfoReset-input'
          />
        </label><br/>
        <label className='MemInfoReset-label'>
          새 비밀번호  
          <input
            type="password"
            name="resetPassword"
            value={userData.resetPassword}
            onChange={handleInputChange}
            className='MemInfoReset-input'
          />
        </label><br/>
        <label className='MemInfoReset-label'>
          새 비밀번호 확인  
          <input
            type="password"
            name="resetPasswordRe"
            value={userData.resetPasswordRe}
            onChange={handleInputChange}
            className='MemInfoReset-input'
          />
        </label>
        <br />
        <button type="button" onClick={handleSubmit} className='MemInfoReset-button'>
          저장
        </button>
        <button type="button" onClick={handleSubmit} className='MemInfoReset-button'>
          취소
        </button>
      </form>
    </div>
    );
}

export default MemInfoReset;