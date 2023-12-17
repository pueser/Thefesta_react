import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ReportPage = ({ location }) => {
  const [reportContent, setReportContent] = useState('');
  const [user, setUser] = useState({
    nickname: "",
    id: ""
  });

  useEffect(() => {
    // 페이지 로딩 시, 사용자 정보를 불러오기
    selMember();
  }, []);

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
    const reporter = user.id;

    // location.state에서 신고할 대상 정보를 받아옴
    const { targetId, targetType } = location.state;

    try {
      // 대상의 회원 정보를 불러오기
      const response = await axios.post('http://localhost:9090/member/selMember', {
        id: targetId
      });

      const reported = response.data.id;

      const reportDto = {
        reportContent,
        reporter,
        reported,
        // 댓글인 경우 rbrno, 게시글인 경우 rbid로 지정
        ...(targetType === 'comment' ? { rbrno: targetId } : { rbid: targetId }),
      };

      // 서버로 Axios를 사용하여 POST 요청을 보냄
      const reportResponse = await axios.post('http://localhost:9090/admin/boardReport', reportDto);
      
      console.log(reportResponse.data);
      // TODO: 서버 응답에 대한 후속 처리를 추가
    } catch (error) {
      console.error('Error reporting:', error);
      // TODO: 에러 처리를 추가
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
