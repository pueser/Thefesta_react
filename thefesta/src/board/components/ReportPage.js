import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

// ... (imports는 변경되지 않음)

const ReportPage = () => {
  const [reportContent, setReportContent] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
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
    reportContent: "",
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
    setReportContent(e.target.value);
  };

  const handleReportSubmit = async () => {
    try {
      setIsLoading(true);
      
      
      if(brno == null){

        setReportState ({
          rbid: bid,
          reported: reported,
          reporter: user.id,
          reportContent: reportContent,
        })

        const reportBoard = await axios.post('http://localhost:9090/admin/boardReport', reportState, {
        
        });
  
        console.log(reportBoard.data);
        // 성공적인 제출 이후 사용자를 다른 페이지로 리다이렉트하거나 알림을 표시할 수 있습니다.
      } else if(bid == null) {
        
        const reportReply = await axios.post('http://localhost:9090/admin/boardReplyReport', reportState, {
      });
  
        console.log(reportReply.data);

      }

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
          value={reportContent}
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
