import React, { useState } from 'react';
import axios from 'axios';
import '../css/BoardRegister.css';
import { Link, useNavigate } from 'react-router-dom'




const BoardRegister = () => {

    const navigate = useNavigate();

    const [boardData, setBoardData] = useState({
        btitle: '',
        bcontent: '',
        nickname: '',
        id: '',
        attachList: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBoardData({ ...boardData, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        setBoardData({ ...boardData, attachList: files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {

            const formData = new FormData();
            formData.append('btitle', boardData.btitle);
            formData.append('bcontent', boardData.bcontent);
            formData.append('nickname', boardData.nickname);
            formData.append('id', boardData.id);

            boardData.attachList.forEach((file, index) => {
                formData.append(`attachList[${index}]`, file);
            });

            const response = await axios.post('http://localhost:9090/board/register', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            if (response != null) {
                alert("게시글이 성공적으로 등록되었습니다.");
                navigate(`/board`);
            };
        } catch (error) {
            alert("게시글 등록에 실패하였습니다. 관리자에게 문의하십시오.");
            console.log(error);
        }
    };

    return (
        <div className="board-register-container">
            <h2>게시글 작성</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="btitle">제목:</label>
                    <input
                        type="text"
                        id="btitle"
                        name="btitle"
                        value={boardData.btitle}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bcontent">내용:</label>
                    <textarea
                        id="bcontent"
                        name="bcontent"
                        value={boardData.bcontent}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="nickname">작성자:</label>
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={boardData.nickname}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={boardData.id}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file">첨부 파일:</label>
                    <input
                        type="file"
                        id="file"
                        name="attachList"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">등록</button>
            </form>
        </div>
    );
};

export default BoardRegister;
