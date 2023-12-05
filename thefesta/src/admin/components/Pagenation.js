
function Pagenation({page, startPage, endPage, curPageChange, total, next, prev, amount}){
    //페이지 리스트
    const tmpPages = [];
    if((Math.ceil(total/amount))-1 === endPage){
        endPage = (Math.ceil(total/amount))
         for (let i = startPage; i <= endPage; i++) {
             tmpPages.push(i);
        }
    }else{
        for (let i = startPage; i <= endPage; i++) {
            tmpPages.push(i);
        }
    }

    //페이지 클릭했을 때
    function buttonClick(e){
        e.preventDefault();
        let value = e.target.value;
        curPageChange(e.target.value)

    }

    //이전 페이지 클릭했을 때
    function prevbutton(e){
        e.preventDefault();
        curPageChange(Number(page) - 1);
    }

    //다음 페이지 클릭했을 때
    function nextbutton(e){
        e.preventDefault();
        curPageChange(Number(page) + 1);
    }

    //맨 처음페이지 이동
    function startbutton(e){
        e.preventDefault();
        curPageChange(1);
    }

    //맨 끝페이지 이동
    function endbutton(e){
        e.preventDefault();
        curPageChange(Math.ceil(total/amount));
    }

    return(
        <div>
            {
                prev === true ? <input type="button" value="<<" onClick={startbutton} /> : null
            }
            {
                prev === true ? <input type="button" value="<" onClick={prevbutton} /> : null
            }
            {
              tmpPages&&tmpPages.map(
                (item, idx)=>(
                    <input type="button" value={item}  key={idx} onClick={buttonClick}/>
                )
              )
            }
            {
                next === true ? <input type="button" value=">" onClick={nextbutton} /> : null
                
            }
            {
                next === true ? <input type="button" value=">>" onClick={endbutton} /> : null
            }
        </div>
    );
}
export default Pagenation;