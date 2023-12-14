import './UserLike.css';
import { Link } from 'react-router-dom';

function UserLike({
  lno,
  title,
  contentid,
  firstimage,
  selected,
  onCheckboxChange,
}) {
  return (
    <>
      <div className='userLike'>
        <input
          type='checkbox'
          onChange={() => onCheckboxChange(lno)}
          checked={selected}
        />
        <Link
          to={`/festival/detail/${contentid}`}
          state={{ contentid: contentid }}
        >
          <div className='userLiketInfo'>
            <img src={firstimage}></img>
            <h1>{title}</h1>
          </div>
        </Link>
      </div>
      <hr className='userLikeHr' />
    </>
  );
}

export default UserLike;
