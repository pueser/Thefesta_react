import axios from 'axios';
import { useEffect, useState } from 'react';
import Reply from './Reply';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import ReplySection from './ReplySection';
import Cookies from 'js-cookie';

function ReplyList({ contentid }) {
  const loginInfoString = Cookies.get('loginInfo');
  const loginInfo = loginInfoString ? JSON.parse(loginInfoString) : '';
  const [replies, setReplies] = useState([]);
  const [pageMaker, setPageMaker] = useState({});
  const [page, setPage] = useState(1);
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   // getUserInfo()를 호출하여 user 값을 업데이트

  // }, [loginInfo]);

  useEffect(() => {
    replyList();
    if (loginInfo) {
      console.log('loginInfo : ', loginInfo);
      getUserInfo();
    }
  }, [page]);

  const getUserInfo = () => {
    axios
      .post(`/member/selMember`, { id: loginInfo })
      .then((res) => {
        console.log('selMember res.data : ', res.data);
        setUser(res.data);
      })
      .catch((e) => console.log(e));
  };

  const replyList = () => {
    axios
      .get(`/festival/reply`, {
        params: {
          page: page,
          contentid: contentid,
        },
      })
      .then((res) => {
        console.log('res.data : ', res.data);
        setReplies(res.data.list);
        setPageMaker(res.data.pageMaker);
      })
      .catch((e) => console.log(e));
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleReplySubmit = () => {
    // 댓글이 등록되면 최신의 페이지 정보를 가져와서 해당 페이지로 이동
    setPage(pageMaker.realEnd);
    replyList();
  };

  return (
    <div>
      {replies.map((reply) => (
        <Reply
          key={reply.frno}
          frno={reply.frno}
          contentid={reply.contentid}
          id={reply.id}
          nickname={reply.nickname}
          frcontent={reply.frcontent}
          frregist={reply.frregist}
          fredit={reply.fredit}
          profileImg={reply.profileImg}
          replyList={replyList}
          userInfo={user}
          replyUpdate={replyList}
        ></Reply>
      ))}
      <Pagination pageMaker={pageMaker} handlePageChange={handlePageChange} />
      <ReplySection
        contentid={contentid}
        handleReplySubmit={handleReplySubmit}
        userInfo={user}
      ></ReplySection>
    </div>
  );
}

export default ReplyList;
