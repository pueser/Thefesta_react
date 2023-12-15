import React, { useState } from 'react';

const BoardReply = ({ reply, user, handleCommentModify, handleCommentDelete, handleReport, handleCommentSubmit, handleInputChange }) => {
  const [brno, setBrno] = useState(-1);
  const [brcontent, setBrcontent] = useState();



  const handleEditClick = () => {
    setBrno(reply.brno);
  };

  const handleCancelClick = () => {
    setBrno(-1);
    setBrcontent(reply.brcontent); // 취소할 때 기존 내용으로 복원
  };

  const handleModifySubmit = () => {
    // 서버로 수정된 내용을 보낼 수 있는 로직 추가
    handleCommentModify(reply.brno, brcontent);
    setBrno(-1); // 수정 후 다시 원래 화면으로 돌아가기
  };
  
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
              <button style={{ fontSize: 16, color: '#000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={handleCancelClick}>취소</button>
              <button style={{ fontSize: 16, color: '#000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={handleModifySubmit}>저장</button>
            </div>
          ) : (
            <div style={{ display: 'flex', padding: 20 }}>
              <div style={{ fontSize: 16, color: '#9b9b9b', marginRight: 20 }}>{reply.brregist}</div>
              {
                user.nickname === reply.nickname ? (
                  <>
                    <button style={{ fontSize: 16, color: '#000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={handleEditClick}>수정</button>
                    <button style={{ fontSize: 16, color: '#ff0000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={() => handleCommentDelete(reply.brno)}>삭제</button>
                  </>
                ) : (
                  <button style={{ fontSize: 16, color: '#000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={() => handleReport(reply.brno)}>신고하기</button>
                )
              }
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: 20 }}>
        {reply.brno === brno ? (
          // 수정 중일 때는 수정할 수 있는 입력란 표시
          <input style={{minHeight:'100px'}}
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
      {reply.brno === brno ? (
        <form onSubmit={handleCommentSubmit} className="commentForm">
          <div className="commentContainer">
              <div className="commentHeader">
              <span style={{ paddingLeft: '10px', paddingTop: '8px', fontSize: '16px' }}>
                  {user.nickname}
              </span>
              <button type="submit" className="submitButton">등록</button>
              </div>
              <span style={{ textAlign: 'center', maxWidth: '1024px' }}>
              <input
                  id="brcontent"
                  name="brcontent"
                  value={brcontent}
                  onChange={handleInputChange}
                  className="commentInput"
              />
              </span>
          </div>
        </form>
      ) : null}
      <div style={{ border: '1px solid #D9D9D9', margin: '20px 20px' }}></div>
    </div>
  );
};

export default BoardReply;