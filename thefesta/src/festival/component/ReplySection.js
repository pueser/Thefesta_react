import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import './ReplySection.css';

function ReplySection({ contentid, handleReplySubmit, userInfo }) {
  const loginInfoString = Cookies.get('loginInfo');
  const loginInfo = loginInfoString ? JSON.parse(loginInfoString) : '';
  const [content, setContent] = useState('');

  const userProfileImg = (userImg) => {
    const imgUrl = 'http://localhost:9090/resources/fileUpload/' + userImg;
    return imgUrl;
  };
  //
  const handleContent = async (e) => {
    setContent(e.target.value);
  };

  const onClickInsertReply = (e) => {
    e.preventDefault();

    if (!loginInfo) {
      alert('로그인 후 이용 가능합니다.');
    } else if (content.length === 0) {
      alert('내용을 입력해 주세요.');
    } else if (loginInfo && content.length > 0) {
      let data = {
        frcontent: content,
        contentid: contentid,
        id: userInfo.id,
        nickname: userInfo.nickname,
      };

      axios
        .post('/festival/insertReply', data)
        .then((res) => {
          console.log('res : ', res.data);
          handleReplySubmit();
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
        {loginInfoString ? (
          <img
            src={userProfileImg(userInfo.profileImg)}
            alt={userInfo.id}
            className='userImg'
          ></img>
        ) : (
          <div className='defaultUserImg' />
        )}
        <strong>{userInfo ? userInfo.nickname : ''}</strong>
      </div>
      <form method='POST' action='/festival/insertReply'>
        <textarea
          name='frcontent'
          placeholder='댓글을 입력하세요'
          onChange={handleContent}
          value={content}
          maxLength={1000}
        ></textarea>
        <button type='submit' onClick={onClickInsertReply}>
          등록
        </button>
      </form>
    </div>
  );
}

export default ReplySection;
