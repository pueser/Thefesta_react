import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Join.css';
import { Link, useNavigate } from 'react-router-dom';

function Join() {
  const [userData, setUserData] = useState({
    nickname: '',
    id: '',
    password: '',
    verificationCode: '',
    rePassword: '',
    statecode: ''
  });

  const [codeCheck, setCodeCheck] = useState(false);
  const navigate = useNavigate();

  // 에러 메시지 상태 추가
  const [nicknameError, setNicknameError] = useState('');
  const [idError, setIdError] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');
  const [serverVerificationCode, setServerVerificationCode] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');
  const [nicknameCheckResult, setNicknameCheckResult] = useState('');

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

  
  const idCheckSubmit = () => {
    setIdError('');
    setNicknameError('');

    // 공백 유효성 검사
    if (!userData.id.trim()) {
      setIdError('*사용할 아이디를 입력해주세요.');
      return;
    }

    // 최대 글자 유효성 검사
    if (userData.id.length > 50) {
      setIdError('*아이디는 최대 50자까지 입력할 수 있습니다.');
      return;
    }

    // 이메일 형식 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.id)) {
      setIdError('*올바른 형식이 아닙니다. 다시 입력해주세요.');
      return;
    }

    axios.post('http://localhost:9090/member/selMember', userData)
    .then(response => {
      const memInfo = response.data;
      const statecode = memInfo.statecode;
      console.log("테스트 테스트 " + response.data);
      console.log("response" , response.data);

      if (response.data == "") {
        setIdError('사용 가능한 아이디입니다.');
      }

      if (String(statecode) == 0) {
        setIdError("유효한 아이디가 이닙니다.");
        return;
        
      } else if (String(statecode) == 1) {
        setIdError('사용중인 아이디입니다. 다시 입력해주세요.');
        return;
        
      } else if (String(statecode) == 2) {
        const updatedate = memInfo.updatedate;
        const originalDate = new Date(updatedate);
        const sevenDaysLater = new Date(originalDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        const currentDate = new Date();
        const date = sevenDaysLater.toLocaleString();
        
        if (currentDate < sevenDaysLater) {
          window.alert("탈퇴한 계정입니다. " + date + "초 이후에 재가입 가능합니다.");
          return;
        } else {
          userData.statecode = 3;
          console.log("user data : " + userData.statecode);

          setNicknameError('');
          axios.post('http://localhost:9090/member/updateState', userData)
          setIdError('사용 가능한 아이디입니다.');
        }
        
      } else if (String(statecode) == 3) {
        setIdError('사용 가능한 아이디입니다.');
        
      } else if (String(statecode) == 4) {
        window.alert("이용이 제한된 아이디입니다. 관리자에게 문의해주세요.");
        
      } else if (String(statecode) == null) {
        axios.post('http://localhost:9090/member/idCheck', userData)
        .then(response => {
          console.log(response.data);
          if (response.data === 'success') {
            setIdError('사용 가능한 아이디입니다.');
          } else if (response.data === 'fail') {
            setIdError('사용중인 아이디입니다. 다시 입력해주세요.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    })
  };
  
  const nicknameCheckSubmit = () => {
    setNicknameError('');

    if (idError != '사용 가능한 아이디입니다.') {
      setIdError('*중복체크를 진행해주세요.');
      return;
    }

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
      setNicknameError('*한글로 된 닉네임만 사용 가능합니다.');
      return;
    }

    axios.post('http://localhost:9090/member/selMember', userData)
    .then(response => {
      const memInfo = response.data;
      const statecode = memInfo.statecode;

      if (String(statecode) == 3) {
        if (userData.nickname == memInfo.nickname) {
          setNicknameError('사용 가능한 닉네임입니다.');
        } else {
          axios.post('http://localhost:9090/member/nicknameCheck', userData)
          .then(response => {
          if (response.data === 'success') {
            setNicknameError('사용가능한 닉네임입니다.');
        } else if (response.data === 'fail') {
          setNicknameError('사용중인 닉네임입니다. 다시 입력해주세요.');
        }
        })
        .catch(error => {
        console.error('Error:', error);
        });
        }

      } else {
        axios.post('http://localhost:9090/member/nicknameCheck', userData)
        .then(response => {
        if (response.data === 'success') {
          setNicknameError('사용가능한 닉네임입니다.');
        } else if (response.data === 'fail') {
          setNicknameError('사용중인 닉네임입니다. 다시 입력해주세요.');
        }
        })
        .catch(error => {
        console.error('Error:', error);
        });
      }
    })
};

const verificationCodeSubmit = () => {
  setVerificationCodeError('');

  if (idError != '사용 가능한 아이디입니다.') {
    setIdError('*중복체크를 진행해주세요.');
    return;
  }

  if (!userData.id.trim()) {
    setIdError('*아이디를 입력해주세요.');
    return;
  }

  axios.post('http://localhost:9090/member/mailSend', userData)
    .then(response => {
      console.log(response.data);
      setServerVerificationCode(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const codeCheckSubmit = () => {
  console.log(userData.verificationCode + " 비교 " + serverVerificationCode);
  if (parseInt(userData.verificationCode) === serverVerificationCode) {
    setVerificationCodeError('인증이 완료되었습니다.');
    setCodeCheck(true);
  } else if (serverVerificationCode == '') {
    setVerificationCodeError('*인증번호를 발급받아주세요.');
  } else {
    setVerificationCodeError('*인증번호가 일치하지 않습니다. 다시 입력해주세요.');
  }
}

  const handleSignUp = () => {
    
    
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
      setIdError('*올바른 형식이 아닙니다. 다시 입력해주세요.');
      return;
    }
    
    if (idError != '사용 가능한 아이디입니다.') {
      setIdError('*중복체크를 진행해주세요.');
      return;
    }
    
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
    
    if (!nicknameError) {
      setNicknameError('*중복체크를 진행해주세요.');
      return;
    }
    
    if (!userData.verificationCode.trim()) {
      setVerificationCodeError('*인증번호를 입력해주세요.');
      return;
    }
    
    if (!serverVerificationCode.toString().trim()) {
      setVerificationCodeError('*인증번호를 발급받아주세요.');
      return;
    }

    if (!codeCheck) {
      setVerificationCodeError('*인증번호 확인을 진행해주세요.');
      return;
    }

    if (verificationCodeError != "인증이 완료되었습니다.") {
      setVerificationCodeError('*인증번호 확인을 진행해주세요.');
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
    
    axios.post('http://localhost:9090/member/selMember', userData)
    .then(response => {
      const memInfo = response.data;
      const statecode = memInfo.statecode;

      console.log("state", String(statecode));
      
      if (String(statecode) == 3) {
        userData.statecode = "1";
        console.log(userData);
        axios.post('http://localhost:9090/member/memInfoReset', userData)
        .then(response => {
          console.log(response.data);
          if (response.data === 'success') {
            navigate('/');
            window.alert("회원가입에 성공하셨습니다.")
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
        
    } else if (String(statecode) == "undefined") {
        axios.post('http://localhost:9090/member/joinPost', userData)
        .then(response => {
          if (response.data != null) {
            navigate('/')
            console.log("회원가입 성공");
            window.alert("회원가입에 성공하셨습니다.")
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    });
  };

  const cencel = () => {
    navigate('/')
  }

    return (
      <div className='join-container'>
      <h1 className='join-title'>회원가입</h1>
      <form className='join-form'>
        <br />
          <input
            type="text"
            name="id"
            value={userData.id}
            onChange={handleInputChange}
            placeholder='아이디'
            className='join-id'
          />
        <button type="button" onClick={idCheckSubmit} className='join-button'>
          중복체크
        </button>
        <div className="join-errorMsg">{idError}</div>
          <input
            type="text"
            name="nickname"
            value={userData.nickname}
            onChange={handleInputChange}
            placeholder='닉네임'
            className='join-nickname'
          />
        <button type="button" onClick={nicknameCheckSubmit} className='join-button'>
          중복체크
        </button>
        <div className="join-errorMsg">{nicknameError}</div>
          <input
            type="text"
            name="verificationCode"
            value={userData.verificationCode}
            onChange={handleInputChange}
            placeholder='인증번호'
            className='join-verificationCode'
          />
        <button type="button" onClick={verificationCodeSubmit} className='join-verificationCode-button'>
          인증번호 전송
        </button>
        <button type="button" onClick={codeCheckSubmit} className='join-check-button'>
          확인
        </button>
        <div className="join-errorMsg">{verificationCodeError}</div>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder='비밀번호'
            className='join-password'
          />
        <div className="join-errorMsg">{passwordError}</div>
          <input
            type="password"
            name="rePassword"
            onChange={handleInputChange}
            placeholder='비밀번호 재입력'
            className='join-rePassword'
          />
        <div className="join-errorMsg">{rePasswordError}</div>
        <button type="button" className='join-button' onClick={handleSignUp}>
          가입
        </button>
        <button type="button" onClick={cencel} className='join-cencel-button'>
          취소
        </button>
      </form>
    </div>
    );
}

export default Join;