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
    <div className='Withdrawal-container'>
      <h1 className='Withdrawal-title'>회원 탈퇴</h1>
      <form className='Withdrawal-form'>
        <label className='Withdrawal-label'>
          <input
            className='Withdrawal-id'
            type="text"
            name="id"
            value={userData.id}
            onChange={handleInputChange}
            placeholder="아이디" />
          <div className="Withdrawal-errorMsg">{idError}</div>
        </label>
        <label className='Withdrawal-label'>
          <input
            className='Withdrawal-pw'
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="비밀번호" />
          <div className="Withdrawal-errorMsg">{passwordError}{errorMessage}</div>
          {/* <div className="Withdrawal-errorMsg">{errorMessage}</div> */}
        </label>
        <div className='Withdrawal-button'>
          <button type="button" className='Withdrawal-confirmBtn' onClick={handleSubmit}>확인</button>
          <button type="button" className='Withdrawal-cancelBtn' onClick={() => window.location.href = '/'}>취소</button>
        </div>
      </form>
      <div className='Withdrawal-info'>
        <p>*개인정보는 6개월간 보관됩니다.</p>
        <p>*본인이 작성한 게시물, 댓글은 삭제되지 않습니다.</p>
        <p>*동일한 아이디로 재가입은 일주일 후에 가능합니다. .</p>
      </div>
    </div>
  );
}

export default Withdrawal;