import React, { useState } from 'react';

const BoardReply = ({ reply, user, handleCommentModify, handleCommentDelete, handleReport, handleCommentSubmit, handleInputChange }) => {
  const [brno, setBrno] = useState(-1);
  const [brcontent, setBrcontent] = useState();


  
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
              <button style={{ fontSize: 16, color: '#000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={() => setBrno(-1)}>취소</button>
            </div>
          ) : (
            <div style={{ display: 'flex', padding: 20 }}>
              <div style={{ fontSize: 16, color: '#9b9b9b', marginRight: 20 }}>{reply.brregist}</div>
              {
                user.nickname === reply.nickname ? (
                  <>
                    <button style={{ fontSize: 16, color: '#000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={() => handleCommentModify(reply.brno)}>수정</button>
                    <button style={{ fontSize: 16, color: '#ff0000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={() => handleCommentDelete(reply.brno)}>삭제</button>
                  </>
                ) : (
                  <button style={{ fontSize: 16, color: '#000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={() => handleReport(reply.brno)}>신고하기</button>
                )
              }
              <button style={{ fontSize: 16, color: '#000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={() => setBrno(reply.brno)}>답글</button>
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: 20 }}>
        {reply.brcontent}
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