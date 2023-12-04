import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import List from '../food/List';

function Detail({ contentid }) {    // {contentid} 추가
  const location = useLocation();

  const festival = { ...location.state };
  const [image, setImage] = useState([]);
  console.log('festival: ', festival);

  useEffect(() => {
    axios
      .get(`/festival/detail/${contentid}`, {  // festival.contentid 에서 바꿈
        params: {
          contentid    // contentid: festival.contentid, 에서 바꿈
        },
      })
      .then((res) => {
        setImage(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  // const fm = (item) => {
  //   const clean = item.replace(/(<([^>]+)>|홈페이지)/gi, '');
  //   return clean;
  // };

  return (
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
            <tbody>
              <tr>
                <th>축제명</th>
                <td>{festival.title}</td>
              </tr>
              <tr>
                <th>주소</th>
                <td>{(festival.addr1)}</td>
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
                    <Link to={(festival.homepage)}>
                      {(festival.homepage)}
                    </Link>
                  </td>
                </tr>
              )}
              {festival.sponsor1 && (
                <tr>
                  <th>주최자 정보</th>
                  <td>{(festival.sponsor1)}</td>
                </tr>
              )}
              {festival.sponsor1tel && (
                <tr>
                  <th>주최자 연락처</th>
                  <td>{(festival.sponsor1tel)}</td>
                </tr>
              )}
              {festival.sponsor2 && (
                <tr>
                  <th>주관사 정보</th>
                  <td>{(festival.sponsor2)}</td>
                </tr>
              )}
              {festival.sponsor2tel && (
                <tr>
                  <th>주관사 연락처</th>
                  <td>{(festival.sponsor2tel)}</td>
                </tr>
              )}
              {festival.agelimit && (
                <tr>
                  <th>관람가능연령</th>
                  <td>{(festival.agelimit)}</td>
                </tr>
              )}
              {festival.playtime && (
                <tr>
                  <th>축제시간</th>
                  <td>{(festival.playtime)}</td>
                </tr>
              )}
              {festival.usetimefestival && (
                <tr>
                  <th>이용요금</th>
                  <td>{(festival.usetimefestival)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>행사소개</th>
            </tr>
            <tr>
              {festival.eventintro && festival.eventintro !== 'null' && (
                <td>{(festival.eventintro)}</td>
              )}
            </tr>
            <tr>
              <th>행사내용</th>
            </tr>
            <tr>
              {festival.eventtext && festival.eventtext !== 'null' && (
                <td>{(festival.eventtext)}</td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
      <List contentid={festival.contentid} />   {/* 음식점 추천 리스트 */}
    </div>
  );
}

export default Detail;
