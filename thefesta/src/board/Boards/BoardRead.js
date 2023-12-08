import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/BoardRead.css';

const BoardRead = () => {

    const [post, setPost] = useState({});
    const [replies, setReplies] = useState([]);
    const [brno, setBrno] = useState(-1);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const bid = queryParams.get('bid');
    const [brcontent, setBrcontent] = useState('');
    const [user, setUser] = useState({
        nickname: "user1",  // 사용자의 닉네임 또는 로그인 정보를 가져와서 설정
        id: "user1@naver.com"
    });

    const handleModify = () => {
        navigate(`/board/modify?bid=${bid}`);
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
          axios.post(`http://localhost:9090/board/remove?bid=${bid}`)
            .then(response => {
              console.log(response);
              alert("게시글이 성공적으로 삭제되었습니다.")
              navigate('/board');
            })
            .catch(error => {
              console.error('Error deleting data:', error.message);
            });
        } else {
          // 사용자가 삭제를 취소한 경우
          // 원하는 동작을 수행할 수 있습니다.
          console.log("게시글 삭제가 취소되었습니다.");
        }
      };

    useEffect(() => {
        if (bid) {
            fetchPost(bid);
        }
    }, [bid]);

    const handleCommentSubmit = async () => {
        try {
            // formData 초기화
            const formData = new FormData();
    
            // 필드 추가
            formData.append('bid', bid);
            formData.append('brcontent', brcontent);
            formData.append('nickname', user.nickname);
            formData.append('id', user.id);
    
            const response = await axios.post(`http://localhost:9090/replies/new`, formData, {
                headers: {
                    'Content-Type': 'application/json' // 폼 데이터 전송시에는 'multipart/form-data'를 사용
                },
            });
            console.log(response);

            
    
            // 댓글 작성 후 댓글 목록 다시 불러오기
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

      const handleCommentDelete = async (brno) => {
        const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");
    
        if (isConfirmed) {
          try {
            await axios.delete(`http://localhost:9090/replies/${brno}`);
    
            // 댓글 삭제 후 댓글 목록 다시 불러오기
            getRepliesId(bid);
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
            brcontent: modifiedContent,
          });
    
          // 댓글 수정 후 댓글 목록 다시 불러오기
          getRepliesId(bid);
        } catch (error) {
          console.error('Error modifying comment:', error);
        }
      };

      const handleReport = () => {

      }

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'brcontent') {
          setBrcontent(value); // brcontent 값을 업데이트
        } else {
          setPost({ ...post, [name]: value });
        }
      };
    


    return (
        <div className="board-read">
            <h2 style={{padding: '10px 20px'}}>자유 게시판</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', padding: '0 20px' }}>
                <button style={{ border: '1px solid #000', padding: '10px 20px', color: '#000', backgroundColor: 'transparent'}} onClick={() => navigate(`/board`)}>목록</button>
                <button style={{ border: '1px solid #000', padding: '10px 20px', color: '#000', backgroundColor: 'transparent'}} onClick={() => navigate(`/board/register`)}>글쓰기</button>
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
                                <button style={{ border: '1px solid #000', padding: '5px 20px', color: '#000', backgroundColor: 'transparent', marginRight: '5px' }} onClick={handleModify}>수정</button>
                                <button style={{ border: '1px solid #ff0000', padding: '5px 20px', color: 'red', backgroundColor: 'transparent'}} onClick={handleDelete}>삭제</button>
                            </>
                        ) : (
                            <button style={{ border: '1px solid #000', padding: '5px 20px', color: '#000', backgroundColor: 'transparent' }} onClick={() => handleReport(post.bid)}>신고하기</button>
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
            {
                replies.length != 0 && replies.map((item) => {
                    return (
                        <div key={item.brno} style={{ display: 'block'}}>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{ display: 'flex', padding: 20}}>
                                    <div style={{border: '1px solid #000', width: 20, height: 20, borderRadius: 10, marginRight: 10}}></div>
                                    <div>{item.nickname}</div>
                                </div>
                                <div style={{ display: 'flex', padding: 20}}>
                                    {
                                        item.brno === brno ? (
                                            <div style={{ display: 'flex', padding: 20 }}>
                                                <div style={{ fontSize: 16, color: '#9b9b9b', marginRight: 20 }}>{item.brregist}</div>
                                                <button style={{ fontSize: 16, color: '#000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={() => setBrno(-1)}>취소</button>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', padding: 20 }}>
                                                <div style={{ fontSize: 16, color: '#9b9b9b', marginRight: 20 }}>{item.brregist}</div>
                                                {
                                                    user.nickname === item.nickname ? (  // 사용자의 닉네임과 댓글 작성자의 닉네임 비교
                                                        <>
                                                            <button style={{ fontSize: 16, color: '#000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={() => handleCommentModify(item.brno)}>수정</button>
                                                            <button style={{ fontSize: 16, color: '#ff0000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={() => handleCommentDelete(item.brno)}>삭제</button>
                                                        </>
                                                    ) : (
                                                        <button style={{ fontSize: 16, color: '#000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={() => handleReport(item.brno)}>신고하기</button>
                                                    )
                                                }
                                                <button style={{ fontSize: 16, color: '#000', marginRight: 20, backgroundColor: 'transparent', padding: 0 }} onClick={() => setBrno(item.brno)}>답글</button>
                                            </div>
                                        )
                                    }
                                </div> 
                            </div>
                            <div style={{padding: 20}}>
                                { item.brcontent}
                            </div>
                            {
                                item.brno === brno ? (
                                    <div style={{padding: 20}}>
                                        답글
                                    </div>
                                ): null
                            }
                            <div style={{border: '1px solid #D9D9D9', margin: '20px 20px' }}></div>
                        </div>
                    )
                })
            }
            <form
            onSubmit={handleCommentSubmit}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                minWidth: '768px',
                minHeight: '300px'
            }}
            >
            <div
                style={{
                border: '2px solid #D9D9D9',
                borderRadius: '10px',
                margin: '20px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1, // 폼 영역이 더 많은 공간을 차지하도록 함
                }}
            >
                <div
                style={{
                    padding: '10px',
                    backgroundColor: '#EEEEEE',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
                >
                <span style={{ paddingLeft: '10px', paddingTop: '8px', fontSize: '16px' }}>
                    {user.nickname}
                </span>
                <button
                    type="submit"
                    style={{
                    backgroundColor: '#D9D9D9',
                    color: '#000',
                    fontWeight: 'bold',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    fontSize: '14px',
                    marginRight: '10px',
                    }}
                >
                    등록
                </button>
                </div><span style={{textAlign:'center', minwidth:'768px', maxWidth: '1024px'}}>
                <input
                id="brcontent"
                name="brcontent"
                value={brcontent}
                onChange={handleInputChange}
                style={{
                    padding: '10px',
                    border: 'none',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    marginTop: '10px',
                }}
                /></span>
            </div>
            </form>;
        </div>
    );
};
export default BoardRead;