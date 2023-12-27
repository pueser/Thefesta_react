import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from '../component/Pagination';
import Cookies from 'js-cookie';
import UserLike from '../component/UserLike';
import './LikeList.css';

function LikeList() {
  const loginInfoString = Cookies.get('loginInfo');
  const id = JSON.parse(loginInfoString);
  const [likeList, setLikeList] = useState([]);
  const [pageMaker, setPageMaker] = useState({});
  const [page, setPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setSelectAll(false);
    getLikeList();
  }, [page]);

  const getLikeList = () => {
    axios
      .get('/festival/likeList', {
        params: {
          page: page,
          id: id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLikeList(res.data.list);
        setPageMaker(res.data.pageMaker);
      })
      .catch((e) => console.log(e));
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleCheckboxChange = (lno) => {
    const updatedSelLikeList = likeList.map((like) => {
      if (like.lno === lno) {
        return { ...like, selected: !like.selected };
      }
      return like;
    });
    setLikeList(updatedSelLikeList);
  };

  const handleSelectAll = () => {
    const updatedSelLikeList = likeList.map((like) => ({
      ...like,
      selected: !selectAll,
    }));
    setLikeList(updatedSelLikeList);
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    const selectedLikes = likeList.filter((like) => like.selected);
    console.log('선택된 항목:', selectedLikes);

    selectedLikes.forEach((like) => {
      const lDto = {
        id: like.id,
        contentid: like.contentid,
      };

      axios
        .post('/festival/likeDelete', lDto)
        .then((response) => {
          console.log('Like Delete Response:', response.data);
          getLikeList();
        })
        .catch((error) => {
          console.log('Error during Like Delete:', error);
        });
    });
  };

  return (
    <div className='likeList'>
      <h1 className='likeListTitle'>좋아요</h1>
      <div className='totalAndCheck'>
        <input type='checkbox' onChange={handleSelectAll} checked={selectAll} />
        <p>총 {pageMaker.total}건</p>
      </div>
      <hr className='likeListHr' />
      {likeList.map((like) => (
        <UserLike
          key={like.lno}
          lno={like.lno}
          title={like.title}
          contentid={like.contentid}
          firstimage={like.firstimage}
          selected={like.selected}
          onCheckboxChange={handleCheckboxChange}
        />
      ))}
      <div className='likeListBtn'>
        <button type='button' onClick={handleSelectAll}>
          전체선택
        </button>
        <button type='button' onClick={handleDeleteSelected}>
          삭제
        </button>
      </div>
      <Pagination pageMaker={pageMaker} handlePageChange={handlePageChange} />
    </div>
  );
}

export default LikeList;
