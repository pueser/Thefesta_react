import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Withdrawal.css';

function Withdrawal() {

  const [userData, setUserData] = useState({
    id: '',
    statecode: '3'
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
    axios.post('http://localhost:9090/member/updateState', userData)
      .then(response => {
        console.log(response.data);
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
        </label><br/>
        <label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
          />
        </label>
        <br />
        <button type="button" onClick={handleSubmit}>
          확인
        </button>
        <button type="button" onClick={handleSubmit}>
          취소
        </button>
      </form>
    </div>
    );
}

export default Withdrawal;