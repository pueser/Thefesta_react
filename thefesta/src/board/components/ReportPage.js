import React, { useState } from 'react';
import axios from 'axios';

const ReportPage = ({ location }) => {
  const [reportContent, setReportContent] = useState('');
  const [reportedId, setReportedId] = useState(''); // reportedId를 추가
  const [user, setUser] = useState({
    nickname: "user1",  // 사용자의 닉네임 또는 로그인 정보를 가져와서 설정
    id: "user1@naver.com"
  });

  // location.state에서 신고할 대상 정보를 받아옴
  const { targetId, targetType } = location.state;

  const handleContentChange = (e) => {
    setReportContent(e.target.value);
  };

  const handleReportSubmit = () => {
    const reporter = user.id;
    // TODO: 신고 대상에 대한 정보를 서버에서 가져오도록 수정
    const reported = '신고대상아이디';

    const reportDto = {
      reportContent,
      reporter,
      reported,
      // 댓글인 경우 rbrno, 게시글인 경우 rbid로 지정
      ...(targetType === 'comment' ? { rbrno: targetId } : { rbid: targetId }),
    };

    // 서버로 Axios를 사용하여 POST 요청을 보냄
    axios.post('/admin/boardReport', reportDto)
      .then(response => {
        console.log(response.data);
        // TODO: 서버 응답에 대한 후속 처리를 추가
      })
      .catch(error => {
        console.error('Error reporting:', error);
        // TODO: 에러 처리를 추가
      });
  };

  return (
    <div>
      <h2>신고 작성 페이지</h2>
      <div>
        <label htmlFor="reportContent">신고 내용:</label>
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