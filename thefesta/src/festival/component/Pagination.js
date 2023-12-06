import './Pagination.css';

function Pagination({ pageMaker, handlePageChange }) {
  const pages = [];

  for (let num = pageMaker.startPage; num <= pageMaker.endPage; num++) {
    pages.push(
      <li
        key={num}
        className={`paginateBtn ${
          pageMaker.cri.pageNum === num ? 'active' : ''
        }`}
      >
        <button onClick={() => handlePageChange(num)}>{num}</button>
      </li>
    );
  }

  return (
    <div className='pagination'>
      <ul className='pagUl'>
        {pageMaker.prev && (
          <li className='paginateBtn previous'>
            <button
              onClick={() => handlePageChange(pageMaker.startPage - 1)}
            ></button>
          </li>
        )}

        {pages}

        {pageMaker.next && (
          <li className='paginateBtn next'>
            <button
              onClick={() => handlePageChange(pageMaker.endPage + 1)}
            ></button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
