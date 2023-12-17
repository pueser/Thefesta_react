import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../css/boardRegister.css';
import { Link, useNavigate } from 'react-router-dom'



const BoardRegister = () => {

    const navigate = useNavigate();
    const [bno, setBno] = useState(1); // 초기값을 1로 설정
    const id = Cookies.get('loginInfo');
    const parsedId = id ? JSON.parse(id) : '';
    const [user, setUser] = useState({
        nickname: "",
        id: ""
    });


    useEffect(() => {

          selMember();

  }, []);

  const selMember = async () => {
    try {
        const id = Cookies.get('loginInfo');
        const parsedId = id ? JSON.parse(id) : '';
        
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

    const [boardData, setBoardData] = useState({
        bno: bno,
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
        setBoardData({ ...boardData, attachList: files ? Array.from(files) : [] });
    };

    const handlecansle = (e) => {
        alert("게시글등록을 취소하셨습니다.");
        navigate(`/board`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        boardData.bno = bno;
    
        try {
            const formData = new FormData();
            formData.append('bno', boardData.bno);
            formData.append('btitle', boardData.btitle);
            formData.append('bcontent', boardData.bcontent);
            formData.append('nickname', user.nickname);
            formData.append('id', user.id);
    
            if (Array.isArray(boardData.attachList)) {
                boardData.attachList.forEach((file, index) => {
                    formData.append(`attachList[${index}]`, file);
                });
            }
    
            const response = await axios.post('http://localhost:9090/board/register', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log(response);
    
            if (response != null) {
                alert("게시글이 성공적으로 등록되었습니다.");
                navigate(`/board`);
            }
        } catch (error) {
            alert("게시글 등록에 실패하였습니다. 관리자에게 문의하십시오.");
            console.log(error);
        }
    };

    return (
        <div className="board-register-container">
          <h2 className="board-register-title">게시글 작성</h2>
          <form onSubmit={handleSubmit}>
            <label>
              게시판 유형:
              <select
                className="board-register-select"
                value={bno}
                onChange={(e) => setBno(e.target.value)}
              >
                <option value={1}>자유게시판</option>
                <option value={2}>리뷰게시판</option>
                <option value={3}>문의게시판</option>
              </select>
            </label>
            <div className="board-register-form-group">
              <label className="board-register-label" htmlFor="btitle">제목</label>
              <input
                className="board-register-input"
                type="text"
                id="btitle"
                name="btitle"
                value={boardData.btitle}
                onChange={handleInputChange}
              />
            </div>
            <div className="board-register-form-group">
              <label className="board-register-label" htmlFor="bcontent">내용</label>
              <textarea
                className="board-register-textarea"
                id="bcontent"
                name="bcontent"
                value={boardData.bcontent}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="board-register-form-group">
                    <label className="board-register-label" htmlFor="file">파일첨부</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        multiple  // Allow multiple file selection
                    />
                </div>
            <div
              className="board-register-buttons"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <button
                className="board-register-btn"
                type="submit"
              >
                등록
              </button>
              <button
                className="board-register-btn"
                onClick={handlecansle}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      );
    };
    
    export default BoardRegister;