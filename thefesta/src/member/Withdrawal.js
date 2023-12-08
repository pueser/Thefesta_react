import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Withdrawal.css';
import { useNavigate } from 'react-router-dom';

function Withdrawal() {
  const [userData, setUserData] = useState({
    id: '',
    statecode: '2',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

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
    else if (name === 'password') setPasswordError('');
  };

  const handleSubmit = () => {
    if (!userData.id.trim()) {
      setIdError('아이디를 입력해주세요.');
      return;
    }

    if (!userData.password.trim()) {
      setPasswordError('비밀번호를 입력해주세요.');
      return;
    }

    axios.post('http://localhost:9090/member/loginPost', userData)
      .then(response => {
        const memInfo = response.data;

        if (memInfo && memInfo.id === userData.id && memInfo.password === userData.password) {
          axios.post('http://localhost:9090/member/updateState', userData)
            .then(response => {
              console.log(response.data);
              navigate('/')
              window.alert("탈퇴 처리 되었습니다.")
            })
            .catch(error => {
              console.error('Error:', error);
            });
        } else {
          setErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>회원탈퇴</h1>
      <form>
        <label>
          <input
            type="text"
            name="id"
            value={userData.id}
            onChange={handleInputChange}
            placeholder="아이디"
          />
        </label><br />
        {idError && <div className="error-message">{idError}</div>}
        <label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="비밀번호"
          />
        </label>
        <br />
        {passwordError && <div className="error-message">{passwordError}</div>}
        <button type="button" onClick={handleSubmit}>
          확인
        </button>
        <button type="button" onClick={() => window.location.href = '/'}>
          취소
        </button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default Withdrawal;
