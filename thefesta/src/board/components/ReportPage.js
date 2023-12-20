import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const ReportPage = () => {
  const [reportContent, setReportContent] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [user, setUser] = useState({
    nickname: "",
    id: ""
  });
  const [reportState, setReportState] = useState({
    bid: queryParams.get('bid'),
    brno: queryParams.get('brno'),
    reported: queryParams.get('id'),
    reporter: user.id,
    reportContent: reportContent,
});

  
  useEffect(() => {
    // 페이지 로딩 시, 사용자 정보를 불러오기
    selMember();
    
    // reportContent가 변경될 때 reportDto 업데이트
    setReportState((prevDto) => ({
      ...prevDto,
      reportContent: reportContent,
    }));
  }, [reportContent]);

  const selMember = async () => {
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
      console.error('Error fetching member data:', error);
    }
  };

  const handleContentChange = (e) => {
    setReportContent(e.target.value);
  };

  const handleReportSubmit = async () => {

    try {
      const reportResponse = await axios.post('http://localhost:9090/admin/boardReport', reportState);
      
      console.log(reportResponse.data);
      // 신고 제출 후 어떤 동작을 할지 추가
    } catch (error) {

      console.error('Error reporting:', error);
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
      </div>
      <div>
        <button onClick={handleReportSubmit}>신고 제출</button>
      </div>
    </div>
  );
};

export default ReportPage;
