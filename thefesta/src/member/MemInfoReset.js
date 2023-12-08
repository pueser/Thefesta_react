import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './MemInfoReset.css';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

function MemInfoReset() {

  const id = Cookies.get('loginInfo').trim();
  const parsedId = id ? JSON.parse(id) : '';

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: parsedId,
    nickname: '',
    originalPassword: '',
    password: '',
    rePassword: ''
  });
  
  const [nicknameError, setNicknameError] = useState('');
  const [nicknameCheckResult, setNicknameCheckResult] = useState('');
  const [passwordError1, setPasswordError1] = useState('');
  const [passwordError2, setPasswordError2] = useState('');
  const [passwordError3, setPasswordError3] = useState('');
  
  const [memInfo, setMemInfo] = useState('');
  
  useEffect(() => {
    axios.post('http://localhost:9090/member/selMember', { id: parsedId })
    .then(response => {
      setMemInfo(response.data);
        setUserData(prevData => ({
          ...prevData,
        }));
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }, [parsedId]);
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserData(prevData => ({
        ...prevData,
        [name]: value,
      }));
      if (name === 'nickname') setNicknameError('');
      else if (name === 'originalPassword') setPasswordError1('');
      else if (name === 'password') setPasswordError2('');
      else if (name === 'rePassword') setPasswordError3('')
    };
    
    const nicknameCheckSubmit = () => {
      
      if (userData.nickname == '') {
        console.log(userData.nickname);
        setNicknameError('*닉네임 입력 후 중복체크를 진행해주세요.')
        return;
      }

      // 최대 글자 유효성 검사
      if (userData.nickname.length > 10) {
        setNicknameError('*닉네임은 최대 10글자까지 입력 가능합니다.');
        return;
      }
      
      // 한글만 입력 가능 유효성 검사
      const koreanRegex = /^[ㄱ-힣]+$/;
      if (userData.nickname != '' && !koreanRegex.test(userData.nickname)) {
        setNicknameError('*한글로 된 닉네임만 사용 가능합니다.');

        console.log(userData.nickname);
        return;
      }
      
      axios.post('http://localhost:9090/member/nicknameCheck', userData)
      .then(response => {
        if (response.data === 'success') {
          setNicknameCheckResult('사용가능한 닉네임입니다.');
          setNicknameError('');
        } else if (response.data === 'fail') {
          setNicknameCheckResult('사용중인 닉네임입니다. 다시 입력해주세요.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };
    
    const handleSubmit = () => {
  // 한글만 입력 가능 유효성 검사
  const koreanRegex = /^[ㄱ-힣]+$/;
  if (userData.nickname != '' && !koreanRegex.test(userData.nickname)) {
    setNicknameError('*한글로 된 닉네임만 사용 가능합니다.');
    return;
  }
  
  console.log(memInfo.nickname + memInfo.password);
  if (userData.nickname == '') {
    userData.nickname = memInfo.nickname;
  }
  
  if (userData.password == '') {
    userData.password = memInfo.password;
  }

  if ((userData.password != '' || userData.rePassword != '') && userData.originalPassword == '') {
    setPasswordError1('*현재 비밀번호를 입력해주세요.')
    return;
  }

  if (userData.originalPassword != '' && userData.originalPassword != memInfo.password) {
    setPasswordError1('*비밀번호가 일치하지 않습니다.')
    return;
  }

  if (userData.password != '' && userData.password.length < 8 || userData.password.length > 16) {
    setPasswordError2('*비밀번호는 최소 8글자, 최대 16글자까지 입력할 수 있습니다.');
    return;
  }
  
  const lowercaseRegex = /[a-z]+/;
  const numberRegex = /[0-9]+/;
  const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+/;
  
  if (userData.password != '' && (!lowercaseRegex.test(userData.password) || !numberRegex.test(userData.password) || !specialCharacterRegex.test(userData.password))) {
    setPasswordError2('*비밀번호에는 소문자, 숫자, 특수문자가 한 자 이상 포함되어야 합니다.');
    return;
  }

  if (userData.rePassword == '') {
    setPasswordError3('*비밀번호를 재입력해주세요.');
    return;
  }

  if (userData.password != userData.rePassword) {
    setPasswordError3('*비밀번호와 일치하지 않습니다.')
    return;
  }
  
  // 최대 글자 유효성 검사
  if (userData.nickname.length > 10) {
    setNicknameError('*닉네임은 최대 10글자까지 입력 가능합니다.');
    return;
  }

  
  axios.post('http://localhost:9090/member/memInfoReset', userData)
    .then(response => {
      console.log(response.data);
        if (response.data === 'success') {
          navigate('/');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
};

    const cencel = () => {
      navigate('/');
    }
  
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
            name="originalPassword"
            value={userData.originalPassword}
            onChange={handleInputChange}
            className='MemInfoReset-input'
          />
        </label><br/>
        <div className="error-message">{passwordError1}</div>
        <label className='MemInfoReset-label'>
          새 비밀번호  
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            className='MemInfoReset-input'
          />
        </label><br/>
        <div className="error-message">{passwordError2}</div>
        <label className='MemInfoReset-label'>
          새 비밀번호 확인  
          <input
            type="password"
            name="rePassword"
            value={userData.rePassword}
            onChange={handleInputChange}
            className='MemInfoReset-input'
          />
        </label>
        <div className="error-message">{passwordError3}</div>
        <br />
        <button type="button" onClick={handleSubmit} className='MemInfoReset-button'>
          저장
        </button>
        <button type="button" onClick={cencel} className='MemInfoReset-button'>
          취소
        </button>
      </form>
    </div>
    );
}

export default MemInfoReset;