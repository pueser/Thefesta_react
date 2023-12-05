import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Join.css';

function Join() {
  const [userData, setUserData] = useState({
    nickname: '',
    id: '',
    password: '',
    verificationCode: '',
    rePassword: '',
  });

  // 에러 메시지 상태 추가
  const [nicknameError, setNicknameError] = useState('');
  const [idError, setIdError] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');
  const [nicknameCheckResult, setNicknameCheckResult] = useState('');
  const [idCheckResult, setIdCheckResult] = useState('');

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // 에러 메시지 초기화
    if (name === 'nickname') setNicknameError('');
    else if (name === 'id') setIdError('');
    else if (name === 'verificationCode') setVerificationCodeError('');
    else if (name === 'password') setPasswordError('');
    else if (name === 'rePassword') setRePasswordError('');
  };

  const nicknameCheckSubmit = () => {
    // 공백 유효성 검사
    if (!userData.nickname.trim()) {
      setNicknameError('*사용할 닉네임을 입력해주세요.');
      return;
    }

    // 최대 글자 유효성 검사
    if (userData.nickname.length > 10) {
      setNicknameError('*닉네임은 최대 10글자까지 입력 가능합니다.');
      return;
    }

    // 한글만 입력 가능 유효성 검사
    const koreanRegex = /^[ㄱ-힣]+$/;
    if (!koreanRegex.test(userData.nickname)) {
      setNicknameError('한글로 된 닉네임만 사용 가능합니다.');
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

  const idCheckSubmit = () => {
    // 공백 유효성 검사
    if (!userData.id.trim()) {
      setIdError('*사용할 아이디를 입력해주세요.');
      return;
    }

    // 최대 글자 유효성 검사
    if (userData.id.length > 50) {
      setIdError('아이디는 최대 50자까지 입력할 수 있습니다.');
      return;
    }

    // 이메일 형식 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.id)) {
      setIdError('올바른 형식이 아닙니다. 다시 입력해주세요.');
      return;
    }

    axios.post('http://localhost:9090/member/selMember', userData)
    .then(response => {
      if (response.data === 'success') {
        setIdCheckResult('사용가능한 아이디입니다.');
      } else if (response.data === 'fail') {
        setIdCheckResult('사용중인 아이디입니다. 다시 입력해주세요.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

  const verificationCodeSubmit = () => {
    axios.post('http://localhost:9090/member/mailSend', userData) // 수정
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSignUp = () => {
    if (!userData.nickname.trim()) {
      setNicknameError('*사용할 닉네임을 입력해주세요.');
      return;
    }

    if (userData.nickname.length > 10) {
      setNicknameError('*닉네임은 최대 10글자까지 입력 가능합니다.');
      return;
    }

    const koreanRegex = /^[ㄱ-힣]+$/;
    if (!koreanRegex.test(userData.nickname)) {
      setNicknameError('*한글로 된 닉네임만 사용 가능합니다.');
      return;
    }

    if (!userData.id.trim()) {
      setIdError('*사용할 아이디를 입력해주세요.');
      return;
    }

    if (userData.id.length > 50) {
      setIdError('*아이디는 최대 50자까지 입력할 수 있습니다.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.id)) {
      setIdError('올바른 형식이 아닙니다. 다시 입력해주세요.');
      return;
    }

    if (!userData.verificationCode.trim()) {
      setVerificationCodeError('*인증번호를 입력해주세요.');
      return;
    }

    if (!userData.password.trim()) {
      setPasswordError('*사용할 비밀번호를 입력해주세요.');
      return;
    }

    if (userData.password.length < 8 || userData.password.length > 16) {
      setPasswordError('*비밀번호는 최소 8글자, 최대 16글자까지 입력할 수 있습니다.');
      return;
    }

    const lowercaseRegex = /[a-z]+/;
    const numberRegex = /[0-9]+/;
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+/;

    if (!lowercaseRegex.test(userData.password) || !numberRegex.test(userData.password) || !specialCharacterRegex.test(userData.password)) {
      setPasswordError('비밀번호에는 소문자, 숫자, 특수문자가 한 자 이상 포함되어야 합니다.');
      return;
    }
  
    if (!userData.rePassword.trim()) {
      setRePasswordError('*비밀번호를 재입력해주세요.');
      return;
    }
  
    if (userData.password !== userData.rePassword) {
      setRePasswordError('*비밀번호와 일치하지 않습니다.');
      return;
    }

    axios.post('http://localhost:9090/member/joinPost', userData)
    .then(response => {
      if (response.data != null) {
        console.log("회원가입 성공");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

    return (
      <div>
      <h1>회원가입</h1>
      <form className='join-form'>
          <input
            type="text"
            name="nickname"
            value={userData.nickname}
            onChange={handleInputChange}
            placeholder='닉네임'
            className='join-input'
          />
        <button type="button" onClick={nicknameCheckSubmit} className='join-button'>
          중복체크
        </button>
        <div className="error-message">{nicknameError}</div>
        <div className="error-message">{nicknameCheckResult}</div>
        <br />
          <input
            type="text"
            name="id"
            value={userData.id}
            onChange={handleInputChange}
            placeholder='아이디'
            className='join-input'
          />
        <button type="button" onClick={idCheckSubmit} className='join-button'>
          중복체크
        </button>
        <div className="error-message">{idError}</div>
        <div className="error-message">{idCheckResult}</div>
        <br />
          <input
            type="text"
            name="verificationCode"
            value={userData.verificationCode}
            onChange={handleInputChange}
            placeholder='인증번호'
            className='join-input'
          />
        <button type="button" onClick={verificationCodeSubmit} className='join-button'>
          인증번호 전송
        </button>
        <button type="button" className='join-button'>
          확인
        </button>
        <div className="error-message">{verificationCodeError}</div>
        <br />
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder='비밀번호'
            className='join-input'
          />
        <div className="error-message">{passwordError}</div>
          <input
            type="password"
            name="rePassword"
            onChange={handleInputChange}
            placeholder='비밀번호 재입력'
            className='join-input'
          />
        <div className="error-message">{rePasswordError}</div>
        <button type="button" className='join-button' onClick={handleSignUp}>
          가입
        </button>
        <button type="button" Link to="/" className='join-button'>
          취소
        </button>
      </form>
    </div>
    );
}

export default Join;