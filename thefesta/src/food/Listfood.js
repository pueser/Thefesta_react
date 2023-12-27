import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { json } from 'react-router-dom';
import Food from './components/Food';
import Pagenation from './components/Pagenation';
import './Listfood.css';

function Listfood({ contentid }) {
  const festaId = contentid;
  const [foods, setFoods] = useState([]);
  const [areacode, setAreacode] = useState('');
  const [showMoreFoods, setShowMoreFoods] = useState(
    localStorage.getItem('showMoreFoods') === 'true' || false
  );
  const [id, setId] = useState('');

  const [curPage, setCurPage] = useState(1); //현재 페이지 세팅
  const [startPage, setStartPage] = useState(''); //startPage
  const [endPage, setEndPage] = useState(''); //endPage
  const [total, setTotal] = useState(''); //list 총갯수
  const [next, setNext] = useState(''); //이전 페이지
  const [prev, setPrev] = useState(''); //다음 페이지
  const [amount, setAmount] = useState('15'); //한 페이지당 보여질 list개수

  // 회원 정보 가져오기
  const getUserInfo = () => {
    const loginInfo = Cookies.get('loginInfo');
    if (loginInfo) {
      try {
        const parsedLoginInfo = JSON.parse(decodeURIComponent(loginInfo));
        setId(parsedLoginInfo);
        console.log('id', parsedLoginInfo);
      } catch (error) {
        console.error('Error parsing loginInfo:', error);
      }
    }
  };

  // 음식점 목록 가져오기
  const getFoods = async () => {
    try {
      let url = `/food/list?contentid=${festaId}&pageNum=${curPage}&amount=${amount}`;

      if (id) {
        url += `&id=${id}`;
      }
      console.log('sendId', id);

      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP 오류 상태: ${response.status}`);
      }
      const data = await response.json();
      console.log('data', data);

      setFoods(data.recommendDTOList);
      console.log('recdto', data.recommendDTOList);
      setAreacode(data.areacodeDTO);

      setStartPage(data.pageMaker.startPage);
      setEndPage(data.pageMaker.endPage);
      setTotal(data.pageMaker.total);
      setNext(data.pageMaker.next);
      setPrev(data.pageMaker.prev);
    } catch (error) {
      console.error('데이터 가져오기 오류: ', error);
    }
  };

  //Pagenation에서 현재페이지 받기
  const curPageChange = async (page) => {
    console.log('page', page);
    setCurPage(page);
  };

  useEffect(() => {
    getUserInfo();
    getFoods();
  }, [id, curPage]);

  useEffect(() => {
    localStorage.setItem('showMoreFoods', showMoreFoods);
  }, [showMoreFoods]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      setShowMoreFoods(false); // 페이지를 떠날 때 상태를 초기화
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <section className='List-container'>
      <div className='List-foods'>
        <div className='List-food-container-top'>
          <h1 className='List-food-title'>
            축제와 함께 즐기는 {areacode.sname} 맛집
          </h1>
          <button
            className='List-food-button'
            onClick={() => setShowMoreFoods(!showMoreFoods)}
            title={showMoreFoods ? '숨기기' : '더보기'}
          >
            {showMoreFoods ? '▲' : '▼'}
          </button>
        </div>
        <div className='List-food-container-bottom'>
          {foods.slice(0, showMoreFoods ? foods.length : 3).map((food) => (
            <Food
              key={food.contentid}
              contentid={food.contentid}
              title={food.title}
              addr1={food.addr1}
              firstimage2={food.firstimage2}
            />
          ))}
        </div>
        {showMoreFoods && (
          <div>
            <Pagenation
              page={curPage}
              startPage={startPage}
              endPage={endPage}
              curPageChange={curPageChange}
              total={total}
              next={next}
              prev={prev}
              amount={amount}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Listfood;
