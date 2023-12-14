import { useRef, useState } from 'react';
import '../css/Pagination.css';

function Pagenation({page, startPage, endPage, curPageChange, total, next, prev, amount}){
    console.log("넘겨받은 페이지 = ", page)

    //페이지 클릭됫을때 색깔변경 변수
    const [clicked, setClicked] = useState(page);
    //페이지 리스트
    const tmpPages = [];

    const paginationLine = useRef(null)

    for (let i = startPage; i <= endPage; i++) {
        tmpPages.push(i);
    }

    //페이지 클릭했을 때
    function buttonClick(e){
        e.preventDefault();
        curPageChange(e.target.value)
        setClicked(e.target.value)
    }

    //이전 페이지 클릭했을 때
    function prevbutton(e){
        e.preventDefault();
        curPageChange(Number(page) - 1);
        setClicked(Number(page) - 1);
        
    }

    //다음 페이지 클릭했을 때
    function nextbutton(e){
        e.preventDefault();
        curPageChange(Number(page) + 1);
        setClicked(Number(page) + 1)
    }

    //맨 처음페이지 이동
    function startbutton(e){
        e.preventDefault();
        curPageChange(1);
        setClicked(1)
    }

    //맨 끝페이지 이동
    function endbutton(e){
        e.preventDefault();
        curPageChange(Math.ceil(total/amount));
        setClicked(Math.ceil(total/amount));
    }
    console.log("넘겨받은 clicked = ", clicked)
    return(
        <div  id="adminPagination" ref={paginationLine}>
            {
                prev === true ? <input type="button" value="<<" onClick={startbutton} style={{ backgroundColor: 'white', color: 'black', marginLeft: '5px' }}/> : null
            }
            {
                prev === true ? <input type="button" value="<" onClick={prevbutton} style={{ backgroundColor: 'white', color: 'black', marginLeft: '5px' }}/> : null
            }
            {
              tmpPages&&tmpPages.map(
                (item, idx)=>(
                    <input type="button" value={item}  key={idx} onClick={buttonClick} className={`${clicked == item? 'active': ''}`} />
                )
              )
            }
            {
                next === true ? <input type="button" value=">" onClick={nextbutton} style={{ backgroundColor: 'white', color: 'black', marginLeft: '5px' }}/> : null
                
            }
            {
                next === true ? <input type="button" value=">>" onClick={endbutton} style={{ backgroundColor: 'white', color: 'black', marginLeft: '5px' }}/> : null
            }
        </div>
    );
}

export default Pagenation;