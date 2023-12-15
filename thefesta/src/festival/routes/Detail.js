import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ReplyList from '../component/ReplyList';
import './Detail.css';
import Cookies from 'js-cookie';
import Listfood from '../../food/Listfood';
import SimpleSlider from '../component/SimpleSlider';

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { contentid } = useParams();

  const festival = { ...location.state };
  const [image, setImage] = useState([]);
  const [festivalInfo, setFestivalInfo] = useState({});

  useEffect(() => {
    axios
      .get(`/festival/detail/${festival.contentid}`, {
        params: {
          contentid: festival.contentid,
        },
      })
      .then((res) => {
        setImage(res.data.fiList);
        setFestivalInfo(res.data.fDto);
      })
      .catch((e) => console.log(e));
  }, []);

  const fm = (item) => {
    if (item) {
      const clean = item.replace(/(<([^>]+)>|홈페이지)/gi, '');
      return clean;
    }
    return '';
  };

  const onClickIsLogin = (e) => {
    e.preventDefault();
    const loginInfo = Cookies.get('loginInfo');

    if (loginInfo) {
      navigate('/admin/festaQuestionRegister', {
        state: {
          contentid: festival.contentid,
          title: festival.title ? festival.title : festivalInfo.title,
        },
      });
    } else {
      alert('로그인 후 이용 가능합니다.');
    }
  };

  const festivalDate = (date) => {
    if (date) {
      const y = date.substr(0, 4);
      const m = date.substr(4, 2);
      const d = date.substr(6, 2);

      const fDate = `${y}년 ${m}월 ${d}일`;

      return fDate;
    }

    return '';
  };
  const startDate = festivalInfo
    ? festivalDate(festivalInfo.eventstartdate)
    : '';
  const endDate = festivalInfo ? festivalDate(festivalInfo.eventenddate) : '';

  return (
    <div className='body'>
      <div className='detail'>
        <div className='imgAndInfo'>
          <SimpleSlider images={image} />
          <div className='table'>
            <table>
              {(festival.title || (festivalInfo && festivalInfo.title)) && (
                <tr>
                  <th>축제명</th>
                  <td>{festival.title || festivalInfo.title}</td>
                </tr>
              )}
              {(festival.addr1 || (festivalInfo && festivalInfo.addr1)) && (
                <tr>
                  <th>주소</th>
                  <td>{fm(festival.addr1) || fm(festivalInfo.addr1)}</td>
                </tr>
              )}
              {(festival.startDate ||
                (festivalInfo && festivalInfo.eventstartdate)) && (
                <tr>
                  <th>시작일</th>
                  <td>
                    {festival.startDate ||
                      festivalDate(festivalInfo.eventstartdate)}
                  </td>
                </tr>
              )}
              {(festival.endDate ||
                (festivalInfo && festivalInfo.eventenddate)) && (
                <tr>
                  <th>종료일</th>
                  <td>
                    {festival.endDate ||
                      festivalDate(festivalInfo.eventenddate)}
                  </td>
                </tr>
              )}
              {(festival.homepage ||
                (festivalInfo && festivalInfo.homepage)) && (
                <tr>
                  <th>홈페이지</th>
                  <td>
                    <a
                      href={fm(festival.homepage || festivalInfo.homepage)}
                      target='_blank'
                    >
                      {fm(festival.homepage || festivalInfo.homepage)}
                    </a>
                  </td>
                </tr>
              )}
              {(festival.sponsor1 ||
                (festivalInfo && festivalInfo.sponsor1)) && (
                <tr>
                  <th>주최자 정보</th>
                  <td>{fm(festival.sponsor1 || festivalInfo.sponsor1)}</td>
                </tr>
              )}
              {(festival.sponsor1tel ||
                (festivalInfo && festivalInfo.sponsor1tel)) && (
                <tr>
                  <th>주최자 연락처</th>
                  <td>
                    {fm(festival.sponsor1tel || festivalInfo.sponsor1tel)}
                  </td>
                </tr>
              )}
              {(festival.sponsor2 ||
                (festivalInfo && festivalInfo.sponsor2)) && (
                <tr>
                  <th>주관사 정보</th>
                  <td>{fm(festival.sponsor2 || festivalInfo.sponsor2)}</td>
                </tr>
              )}
              {(festival.sponsor2tel ||
                (festivalInfo && festivalInfo.sponsor2tel)) && (
                <tr>
                  <th>주관사 연락처</th>
                  <td>
                    {fm(festival.sponsor2tel || festivalInfo.sponsor2tel)}
                  </td>
                </tr>
              )}
              {(festival.agelimit ||
                (festivalInfo && festivalInfo.agelimit)) && (
                <tr>
                  <th>관람가능연령</th>
                  <td>{fm(festival.agelimit || festivalInfo.agelimit)}</td>
                </tr>
              )}
              {(festival.playtime ||
                (festivalInfo && festivalInfo.playtime)) && (
                <tr>
                  <th>축제시간</th>
                  <td>{fm(festival.playtime || festivalInfo.playtime)}</td>
                </tr>
              )}
              {(festival.usetimefestival ||
                (festivalInfo && festivalInfo.usetimefestival)) && (
                <tr>
                  <th>이용요금</th>
                  <td>
                    {fm(
                      festival.usetimefestival || festivalInfo.usetimefestival
                    )}
                  </td>
                </tr>
              )}
            </table>
          </div>
        </div>
        <div className='table2'>
          <table>
            <tr>
              <th>행사소개</th>
            </tr>
            <tr>
              {((festival.eventintro && festival.eventintro !== 'null') ||
                (festivalInfo &&
                  festivalInfo.eventintro &&
                  festivalInfo.eventintro !== 'null')) && (
                <td>{fm(festival.eventintro || festivalInfo.eventintro)}</td>
              )}
            </tr>
            <tr>
              <th>행사내용</th>
            </tr>
            <tr>
              {((festival.eventtext && festival.eventtext !== 'null') ||
                (festivalInfo &&
                  festivalInfo.eventtext &&
                  festivalInfo.eventtext !== 'null')) && (
                <td>{fm(festival.eventtext || festivalInfo.eventtext)}</td>
              )}
            </tr>
          </table>
        </div>
        <Listfood contentid={festival.contentid}></Listfood>
        <div className='bar'></div>
        <ReplyList contentid={festival.contentid}></ReplyList>
        <div className='festivalReport'>
          <Link to='/admin/festaQuestionRegister' onClick={onClickIsLogin}>
            축제 건의하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Detail;
