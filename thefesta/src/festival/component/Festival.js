import { Link } from 'react-router-dom';

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
  areaCode
}) {
  areaCode.map((code) => {
    if (acode === code.acode && scode === code.scode) {
      acode = code.aname;
      scode = code.scode === 1 ? '' : code.sname;
    }
  });

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
    <div>
      <div className='festival'>
        <Link
          to={`/festival/detail/${contentid}`}    // '/festival/ 추가~
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
            <h1>{title}</h1>
            <h2>
              {startDate} - {endDate}
            </h2>
            <h2>
              {acode} {scode}
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Festival;