import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../css/boardModify.css';

const BoardModify = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const bid = queryParams.get('bid');
    const navigate = useNavigate();

    const [board, setBoard] = useState({
        bid: bid,
        btitle: '',
        bcontent: '',
        nickname: '',
        id: ''
    });

    useEffect(() => {
        if (bid) {
            axios.get(`http://localhost:9090/board/read?bid=${bid}`)
                .then(response => {
                    setBoard(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error.message);
                });
        }
    }, [bid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBoard(prevBoard => ({
            ...prevBoard,
            [name]: value,
        }));
    };

    const handleModifySubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:9090/board/modify', board)
            .then(response => {
                console.log(response);
                navigate('/board');
            })
            .catch(error => {
                console.error('Error modifying data:', error.message);
            });
    };

    const handleCancel = (e) => {
        alert("게시글 수정을 취소하셨습니다.");
        navigate(`/board`);
    }

    return (
        <div className="board-modify-container">
            <h2 className="board-modify-heading">글 수정 페이지</h2>
            <form onSubmit={handleModifySubmit}>
                <label className="board-modify-label">
                    제목:
                    <input
                        type="text"
                        name="btitle"
                        value={board.btitle}
                        onChange={handleInputChange}
                        className="board-modify-input"
                    />
                </label>
                <label className="board-modify-label">
                    내용:
                    <textarea
                        name="bcontent"
                        value={board.bcontent}
                        onChange={handleInputChange}
                        className="board-modify-textarea"
                    />
                </label>
                <div className="board-modify-buttons">
                    <button type="submit" className="board-modify-submitButton">수정완료</button>
                    <button className="board-modify-submitButton" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default BoardModify;
