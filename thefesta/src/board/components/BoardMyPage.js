import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import '../css/boardList.css';
import Cookies from 'js-cookie';

const BoardMyPage = () => {
    const [data, setData] = useState([]);
    const [replies, setReplies] = useState([])
    const [viewCnt, setViewCnt] = useState(0);
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 생성
    const id = Cookies.get('loginInfo');
    const parsedId = id ? JSON.parse(id) : '';
    const [user, setUser] = useState({
        nickname: "",  // 사용자의 닉네임 또는 로그인 정보를 가져와서 설정
        id: ""
    });

    const [currentPagePosts, setCurrentPagePosts] = useState(1);
    const [currentPageReplies, setCurrentPageReplies] = useState(1);
    const itemsPerPage = 5;

    // // 페이징 처리 함수
    // const paginate = (data, currentPage) => {
    //     const startIndex = (currentPage - 1) * itemsPerPage;
    //     const endIndex = startIndex + itemsPerPage;
    //     return data.slice(startIndex, endIndex);
    // };

    // // 게시글 필터링 및 페이징 처리
    // const filteredPosts = data.filter(item => user.id === item.id);
    // const totalPagesPosts = Math.ceil(filteredPosts.length / itemsPerPage);
    // const currentPosts = paginate(filteredPosts, currentPagePosts);

    // // 댓글 필터링 및 페이징 처리
    // const userReplies = replies.filter(reply => reply.id === user.id);
    // const totalPagesReplies = Math.ceil(userReplies.length / itemsPerPage);
    // const currentReplies = paginate(userReplies, currentPageReplies);

    useEffect(() => {
        if (data.length === 0) {
            selMember();
            fetchData();
        }
        
    }, []);

    const selMember = async () => {
        try {
            if (parsedId !== '') {
                const response = await axios.post('http://localhost:9090/member/selMember', {
                id: parsedId
                });
        
                setUser({
                id: response.data.id,
                nickname: response.data.nickname
                });
            }
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    };

    const fetchData = async () => {

        console.log("userID:" + parsedId);
        
        try {
            const response = await axios.post(`http://localhost:9090/board/userBoard`, {
                id: parsedId
            });
    
            setData(response.data.list);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    
        try {
            const repliesData = await axios.get(`http://localhost:9090/replies/listAll`);
            setReplies(repliesData.data); // repliesData.data를 사용하여 배열을 설정
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // 게시글 클릭 시 리드 페이지로 이동하는 함수 + viewcnt가 쌓임
    const handlePostClick = async (bid) => {
        try {
            // 서버에 increaseViewCount API 호출
            await axios.put(`http://localhost:9090/board/increaseViewCnt/${bid}`);

            setViewCnt((prevCnt) => prevCnt + 1);
            
            // 게시글의 상세 페이지로 이동
            navigate(`/board/read?bid=${bid}`);
        } catch (error) {
            console.error('Error updating view count:', error);
        }
    };


    return (
        <div className="board-container">
            <h2 className="board-title">마이페이지</h2>
    
            {/* 내가 쓴 게시글 */}
            <div className="board-item">
                <h3 className="board-subtitle">내가 쓴 게시글</h3>
                <div>
                    <table className="board-table">
                        <thead>
                            <tr>
                                <th className="board-th" style={{ minWidth: '50px' }}>#번호</th>
                                <th className="board-th" style={{ minWidth: '400px' }}>제목</th>
                                <th className="board-th" style={{ minWidth: '50px' }}>작성자</th>
                                <th className="board-th" style={{ minWidth: '120px' }}>작성일</th>
                                <th className="board-th" style={{ minWidth: '50px' }}>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map(item => (
                                <tr key={item.bid} onClick={() => handlePostClick(item.bid)}>
                                    <td className="board-td">{item.bid}</td>
                                    <td className="board-td">
                                        {item.btitle} <a style={{ color: 'red' }}> [{item.breplycnt}] </a>
                                    </td>
                                    <td className="board-td">{item.nickname}</td>
                                    <td className="board-td">{item.bregist}</td>
                                    <td className="board-td">{item.bviewcnt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    
            {/* 내가 쓴 댓글 */}
            <div className="reply-item">
                <h3 className="board-subtitle">내가 쓴 댓글</h3>
                <div>
                    <table className="board-table">
                        <thead>
                            <tr>
                                <th className="board-th" style={{ minWidth: '50px' }}>#번호</th>
                                <th className="board-th" style={{ minWidth: '600px' }}>댓글내용</th>
                                <th className="board-th" style={{ minWidth: '150px' }}>작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {replies.map(reply => (
                                <tr key={reply.brno} onClick={() => handlePostClick(reply.brno)}>
                                    <td className="board-td">{reply.brno}</td>
                                    <td className="board-td">{reply.brcontent}</td>
                                    <td className="board-td">{reply.brregist}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default BoardMyPage;