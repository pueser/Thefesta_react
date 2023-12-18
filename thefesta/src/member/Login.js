import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const [userData, setUserData] = useState({
    id: '',
    password: '',
  });

  const [rememberId, setRememberId] = useState(false);

  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

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
    
    axios.post('http://localhost:9090/member/selMember', userData)
    .then(response => {
      const idCheck = response.data
      
      console.log(idCheck)
      
      // 아이디 유효성 검사
      if (!userData.id.trim()) {
        setIdError('*아이디를 입력해주세요.');
        document.getElementById('idInput').style.borderColor = 'red';
        return;
      }

      if (idCheck == '') {
        setIdError('*미가입 된 아이디입니다. 회원가입 후 로그인해주세요.')
        setPasswordError('')
        document.getElementById('passwordInput').style.borderColor = '';
        document.getElementById('idInput').style.borderColor = 'red';
      } else if (idCheck != '') {
        
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
          console.log("memInfo : " + memInfo);
          if (memInfo) {
            if (rememberId) {
              Cookies.set('rememberedId', userData.id);
            } else {
              Cookies.remove('rememberedId');
            }
            
            const statecode = memInfo.statecode;
            console.log(statecode);
            
            if (String(statecode) == 0) {
              navigate('/admin/member')
              Cookies.set('loginInfo', JSON.stringify(memInfo.id));

            } else if (String(statecode) == 1) {
              navigate('/')
              Cookies.set('loginInfo', JSON.stringify(memInfo.id));

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

                axios.post('http://localhost:9090/member/updateState', userData)
                return;
              }

            } else if (String(statecode) == 3) {
              setIdError('*미가입 된 아이디입니다. 회원가입 후 로그인해주세요.')
              setPasswordError('')
              document.getElementById('passwordInput').style.borderColor = '';
              document.getElementById('idInput').style.borderColor = 'red';

            } else if (String(statecode) == 4) {
              window.alert("영구 차단된 계정입니다. 관리자에게 연락해주세요.")
            }
              
            
          } else if (memInfo == '') {
            setError('*아이디 또는 비밀번호가 일치하지 않습니다.');
            document.getElementById('idInput').style.borderColor = '';
            document.getElementById('passwordInput').style.borderColor = '';
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    })
    };
    
    return (
      <div className="login-container">
      <h1 className='login-title'>로그인</h1>
      <form className="login-form">
        <label className="login-label">
          <input
            type="text"
            id="idInput"
            name="id"
            value={userData.id}
            onChange={handleInputChange}
            placeholder="아이디"
            className="login-id"
            />
          <div className="login-errorMsg">{idError}</div>
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
            className="login-password"
            />
          <div className="login-errorMsg">{passwordError}</div>
        </label>
        <br />
        <button type="button" name="login" onClick={handleSubmit} className="login-button">
          로그인
        </button>
        <div className="login-errorMsg">{error}</div>
        <br />
        <label className="login-label2">
          <input
            type="checkbox"
            name="saveId"
            checked={rememberId}
            onChange={handleRememberIdChange}
            className="login-checkbox"
            />
            <span className='login-span'>아이디 저장</span>
        </label>
      <label className='login-label3'><br/>
        <Link to="/AgreementPage" className="login-link-container">
          회원가입
        </Link>
          {' | '}
        <Link to="/pwreset" className="login-link-container">
          비밀번호 찾기
        </Link>
      </label>
      </form>

    </div>
    );
}
export default Login;