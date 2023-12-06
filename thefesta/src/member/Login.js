import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Join from './Join';

function Login() {

  const [userData, setUserData] = useState({
    id: '',
    password: '',
  });

  console.log(userData);

  const [rememberId, setRememberId] = useState(false);

  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
//
  useEffect(() => {
    const storedId = Cookies.get('rememberedId');
    if (storedId) {
      setUserData((prevData) => ({
        ...prevData,
        id: storedId,
      }));
      setRememberId(true);
    }
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setError('');
    if (name === 'id') {
      setIdError('');
      document.getElementById('idInput').style.borderColor = '';
    } else if (name === 'password') {
      setPasswordError('');
      document.getElementById('passwordInput').style.borderColor = '';
    }
};

const handleRememberIdChange = (e) => {
  setRememberId(e.target.checked);
};

  const handleSubmit = () => {
    // 아이디 유효성 검사
    if (!userData.id.trim()) {
      setIdError('*아이디를 입력해주세요.');
      document.getElementById('idInput').style.borderColor = 'red';
      return;
    }

    // 비밀번호 유효성 검사
    if (!userData.password.trim()) {
      setPasswordError('*비밀번호를 입력해주세요.');
      document.getElementById('passwordInput').style.borderColor = 'red';
      return;
    }

    document.getElementById('idInput').style.borderColor = '';
    document.getElementById('passwordInput').style.borderColor = '';

    axios.post('http://localhost:9090/member/loginPost', userData)
      .then(response => {
        const memInfo = response.data;

        if (memInfo) {
          Cookies.set('loginInfo', JSON.stringify(memInfo));

          if (rememberId) {
            Cookies.set('rememberedId', userData.id);
          } else {
            Cookies.remove('rememberedId');
          }

          const statecode = memInfo.statecode;
          console.log(statecode);

          if (statecode == 0) {
            navigate('/join')
            console.log('0번 도착')
          } else {
            navigate('/');
            console.log('n번 도착')
          } // 후에 수정할 것...
          
        } else {
          setError('*미가입된 아이디입니다. 회원가입 후 로그인해주세요.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

    return (
      <div className="login-container">
      <h1 className='login-h1'>로그인</h1>
      <form className="login-form">
        <label className="login-label">
          <input
            type="text"
            id="idInput"
            name="id"
            value={userData.id}
            onChange={handleInputChange}
            placeholder="아이디"
            className="input-style"
          />
          <div className="error-message">{idError}</div>
        </label>
        <br />
        <label className="login-label">
          <input
            type="password"
            id="passwordInput"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="비밀번호"
            className="input-style"
          />
          <div className="error-message">{passwordError}</div>
        </label>
        <br />
        <button type="button" name="login" onClick={handleSubmit} className="login-button">
          로그인
        </button>
        <div className="error-message">{error}</div>
        <br />
        <label className="label-container">
          <input
            type="checkbox"
            name="saveId"
            checked={rememberId}
            onChange={handleRememberIdChange}
            className="checkbox"
            />
            <span className='login-span'>아이디 저장</span>
        </label>
      <label className='link-label'>
        <Link to="/join" className="link-container">
          회원가입
        </Link>
          {' | '}
        <Link to="/join" className="link-container">
          비밀번호 찾기
        </Link>
      </label>
      </form>

    </div>
    );
}
export default Login;