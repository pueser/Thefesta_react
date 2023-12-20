import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
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

    const [titleLength, setTitleLength] = useState(0);
    const [contentLength, setContentLength] = useState(0);

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

    const handleTitleChange = (e) => {
        const { value } = e.target;
        if (value.length <= 30) {
            setBoard((prevData) => ({
                ...prevData,
                btitle: value,
            }));
            setTitleLength(value.length);
        }
    };

    const handleContentChange = (e) => {
        const { value } = e.target;
        if (value.length <= 1000) {
            setBoard((prevData) => ({
                ...prevData,
                bcontent: value,
            }));
            setContentLength(value.length);
        }
    };

    const handleModifySubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:9090/board/modify', board)
            .then(response => {
                console.log(response);
                alert("게시글 수정에 성공하였습니다.")
                navigate('/board');
            })
            .catch(error => {
                alert("게시글 수정에 실패하였습니다. 관리자에게 문의하세요")
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
                <label className="board-modify-label" style={{textAlign:'center'}}>제목
                    <div>
                        <input style={{width:"250px", height:"20px", textAlign:'center'}}
                            type="text"
                            name="btitle"
                            value={board.btitle}
                            onChange={handleTitleChange}
                        />
                    </div>
                        <a style={{color:"#1d1d1d"}}><a style={{color:"#d9d9d9"}}>{titleLength}</a> / 30</a>
                </label>
                <label className="board-modify-label" style={{textAlign:'center'}}>내용
                    <div>
                    <textarea style={{width:"100%",minWidth:'510px', height:"500px", textAlign:'center'}}
                        name="bcontent"
                        value={board.bcontent}
                        onChange={handleContentChange}
                        className="board-modify-textarea"
                    />
                    <div style={{color:"#1d1d1d"}}><a style={{color:"#d9d9d9"}}>{contentLength}</a> / 1000</div>
                    </div>
                </label>
                <div className="board-modify-buttons" style={{textAlign:'center'}}>
                    <button type="submit" className="board-modify-submitButton">수정</button>
                    <button className="board-modify-cancelButton" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default BoardModify;
