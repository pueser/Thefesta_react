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

  const handlecansle = (e) => {
    alert("게시글수정을 취소하셨습니다.");
    navigate(`/board`);
}

  return (
    <div className="container">
      <h2 className="heading">글 수정 페이지</h2>
      <form onSubmit={handleModifySubmit}>
        <label className="label">
          제목:
          <input
            type="text"
            name="btitle"
            value={board.btitle}
            onChange={handleInputChange}
            className="input"
          />
        </label>
        <label className="label">
          내용:
          <textarea
            name="bcontent"
            value={board.bcontent}
            onChange={handleInputChange}
            className="textarea"
          />
        </label>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <button type="submit" className="submitButton">수정완료</button>
          <button className="submitButton" onClick={handlecansle}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default BoardModify;
