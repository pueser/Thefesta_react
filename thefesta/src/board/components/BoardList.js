import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import '../css/boardList.css';

const BoardList = () => {
    const [data, setData] = useState([]);
    const [viewCnt, setViewCnt] = useState(0);
    const [amount, setAmount] = useState(10);
    const [type, setType] = useState("T");
    const [text, setText] = useState("");
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 생성
    const [pageNum, setPageNum] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const [bno, setBno] = useState(0);
    const [user, setUser] = useState({
        nickname: "user1",  // 사용자의 닉네임 또는 로그인 정보를 가져와서 설정
        id: "user1@naver.com"
    });

    useEffect(() => {
        if (data.length === 0) {
            fetchData();
        }
        
    }, []);

    const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:9090/board/list`
          );

          setData(response.data.list);
          setPageInfo(response.data.pageMaker);
          
          console.log("list data:", response.data.list);

        } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    const handleWrite = () => {

        if (user != null) {
            navigate("/board/register")
        } else {
            alert("로그인이 필요한 기능입니다.")
            navigate('/login');
        }
      };

    const getBoardStatus = async () => {

        const params = {
            pageNum: 1,
            amount: amount,
            type: type,
            keyword: text,
        }
        try {
            const response = await axios.get(
                `http://localhost:9090/board/list?pageNum=${params.pageNum}&amount=${params.amount}&type=${params.type}&keyword=${params.keyword}`
                );
            setData(response.data.list);
            setAmount(params.amount);
            setType(params.type);
            setText(params.keyword);


            handlePageChange(params.pageNum, params.amount, params.type, params.keyword);
        } catch (error) {
            console.error('Error fetching data:', error.message);
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

    const handlePageChange = async (pageNum) => {
        try {
            const response = await axios.get(`http://localhost:9090/board/list?pageNum=${pageNum}&amount=${amount}&type=${type}&keyword=${text}`);
            setData(response.data.list);
            setPageInfo(response.data.pageMaker);
            setPageNum(pageNum);
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

      
    return (
        <div className="board-container">
            <h2>톡톡 게시판</h2>
            <div style={{ height: '40px', display: 'flex', justifyContent: 'space-between', gap: '1px' }}>
                <div style={{ display: 'flex', alignItems: 'end' }}>
                    <button style={{ border: '1px solid #000', padding: '10px 20px', color: '#000', backgroundColor: 'transparent', marginRight: '10px'}} onClick={() => navigate(`/board`)}>등록순</button>
                    <button style={{ border: '1px solid #000', padding: '10px 20px', color: '#000', backgroundColor: 'transparent'}} onClick={() => getBoardStatus()}>조회순</button>
                </div>
                <button style={{ border: '1px solid #000', padding: '10px 20px', color: '#000', backgroundColor: 'transparent'}} onClick={() => handleWrite()}>글쓰기</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>분류</th>
                        <th>#번호</th>
                        <th style={{minWidth: '400px'}}>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length !== 0 && data.map(item => (
                        // 게시글 항목을 클릭할 때 handlePostClick 함수 호출
                        <tr key={item.bid} onClick={() => handlePostClick(item.bid)}>
                            <td>{item.bno}</td>
                            <td>{item.bid}</td>
                            <td>{item.btitle} <a style={{ color: 'red'}}> [{item.breplycnt}] </a></td>
                            <td>{item.nickname}</td>
                            <td>{item.bregist}</td>
                            <td>{item.bviewcnt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: 'end', margin: '10px 0 0 0' }}>
                <select name="languages" id="lang" style={{ width: '70px', height: '20px', paddingLeft: '8px', fontSize: '14px' }} value={amount} onChange={(e) => setAmount(e.target.value)}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'start', height: '40px', marginTop: '10px' }}>
                <select name="languages" id="lang" style={{ width: '100px', height: '40px', paddingLeft: '8px', fontSize: '14px' }} value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="T">제목</option>
                    <option value="C">내용</option>
                    <option value="W">작성자</option>
                </select>
                <input type="text" name="title" style={{ margin: '0 10px', maxWidth: '200px' }} value={text} onChange={(e) => setText(e.target.value)} ></input><br />
                <button style={{ border: '1px solid #000', padding: '10px 20px', color: '#000', backgroundColor: 'transparent'}}onClick={() => getBoardStatus()}>검색</button>
            </div>
            <div style={{textAlign: 'center', marginTop: 20}}>
            </div>
            <div className="pagination" style={{ textAlign: 'center', marginTop: '50px' }}>
                {pageInfo.startPage !== 1 && (
                    <button style={{ backgroundColor: 'white', color: 'black', marginRight: '5px' }} onClick={() => handlePageChange(pageInfo.startPage - 1)}>
                        {'<'}
                    </button>
                )}
                {Array.from({ length: pageInfo.endPage - pageInfo.startPage + 1}, (_, index) => index + pageInfo.startPage).map((page) => (
                    <button style={{ backgroundColor: 'white', color: 'black', margin: '0 2px', fontWeight: page === pageNum ? 'bold' : 'normal' }} key={page} onClick={() => handlePageChange(page)} className={page === pageNum ? 'active' : ''}>
                        {page}
                    </button>
                ))}
                {pageInfo.endPage !== Math.ceil(pageInfo.total / amount) && (
                    <button style={{ backgroundColor: 'white', color: 'black', marginLeft: '5px' }} onClick={() => handlePageChange(pageInfo.endPage + 1)}>
                        {'>'}
                    </button>
                )}
            </div>
        </div>

        
    );
};
export default BoardList;