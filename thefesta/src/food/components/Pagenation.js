import { useRef, useState, useEffect } from 'react';
import './Pagenation.css';

function Pagenation({ page, startPage, endPage, curPageChange, total, next, prev, amount }) {

    //페이지 클릭됫을때 색깔변경 변수
    const [clicked, setClicked] = useState(page);
    //페이지 리스트
    const tmpPages = [];

    const paginationLine = useRef(null)

    for (let i = startPage; i <= endPage; i++) {
        tmpPages.push(i);
    }

    //페이지 클릭했을 때
    function buttonClick(e) {
        e.preventDefault();
        curPageChange(e.target.value)
        setClicked(e.target.value)
    }


    //이전 페이지 클릭했을 때
    function prevbutton(e) {
        e.preventDefault();
        const prevPageGroup = startPage - 5;
        curPageChange(prevPageGroup);
        setClicked(prevPageGroup);

    }

    //다음 페이지 클릭했을 때
    function nextbutton(e) {
        e.preventDefault();
        const nextPageGroup = endPage + 1;
        curPageChange(nextPageGroup);
        setClicked(nextPageGroup);
    }

    useEffect(() => {
        console.log("handed over page : ", page);
        console.log("handed over clicked : ", clicked);
    }, []);

    return (
        <div id="foodPagination" ref={paginationLine}>
            {/* 이전 페이지 버튼 */}
            {prev ? (
                <input
                    type="button"
                    value="<"
                    onClick={prevbutton}
                    style={{ backgroundColor: 'white', color: 'black', marginLeft: '2px' }}
                />
            ) : null}

            {/* 페이지 버튼들 */}
            {tmpPages &&
                tmpPages.map((item, idx) => (
                    <input
                        type="button"
                        value={item}
                        key={idx}
                        onClick={buttonClick}
                        className={`${clicked == item ? 'active' : ''}`}
                    />
                ))}

            {/* 다음 페이지 버튼 */}
            {next ? (
                <input
                    type="button"
                    value=">"
                    onClick={nextbutton}
                    style={{ backgroundColor: 'white', color: 'black', marginLeft: '2px' }}
                />
            ) : null}

        </div>
    );
}

export default Pagenation;