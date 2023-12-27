import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/boardReply.css';

const BoardReply = ({ reply, user, handleCommentModify, handleCommentDelete, handleCommentSubmit, handleInputChange }) => {
  const [brno, setBrno] = useState(-1);
  const [brcontent, setBrcontent] = useState('');
  const navigate = useNavigate();

  
  const handleEditClick = () => {
    setBrcontent(reply.brcontent)
    setBrno(reply.brno);
  };

  const handleCancelClick = () => {
    setBrno(-1);
    setBrcontent(reply.brcontent);
  };

  const handleModifySubmit = () => {
    handleCommentModify(reply.brno, brcontent);
    setBrno(-1);
  };
  
  const handleReplyReport = () => {
      if (user.id != "") {
        navigate(`/reportpage?brno=${reply.brno}&id=${reply.id}`);
    } else {
        alert("로그인이 필요한 기능입니다.")
        navigate('/login');
    }
  }
  
  return (
    <div key={reply.brno} style={{ display: 'block' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', padding: 20 }}>
          <div style={{ border: '1px solid #000', width: 20, height: 20, borderRadius: 10, marginRight: 10 }}></div>
          <div>{reply.nickname}</div>
        </div>
        <div>
          {reply.brno === brno ? (
            <div style={{ display: 'flex', padding: 20 }}>
              <div style={{ fontSize: 16, color: '#9b9b9b', marginRight: 20 }}>{reply.brregist}</div>
              <button className='reply-btn' onClick={handleCancelClick}>취소</button>
              <button className='reply-btn' onClick={handleModifySubmit}>저장</button>
            </div>
          ) : (
            <div style={{ display: 'flex', padding: 20 }}>
              <div style={{ fontSize: 16, color: '#9b9b9b', marginRight: 20 }}>{reply.brregist}</div>
              {
                user.nickname === reply.nickname ? (
                  <>
                    <button className='reply-btn' onClick={handleEditClick}>수정</button>
                    <button className='reply-btn delete-btn' onClick={() => handleCommentDelete(reply.brno)}>삭제</button>
                  </>
                ) : user.statecode !== '0' && (
                  <button className='reply-btn report-btn' onClick={() => handleReplyReport(reply.brno, reply.id)}>신고하기</button>
                )
              }
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: 20 }}>
        {reply.brno === brno ? (
          // 수정 중일 때는 수정할 수 있는 입력란 표시
          <input style={{Weight:'100%'}}
            type="text"
            name="brcontent"
            value={brcontent}
            onChange={(e) => setBrcontent(e.target.value)}
          />
          
        ) : (
          // 수정 중이 아닐 때는 댓글 내용 표시
          reply.brcontent
        )}
      </div>
      <div style={{ border: '1px solid #D9D9D9', margin: '20px 20px' }}></div>
    </div>
  );
};

export default BoardReply;