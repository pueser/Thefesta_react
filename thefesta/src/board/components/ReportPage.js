import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

// ... (imports는 변경되지 않음)

const ReportPage = () => {
  const [reportcontent, setReportcontent] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nickname: "",
    id: ""
  });
  const bid = queryParams.get('bid');
  const brno = queryParams.get('brno');
  const reported = queryParams.get('id');

  const [reportState, setReportState] = useState({
    rbid: "",
    rbrno: "",
    reported: "",
    reporter: "",
    reportcontent: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []); // 마운트 시에만 사용자 데이터 가져오도록

  const fetchUserData = async () => {
    try {
      const id = Cookies.get('loginInfo');
      const parsedId = id ? JSON.parse(id) : '';

      if (parsedId !== '') {
        const response = await axios.post('http://localhost:9090/member/selMember', {
          id: parsedId
        });

        setUser({
          id: response.data.id,
          nickname: response.data.nickname
        });
      }
    } catch (error) {
      console.error('회원 데이터 가져오기 오류:', error);
    }
  };

  const handleContentChange = (e) => {
    setReportcontent(e.target.value);
  };

  const handleReportSubmit = async () => {
    try {
      setIsLoading(true);
  
      let reportData;
      let endPoint;
  
      if (brno == null) {
        reportData = {
          rbid: bid,
          reported: reported,
          reporter: user.id,
          reportcontent: reportcontent,
        };
      } else if (bid == null) {
        reportData = {
          rbrno: brno,
          reported: reported,
          reporter: user.id,
          reportcontent: reportcontent,
        };
      }

      console.log('reportData:', reportData);

      if (brno == null) {

        endPoint = 'boardReport'

      } else if (bid == null) {

        endPoint = 'boardReplyReport'
      };

      const response = await axios.post(`http://localhost:9090/admin/${endPoint}`, reportData);
      alert(response.data);

      navigate('/board');
    } catch (error) {
      setError(error.message || '오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>신고 작성 페이지</h2>
      <div>
        <label htmlFor="reportContent"></label>
        <textarea
          id="reportContent"
          name="reportContent"
          value={reportcontent}
          onChange={handleContentChange}
          rows={10}
          cols={50}
          maxLength={1000}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div>
        <button onClick={handleReportSubmit} disabled={isLoading}>
          {isLoading ? '제출 중...' : '신고 제출'}
        </button>
      </div>
    </div>
  );
};

export default ReportPage;
