import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import './Reply.css';
import Like from './Like';
import { Link, useNavigate } from 'react-router-dom';

function Reply({
  frno,
  contentid,
  id,
  nickname,
  frcontent,
  frregist,
  fredit,
  replyList,
  profileImg,
  userInfo,
  replyUpdate,
}) {
  const navigate = useNavigate();
  const loginInfoString = Cookies.get('loginInfo');
  const loginInfo = loginInfoString ? JSON.parse(loginInfoString) : '';
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(frcontent);
  const userImg = 'http://192.168.4.40:9090/resources/fileUpload/' + profileImg;

  const onClickModify = () => {
    setIsEditMode(true);
  };
  //
  const onSaveEdit = () => {
    let data = {
      frcontent: editedContent,
      frno: frno,
    };
    axios
      .patch('/festival/reply/modify', data)
      .then((res) => {
        console.log('reply modify res : ', res.data);
        setIsEditMode(false);
        replyUpdate();
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

  const onClickReport = () => {
    if (!loginInfoString) {
      alert('로그인 후 이용 가능합니다.');
    } else {
      navigate('/festival/replyReport', {
        state: {
          id: userInfo.id,
          frno: frno,
          reported: id,
        },
      });
    }
  };

  return (
    <div className='reply'>
      <div className='userInfo'>
        <img src={userImg} alt={id} className='userImg'></img>
        <strong>{nickname}</strong>
      </div>
      {isEditMode ? (
        <>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            maxLength={1000}
          />
          <div className='editBtn'>
            <button type='button' onClick={onSaveEdit}>
              저장
            </button>
            <button type='button' onClick={() => setIsEditMode(false)}>
              취소
            </button>
          </div>
        </>
      ) : (
        <p>{editedContent}</p>
      )}
      <span>{fredit}</span>
      {userInfo && userInfo.id === id ? (
        <div className='replyBtn'>
          <button type='button' onClick={onClickModify}>
            수정
          </button>
          <button type='button' onClick={onClickDelete}>
            삭제
          </button>
        </div>
      ) : (
        <div className='reportBtn'>
          <button type='button' onClick={onClickReport}>
            신고
          </button>
        </div>
      )}
    </div>
  );
}

export default Reply;
