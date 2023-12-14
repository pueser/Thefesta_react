import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './PwReset.css';
import { Link, useNavigate } from 'react-router-dom';

function PwReset() {
  const navigate = useNavigate();

  const [codeCheck, setCodeCheck] = useState(false);
  const [idError, setIdError] = useState('');
  const [idCheckResult, setIdCheckResult] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');
  const [serverVerificationCode, setServerVerificationCode] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');

  const [userData, setUserData] = useState({
    id: '',
    password: '',
    verificationCode: '',
    rePassword: '',
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

    if (name === 'id') setIdError('');
    else if (name === 'verificationCode') setVerificationCodeError('');
    else if (name === 'password') setPasswordError('');
    else if (name === 'rePassword') setRePasswordError('')
  };

  const verificationCodeSubmit = () => {
    setVerificationCodeError('');
    if (!userData.id.trim()) {
      setIdError('*아이디를 입력해주세요.');
      return;
    }

    axios.post('http://localhost:9090/member/selMember', userData)
    .then(response => {
      const memInfo = response.data;
      const statecode = memInfo.statecode;

      if (String(statecode) == 2 || String(statecode) == 3) {
        window.alert("탈퇴한 계정입니다.");
        setIdCheckResult('false')
        return;
        
      } else if (String(statecode) == 4) {
        window.alert("이용이 제한된 아이디입니다.");
        setIdCheckResult('false')
        return;

      } else if (String(statecode) == null) {
        window.alert("미가입 된 아이디입니다.");
        setIdCheckResult('false')
        return;

      } else if (String(statecode) == 1) {
        setIdCheckResult('success')
      }
    })

    if (idCheckResult == 'success') { 
      axios.post('http://localhost:9090/member/mailSend', userData)
        .then(response => {
          console.log(response.data);
          setServerVerificationCode(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
  };

  const codeCheckSubmit = () => {

    console.log(userData.verificationCode + " 비교 " + serverVerificationCode);
    if (parseInt(userData.verificationCode) === serverVerificationCode) {
      setVerificationCodeError('인증이 완료되었습니다.');
      setCodeCheck(true);
      setVerificationCodeError('');
    } else if (serverVerificationCode == '') {
      setVerificationCodeError('*인증번호를 발급받아주세요.');
    } else {
      setVerificationCodeError('*인증번호가 일치하지 않습니다. 다시 입력해주세요.');
    }
  };

  const pwResetSubmit = () => {

    if (!userData.id.trim()) {
      setIdError('*아이디를 입력해주세요.');
      return;
    }

    axios.post('http://localhost:9090/member/selMember', userData)
    .then(response => {
      const memInfo = response.data;
      const statecode = memInfo.statecode;

      if (String(statecode) == 2 || String(statecode) == 3) {
        window.alert("탈퇴한 계정입니다.");
        setIdCheckResult('false')
        return;
        
      } else if (String(statecode) == 4) {
        window.alert("이용이 제한된 아이디입니다.");
        setIdCheckResult('false')
        return;

      } else if (String(statecode) == null) {
        window.alert("미가입 된 아이디입니다.");
        setIdCheckResult('false')
        return;

      } else if (String(statecode) == 1) {
        setIdCheckResult('success')
      }
    })

    if (idCheckResult == 'succcess') {
      if (!userData.verificationCode.trim()) {
        setVerificationCodeError('*인증번호를 입력해주세요.');
        return;
      }

      if (!serverVerificationCode.toString().trim()) {
        setVerificationCodeError('*인증번호를 발급받아주세요.');
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
        setPasswordError('*비밀번호에는 소문자, 숫자, 특수문자가 한 자 이상 포함되어야 합니다.');
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
      
      if (!codeCheck) {
        setVerificationCodeError('*인증번호 확인을 진행해주세요.');
        return;
      }
    } else {
      return;
    }

    axios.post('http://localhost:9090/member/pwReset', userData)
      .then(response => {
        console.log(response.data);
        navigate('/')
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const cencel = () => {
    navigate('/')
  }
  
    return (
      <div className='PwReset-container'>
      <h1 className='PwReset-title'>비밀번호 재설정</h1>
      <form className='PwReset-form'>
        <label className='PwReset-label'>
          <input
            type="text"
            name="id"
            value={userData.id}
            onChange={handleInputChange}
            placeholder="이메일"
            className='PwReset-id'
          />
        </label><br/>
        <div className="PwReset-errorMsg">{idError}</div>
        <label className='PwReset-randomCode-label'>
          <input
            type="text"
            name="verificationCode"
            value={userData.verificationCode}
            onChange={handleInputChange}
            placeholder="인증번호"
            className='PwReset-verificationCode'
          />
        </label>
        <button type="button" onClick={verificationCodeSubmit} className='PwReset-verificationCode-button'>
          인증번호 전송
        </button>
        <button type="button" onClick={codeCheckSubmit} className='PwReset-code-check-button'>
          확인
        </button>
        <div className="PwReset-errorMsg">{verificationCodeError}</div>
        <label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="새 비밀번호"
            className='PwReset-password'
          />
        </label><br/>
        <div className="PwReset-errorMsg">{passwordError}</div>
        <label>
          <input
            type="password"
            name="rePassword"
            value={userData.rePassword}
            onChange={handleInputChange}
            placeholder="비밀번호 확인"
            className='PwReset-rePassword'
          />
        </label><br/>
        <div className="PwReset-errorMsg">{rePasswordError}</div>
        <button type="button" onClick={pwResetSubmit} className='PwReset-check-button'>
          확인
        </button>
        <button type="button" onClick={cencel} className='PwReset-cencel-button'>
          취소
        </button>
      </form>
    </div>
    );
}

export default PwReset;