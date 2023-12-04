import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function Login() {
  const [userData, setUserData] = useState({
    id: '',
    password: '',
  });

  const [rememberId, setRememberId] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRememberIdChange = (e) => {
    setRememberId(e.target.checked);
  };

  const handleSubmit = () => {
    axios
      .post('/member/loginPost', userData)
      .then((response) => {
        const memInfo = response.data;

        if (memInfo) {
          Cookies.set('loginInfo', JSON.stringify(memInfo));

          if (rememberId) {
            Cookies.set('rememberedId', userData.id);
          } else {
            Cookies.remove('rememberedId');
          }
        }

        console.log(memInfo);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSubmit2 = () => {
    Cookies.remove('loginInfo');
  };

  return (
    <div>
      <h1>로그인</h1>
      <form>
        <label>
          <input
            type='text'
            name='id'
            value={userData.id}
            onChange={handleInputChange}
            placeholder='아이디'
          />
        </label>
        <br />
        <label>
          <input
            type='password'
            name='password'
            value={userData.password}
            onChange={handleInputChange}
            placeholder='비밀번호'
          />
        </label>
        <br />
        <button type='button' onClick={handleSubmit}>
          로그인
        </button>
        <button type='button' onClick={handleSubmit2}>
          로그아웃
        </button>
        <br />
        <label>
          <input
            type='checkbox'
            checked={rememberId}
            onChange={handleRememberIdChange}
          />
          아이디 저장
        </label>
      </form>
    </div>
  );
}

/* 로그아웃 버튼은 임시. 쿠키 삭제할 때 사용. */
export default Login;
