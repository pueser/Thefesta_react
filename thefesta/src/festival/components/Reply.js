import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import './Reply.css';

function Reply({
  frno,
  contentid,
  id,
  nickname,
  frcontent,
  frregist,
  fredit,
  replyList,
}) {
  const loginInfoString = Cookies.get('loginInfo');
  const loginInfo = loginInfoString ? JSON.parse(loginInfoString) : '';
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(frcontent);

  const onClickModify = () => {
    setIsEditMode(true);
  };

  const onSaveEdit = () => {
    let data = {
      frcontent: editedContent,
      frno: frno,
    };
    axios
      .patch('/festival/reply/modify', data)
      .then((res) => {
        console.log('res : ', res.data);
        setIsEditMode(false);
      })
      .catch((e) => console.log(e));
  };

  const onClickDelete = () => {
    const isConfirmed = window.confirm('댓글을 삭제하시겠습니까?');

    if (isConfirmed) {
      axios
        .patch('/festival/reply/delete', null, {
          params: {
            frno: frno,
          },
        })
        .then((res) => {
          console.log('res : ', res.data);
          replyList();
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div className='reply'>
      <div className='userInfo'>
        {loginInfo && loginInfo.img ? (
          <img src={loginInfo.img} alt={loginInfo.id}></img>
        ) : (
          <div className='userImg' />
        )}
        <strong>{nickname}</strong>
      </div>
      {isEditMode ? (
        <>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button type='button' onClick={onSaveEdit}>
            저장
          </button>
        </>
      ) : (
        <p>{editedContent}</p>
      )}
      <span>{fredit}</span>
      {loginInfo && loginInfo.id === id ? (
        <div className='replyBtn'>
          <button type='button' onClick={onClickModify}>
            수정
          </button>
          <button type='button' onClick={onClickDelete}>
            삭제
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Reply;
