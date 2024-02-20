import './Main.css';
/* import Kakaomap from './Kakaomap'; */
import Search from '../festival/component/Search';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Festival from '../festival/component/Festival';
import Pagination from '../festival/component/Pagination';
import KMap from './KMap';
import Kakaomap from './Kakaomap';
function Main() {
  const { pageNum, keyword } = useParams();
  const [festivals, setFestivals] = useState([]);
  const [pageMaker, setPageMaker] = useState({});
  const [areaCode, setAreaCode] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getWindowWidth();
    fetchData();
    console.log('amount', amount);
  }, [pageNum, keyword, amount]);

  const getWindowWidth = () => {
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) <= 1000
      ? setAmount(10)
      : setAmount(9);
  };

  const fetchData = (page, key) => {
    setLoading(true);

    axios
      .get(`/festival/list`, {
        params: {
          pageNum: page || (pageNum ? parseInt(pageNum, 10) : 1),
          amount: amount,
          keyword: key || (keyword ? keyword : ''),
        },
      })
      .then((response) => {
        console.log(response.data.pageMaker);
        setFestivals(response.data.list);
        setPageMaker(response.data.pageMaker);
        setAreaCode(response.data.areaCode);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePageChange = (pageNum) => {
    const keyword = pageMaker.cri ? pageMaker.cri.keyword : '';
    console.log('pageNum1 : ', pageNum);
    console.log('keyword1 : ', keyword);
    fetchData(pageNum, keyword);
    navigate(`/festival/${pageNum}/${keyword}`);
  };

  const handleSearch = (page, keyword) => {
    fetchData(page, keyword);
    navigate(`/festival/${page}/${keyword}`);
  };
  //
  return (
    <div className='div'>
      <Search pageMaker={pageMaker} handleSearch={handleSearch}></Search>
      <p className='mapP'>* 현재 진행 중인 축제만 맵에 표시됩니다.</p>
      <KMap keyword={keyword}></KMap>
      {loading ? (
        <span>Loading...</span>
      ) : festivals.length > 0 ? (
        <div
          className={`festivals ${
            festivals.length === 1 ? 'singleFestival' : ''
          } ${festivals.length === 2 ? 'doubleFestival' : ''}`}
        >
          {festivals.map((festival) => (
            <Festival
              key={festival.contentid}
              contentid={festival.contentid}
              title={festival.title}
              eventstartdate={festival.eventstartdate}
              eventenddate={festival.eventenddate}
              addr1={festival.addr1}
              eventintro={festival.eventintro}
              eventtext={festival.eventtext}
              homepage={festival.homepage}
              agelimit={festival.agelimit}
              sponsor1={festival.sponsor1}
              sponsor1tel={festival.sponsor1tel}
              sponsor2={festival.sponsor2}
              sponsor2tel={festival.sponsor2tel}
              usetimefestival={festival.usetimefestival}
              playtime={festival.playtime}
              firstimage={festival.firstimage}
              firstimage2={festival.firstimage2}
              mapx={festival.mapx}
              mapy={festival.mapy}
              acode={festival.acode}
              scode={festival.scode}
              areaCode={areaCode}
            />
          ))}
        </div>
      ) : (
        <span>검색 결과가 없습니다.</span>
      )}
      <Pagination pageMaker={pageMaker} handlePageChange={handlePageChange} />
      <hr className='hr' />
    </div>
  );
}

export default Main;
