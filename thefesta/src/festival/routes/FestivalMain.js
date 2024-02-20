import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../component/Pagination';
import Festival from '../component/Festival';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Search from '../component/Search';
import './FestivalMain.css';
import Kakaomap from '../../main/Kakaomap';

function Main() {
  const { pageNum, keyword } = useParams();
  const [festivals, setFestivals] = useState([]);
  const [pageMaker, setPageMaker] = useState({});
  const [areaCode, setAreaCode] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [pageNum, keyword]);
  //
  const fetchData = (page, key) => {
    axios
      .get(`/festival/list`, {
        params: {
          pageNum: page || (pageNum ? parseInt(pageNum, 10) : 1),
          amount: 9,
          keyword: key || (keyword ? keyword : ''),
        },
      })
      .then((response) => {
        console.log(response.data.pageMaker);
        setFestivals(response.data.list);
        setPageMaker(response.data.pageMaker);
        setAreaCode(response.data.areaCode);
      })
      .catch((error) => console.log(error));
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

  return (
    <div className='body'>
      <Search pageMaker={pageMaker} handleSearch={handleSearch}></Search>
      <Kakaomap></Kakaomap>
      {festivals.length > 0 ? (
        <div>
          <div className='festivals'>
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
                acode={festival.acode}
                scode={festival.scode}
                areaCode={areaCode}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <span>Loading...</span>
        </div>
      )}
      <Pagination pageMaker={pageMaker} handlePageChange={handlePageChange} />
    </div>
  );
}

export default Main;
