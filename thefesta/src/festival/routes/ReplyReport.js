import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReplyReport.css';

function ReplyReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  const handleContent = async (e) => {
    setContent(e.target.value);
  };

  const onClickReplyReportCancel = (e) => {
    e.preventDefault();

    alert('취소되었습니다.');
    navigate(-1);
  };

  const onClickReplyReport = (e) => {
    e.preventDefault();

    if (content.length === 0) {
      alert('내용을 입력해 주세요.');
    } else {
      const isConfirmed = window.confirm('정말 신고하시겠습니까?');

      if (isConfirmed) {
        const data = {
          reportcontent: content,
          reporter: location.state.id,
          reported: location.state.reported,
          rfrno: location.state.frno,
        };
        axios
          .post('/admin/festaReplyReport', data)
          .then((res) => console.log('res : ', res))
          .catch((error) => console.log(error));
      } else {
        alert('취소되었습니다.');
        navigate(-1);
      }
    }
  };

  return (
    <div className='replyReport'>
      <h1>댓글 신고</h1>
      <p></p>
      <form method='post' action='/admin/festaReplyReport'>
        <textarea
          name='reportcontent'
          placeholder='신고 내용을 입력하세요.'
          onChange={handleContent}
          maxLength={1000}
        ></textarea>
        <div className='replyReportBtn'>
          <button type='submit' onClick={onClickReplyReport}>
            신고
          </button>
          <button type='submit' onClick={onClickReplyReportCancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReplyReport;
