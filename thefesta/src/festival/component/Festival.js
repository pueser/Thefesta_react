import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Like from './Like';
import './Festival.css';
import Cookies from 'js-cookie';

function Festival({
  contentid,
  title,
  eventstartdate,
  eventenddate,
  addr1,
  eventintro,
  eventtext,
  homepage,
  agelimit,
  sponsor1,
  sponsor1tel,
  sponsor2,
  sponsor2tel,
  usetimefestival,
  playtime,
  firstimage,
  firstimage2,
  acode,
  scode,
  areaCode,
}) {
  const [fState, setFState] = useState('');
  const [fClass, setFClass] = useState('');
  //
  useEffect(() => {
    festivalState(eventstartdate, eventenddate);
  }, []);

  areaCode.map((code) => {
    if (acode === code.acode && scode === code.scode) {
      acode = code.aname;
      scode = code.scode === 1 ? '' : code.sname;
    }
  });

  const festivalState = (startdate, enddate) => {
    const start = Number(startdate);
    const end = Number(enddate);
    const today = new Date();
    const formattedDate = Number(
      `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`
    );

    if (start > formattedDate) {
      setFState('축제 예정');
      setFClass('festivalOngoing');
    } else if (end < formattedDate) {
      setFState('축제 종료');
      setFClass('festivalCompleted');
    } else {
      setFState('축제 진행 중');
      setFClass('festivalUpcoming');
    }
  };

  const festivalDate = (date) => {
    const y = date.substr(0, 4);
    const m = date.substr(4, 2);
    const d = date.substr(6, 2);

    const fDate = `${y}년 ${m}월 ${d}일`;

    return fDate;
  };
  const startDate = festivalDate(eventstartdate);
  const endDate = festivalDate(eventenddate);

  return (
    <div className='festival'>
      <Link
        to={`/festival/detail/${contentid}`}
        state={{
          contentid,
          title,
          startDate,
          endDate,
          addr1,
          eventintro,
          eventtext,
          homepage,
          agelimit,
          sponsor1,
          sponsor1tel,
          sponsor2,
          sponsor2tel,
          usetimefestival,
          playtime,
        }}
      >
        <div className='container'>
          <div className='festivalImg'>
            {firstimage ? (
              <img
                src={firstimage}
                title={title}
                alt={title}
                className='fImg'
              />
            ) : (
              <div className='fImg fdfImg'></div>
            )}
          </div>
        </div>
        <div>
          <div className='titleAndState'>
            <h1>{title}</h1>
            <strong className={fClass}>{fState}</strong>
          </div>
          <h2>
            {startDate} - {endDate}
          </h2>
          <h2>
            {acode} {scode}
          </h2>
        </div>
      </Link>
      <Like contentid={contentid}></Like>
    </div>
  );
}

export default Festival;
