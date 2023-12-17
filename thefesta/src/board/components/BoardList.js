import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'
import '../css/boardList.css';

const BoardList = () => {
    const [data, setData] = useState([]);
    const [viewCnt, setViewCnt] = useState(0);
    const [amount, setAmount] = useState(10);
    const [type, setType] = useState("T");
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const [pageNum, setPageNum] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const [bno, setBno] = useState(0);
    const id = Cookies.get('loginInfo');
    const parsedId = id ? JSON.parse(id) : '';
    const [user, setUser] = useState({
        nickname: "",
        id: ""
    });

    useEffect(() => {
        if (data.length === 0) {
            fetchData();
            selMember();
        }

        
    }, []);

    const selMember = async () => {
        try {
            if (parsedId !== '') {
                const response = await axios.post('http://localhost:9090/member/selMember', {
                    id: parsedId
                });
                const memData = response.data;

                user.id = memData.id;
                user.nickname = memData.nickname;
            }
            console.log(user.nickname);
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    }
    
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
            navigate("/board/register", user)
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

    const handlePostClick = async (bid) => {
        try {
            await axios.put(`http://localhost:9090/board/increaseViewCnt/${bid}`);
            setViewCnt((prevCnt) => prevCnt + 1);
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
            <div className="board-buttons">
                <button className="board-btn" onClick={() => getBoardStatus()}>등록순</button>
                <button className="board-btn" onClick={() => handleWrite()}>글쓰기</button>
            </div>
            <table className="board-table">
                <thead>
                    <tr>
                        <th className="board-th">분류</th>
                        <th className="board-th">#번호</th>
                        <th className="board-th" style={{minWidth: '400px'}}>제목</th>
                        <th className="board-th">작성자</th>
                        <th className="board-th">작성일</th>
                        <th className="board-th">조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length !== 0 && data.map(item => (
                        <tr key={item.bid} onClick={() => handlePostClick(item.bid)}>
                            <td className="board-td">{item.bno}</td>
                            <td className="board-td">{item.bid}</td>
                            <td className="board-td">{item.btitle} <a style={{ color: 'red'}}> [{item.breplycnt}] </a></td>
                            <td className="board-td">{item.nickname}</td>
                            <td className="board-td">{item.bregist}</td>
                            <td className="board-td">{item.bviewcnt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="board-options">
                <select name="languages" id="lang" value={amount} onChange={(e) => setAmount(e.target.value)}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>
            <div className="board-search">
                <select name="languages" id="lang" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="T">제목</option>
                    <option value="C">내용</option>
                    <option value="W">작성자</option>
                </select>
                <input className="board-input" type="text" name="title" value={text} onChange={(e) => setText(e.target.value)} ></input>
                <button className="board-btn" onClick={() => getBoardStatus()}>검색</button>
            </div>
            <div className="pagination">
                {pageInfo.startPage !== 1 && (
                    <button className="pagination-btn" onClick={() => handlePageChange(pageInfo.startPage - 1)}>
                        {'<'}
                    </button>
                )}
                {Array.from({ length: pageInfo.endPage - pageInfo.startPage + 1}, (_, index) => index + pageInfo.startPage).map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)} className={page === pageNum ? 'active' : ''}>
                        {page}
                    </button>
                ))}
                {pageInfo.endPage !== Math.ceil(pageInfo.total / amount) && (
                    <button className="pagination-btn" onClick={() => handlePageChange(pageInfo.endPage + 1)}>
                        {'>'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default BoardList;
