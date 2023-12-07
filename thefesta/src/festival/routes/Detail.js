import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReplyList from '../component/ReplyList';
import Listfood from '../../food/Listfood';
import './Detail.css';

function Detail() {
  const location = useLocation();

  const festival = { ...location.state };
  const [image, setImage] = useState([]);

  useEffect(() => {
    axios
      .get(`/festival/detail/${festival.contentid}`, {
        params: {
          contentid: festival.contentid,
        },
      })
      .then((res) => {
        setImage(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const fm = (item) => {
    const clean = item.replace(/(<([^>]+)>|홈페이지)/gi, '');
    return clean;
  };

  return (
    <div className='body'>
      <div className='detail'>
        <div className='imgAndInfo'>
          {image.length > 0 ? (
            <div>
              {image.map((img, i) => (
                <img
                  key={i}
                  src={img.originimgurl}
                  title={festival.title}
                  alt={festival.title}
                  className='datailImg'
                />
              ))}
            </div>
          ) : (
            <div className='fImg fdfImg'></div>
          )}
          <div className='table'>
            <table>
              <tr>
                <th>축제명</th>
                <td>{festival.title}</td>
              </tr>
              <tr>
                <th>주소</th>
                <td>{fm(festival.addr1)}</td>
              </tr>
              <tr>
                <th>시작일</th>
                <td>{festival.startDate}</td>
              </tr>
              <tr>
                <th>종료일</th>
                <td>{festival.endDate}</td>
              </tr>
              {festival.homepage && (
                <tr>
                  <th>홈페이지</th>
                  <td>
                    <Link to={fm(festival.homepage)}>
                      {fm(festival.homepage)}
                    </Link>
                  </td>
                </tr>
              )}
              {festival.sponsor1 && (
                <tr>
                  <th>주최자 정보</th>
                  <td>{fm(festival.sponsor1)}</td>
                </tr>
              )}
              {festival.sponsor1tel && (
                <tr>
                  <th>주최자 연락처</th>
                  <td>{fm(festival.sponsor1tel)}</td>
                </tr>
              )}
              {festival.sponsor2 && (
                <tr>
                  <th>주관사 정보</th>
                  <td>{fm(festival.sponsor2)}</td>
                </tr>
              )}
              {festival.sponsor2tel && (
                <tr>
                  <th>주관사 연락처</th>
                  <td>{fm(festival.sponsor2tel)}</td>
                </tr>
              )}
              {festival.agelimit && (
                <tr>
                  <th>관람가능연령</th>
                  <td>{fm(festival.agelimit)}</td>
                </tr>
              )}
              {festival.playtime && (
                <tr>
                  <th>축제시간</th>
                  <td>{fm(festival.playtime)}</td>
                </tr>
              )}
              {festival.usetimefestival && (
                <tr>
                  <th>이용요금</th>
                  <td>{fm(festival.usetimefestival)}</td>
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
              {festival.eventintro && festival.eventintro !== 'null' && (
                <td>{fm(festival.eventintro)}</td>
              )}
            </tr>
            <tr>
              <th>행사내용</th>
            </tr>
            <tr>
              {festival.eventtext && festival.eventtext !== 'null' && (
                <td>{fm(festival.eventtext)}</td>
              )}
            </tr>
          </table>
        </div>
        <Listfood contentid={festival.contentid}></Listfood>
        <div className='bar'></div>
        <ReplyList contentid={festival.contentid}></ReplyList>
        <Link
          to='/QuestionRegister'
          state={{ contentid: festival.contentid, title: festival.title }}
        >
          축제 건의하기
        </Link>
      </div>
    </div>
  );
}

export default Detail;
