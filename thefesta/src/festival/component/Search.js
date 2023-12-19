import { useState } from 'react';
import './Search.css';

function Search({ pageMaker, handleSearch }) {
  const [keyword, setKeyword] = useState('');

  const pageNum = pageMaker.cri ? pageMaker.cri.pageNum : 1;
  const amount = pageMaker.cri ? pageMaker.cri.amount : 9;

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const onClickSearch = (e) => {
    e.preventDefault();

    if (keyword.length === 0) {
      alert('검색어를 입력해 주세요.');
    } else {
      handleSearch(1, keyword);
    }
  };

  return (
    <div className='search'>
      <form method='get' action='/festival/list' className='searchForm'>
        <input
          type='text'
          name='keyword'
          placeholder='검색어를 입력하세요'
          value={keyword}
          onChange={handleKeyword}
          className='searchInput'
        />
        <input type='hidden' name='pageNum' value={pageNum} />
        <input type='hidden' name='amount' value={amount} />
        <button
          type='submit'
          onClick={onClickSearch}
          className='searchBtn'
        ></button>
      </form>
    </div>
  );
}

export default Search;
