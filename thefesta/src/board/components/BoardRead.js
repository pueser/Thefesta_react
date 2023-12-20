import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Reply from './BoardReply';
import Cookies from 'js-cookie';
import '../css/boardRead.css';

const BoardRead = () => {

    const [post, setPost] = useState({});
    const [replies, setReplies] = useState([]);
    const [brno, setBrno] = useState(-1);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const [brcontent, setBrcontent] = useState('');
    const id = Cookies.get('loginInfo');
    const parsedId = id ? JSON.parse(id) : '';
    const [user, setUser] = useState({
        nickname: "",  // 사용자의 닉네임 또는 로그인 정보를 가져와서 설정
        id: "",
        statecode: ""
    });
    const [boardState, setBoardState] = useState({
        bid: queryParams.get('bid'),
        pageNum: queryParams.get('pageNum'),
        amount: queryParams.get('amount'),
        type: queryParams.get('type'),
        text: queryParams.get('keyword'),
    })
    

    const handleModify = () => {
        navigate(`/board/modify?bid=${boardState.bid}`);
    };


    const selMember = async () => {
        try {
            if (parsedId !== '') {
                const response = await axios.post('http://localhost:9090/member/selMember', {
                id: parsedId
                });
        
                setUser({
                id: response.data.id,
                nickname: response.data.nickname,
                statecode: response.data.statecode
                });
            }
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    };
    const fetchPost = async (bided) => {
        try {
            const response = await axios.get(`http://localhost:9090/board/read?bid=${bided}`);
            console.log(response);
            setPost(response.data);

            if(response.data.bid != null){
                getRepliesId(response.data.bid);
            }
        } catch (error) {
            console.error('Error fetching post data:', error);
        }
    };

    const getRepliesId = async (bided) => {
        try {
            const response = await axios.get(`http://localhost:9090/replies/pages/${bided}/1`);
            console.log(response);
            setReplies(response.data);
        } catch (error) {
            console.error('Error fetching post data:', error);
        }
    }

    const handleDelete = () => {
        const isConfirmed = window.confirm("게시글을 삭제하시겠습니까?");
    
        if (isConfirmed) {
          axios.post(`http://localhost:9090/board/remove?bid=${boardState.bid}`)
            .then(response => {
              console.log(response);
              alert("게시글이 성공적으로 삭제되었습니다.")
              navigate('/board');
            })
            .catch(error => {
              console.error('Error deleting data:', error.message);
            });
        } else {
          console.log("게시글 삭제가 취소되었습니다.");
        }
      };

    useEffect(() => {
        if (boardState.bid) {
            selMember();
            fetchPost(boardState.bid);
        }
    }, [boardState.bid]);

    const handlePostList = (pageNum, amount, type, text) => {
        navigate(`/board/list?&pageNum=${pageNum}amount=${amount}&type=${type}&keyword=${text}`)

    }

    const handleCommentSubmit = async (e) => {
      if (user.id != "") {

        try {
          // formData 초기화
          const formData = new FormData();
          
  
          // 필드 추가
          formData.append('bid', boardState.bid);
          formData.append('brcontent', brcontent);
          formData.append('nickname', user.nickname);
          formData.append('id', user.id);
  
          const response = await axios.post(`http://localhost:9090/replies/new`, formData, {
              headers: {
                  'Content-Type': 'application/json' // 폼 데이터 전송시에는 'multipart/form-data'를 사용
              }
          });
          alert("댓글이 등록되었습니다.");
          console.log(response);
        

          navigate(`/board/read/${boardState.bid}`);

      } catch (error) {
          console.error('Error submitting comment:', error);
      }
    } else {
        alert("로그인이 필요한 기능입니다.")
        navigate('/login');
    }
    };

      const handleCommentDelete = async (brno) => {
        const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");
    
        if (isConfirmed) {
          try {
            await axios.delete(`http://localhost:9090/replies/${brno}`);
    
            alert("댓글이 삭제되었습니다.");
            // 댓글 삭제 후 댓글 목록 다시 불러오기
            getRepliesId(boardState.bid);
          } catch (error) {
            console.error('Error deleting comment:', error);
          }
        } else {
          console.log("댓글 삭제가 취소되었습니다.");
        }
      };

      const handleCommentModify = async (brno, modifiedContent) => {
        try {
          await axios.put(`http://localhost:9090/replies/${brno}`, {
            bid: boardState.bid,
            brcontent: modifiedContent,
          });
    
          // 댓글 수정 후 댓글 목록 다시 불러오기
          getRepliesId(boardState.bid);
        } catch (error) {
          console.error('Error modifying comment:', error);
        }
      };

      const handlePostReport = () => {
          if (user.id != "") {
            navigate(`/reportpage?bid=${post.bid}&id=${post.id}`);
        } else {
            alert("로그인이 필요한 기능입니다.")
            navigate('/login');
        }
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'brcontent') {
          setBrcontent(value); // brcontent 값을 업데이트
        } else {
          setPost({ ...post, [name]: value });
        }
      };
    

      const handleWrite = () => {
        if (user.id != "") {
            navigate("/board/register")
        } else {
            alert("로그인이 필요한 기능입니다.")
            navigate('/login');
        }
    };

    return (
        <div className="board-read">
            <h2 style={{padding: '10px 20px'}}>톡톡 게시판</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', padding: '0 20px' }}>
                <button className="board-btn" style={{ border: '1px solid #000', padding: '10px 20px', color: '#000', backgroundColor: 'transparent'}} onClick={() => handlePostList(boardState.pageNum, boardState.amount, boardState.type, boardState.text)}>목록</button>
                <button className="board-btn" style={{ border: '1px solid #000', padding: '10px 20px', color: '#000', backgroundColor: 'transparent'}} onClick={() => handleWrite()}>글쓰기</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', backgroundColor: '#cdcdcd', padding: '10px' }}>
                <div style={{ alignSelf: 'center'}}>
                    <span style={{ margin: '0 20px', fontWeight: 'bold'}} >{post.nickname}</span>
                    <span> 제목 : </span>
                    <span> {post.btitle}</span>
                </div>
                <div>
                    {
                        user.nickname === post.nickname ? (  // 사용자의 닉네임과 게시글 작성자의 닉네임 비교
                            <>
                                <button className="board-modify-btn" onClick={handleModify}>수정</button>
                                <button className="board-delete-btn" onClick={handleDelete}>삭제</button>
                            </>
                        ) : (
                                user.statecode !== '0' && (
                                <button className="board-report-btn" onClick={() => handlePostReport(post.bid, post.id)}>신고하기</button>
                                )
                            )
                    }
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: '20px', padding: '5px 20px' }}>
                <p style={{margin: 0, color: '#9b9b9b'}}>작성일: {post.bregist}</p>
                <p style={{margin: 0, color: '#9b9b9b'}}>조회수: {post.bviewcnt}</p>
            </div>
            <div style={{padding: '20px', minHeight: '400px'}}>
                <p>{post.bcontent}</p>
            </div>
            <div style={{border: '1px solid #D9D9D9', margin: '20px 20px'}}></div>
            {replies.length !== 0 && replies.map((item) => (
                <Reply
                key={item.brno}
                reply={item}
                user={user}
                handleCommentModify={handleCommentModify}
                handleCommentDelete={handleCommentDelete}
                />
            ))}  
            <form onSubmit={handleCommentSubmit} className="commentForm">
                <div className="commentContainer">
                    <div className="commentHeader">
                    <span style={{ paddingLeft: '10px', paddingTop: '8px', fontSize: '16px' }}>
                        {user.nickname}
                    </span>
                    <button type="submit" className="board-btn">등록</button>
                    </div>
                        <input
                            id="brcontent"
                            name="brcontent"
                            value={brcontent}
                            onChange={handleInputChange}
                            className="commentInput"
                        />
                </div>
            </form>
            
        </div>
    );
};
export default BoardRead;