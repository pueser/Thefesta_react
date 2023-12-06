import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import './ReplySection.css';

function ReplySection({ contentid, handlePageChange }) {
  const loginInfoString = Cookies.get('loginInfo');
  const loginInfo = loginInfoString ? JSON.parse(loginInfoString) : '';
  const [content, setContent] = useState('');

  const handleContent = async (e) => {
    setContent(e.target.value);
  };

  const onClickInsertReply = (e) => {
    e.preventDefault();
    if (!loginInfo) {
      alert('로그인 후 이용 가능합니다.');
    } else {
      let data = {
        frcontent: content,
        contentid: contentid,
        id: loginInfo.id,
        nickname: loginInfo.nickname,
      };

      axios
        .post('/festival/insertReply', data)
        .then((res) => {
          console.log('res : ', res.data);
          handlePageChange();
          setContent('');
          console.log('content : ', content);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className='replyForm'>
      <div className='replyUser'>
        {loginInfo && loginInfo.img ? (
          <img src={loginInfo.img} alt={loginInfo.id}></img>
        ) : (
          <div className='userImg' />
        )}
        <strong>{loginInfo ? loginInfo.nickname : ''}</strong>
      </div>
      <form method='POST' action='/festival/insertReply'>
        <textarea
          name='frcontent'
          placeholder='댓글을 입력하세요'
          onChange={handleContent}
          value={content}
        ></textarea>
        <button type='submit' onClick={onClickInsertReply}>
          등록
        </button>
      </form>
    </div>
  );
}

export default ReplySection;
