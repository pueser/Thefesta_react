import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagenation from "./Pagenation";
import '../css/Board.css';
import '../css/Table.css';
import '../css/Button.css';

function Board() {
  const [boardList, setBoardList] = useState([]);
  let newBoardList = [];
  const [curPage, setCurPage] = useState(1); //현재 페이지 세팅
  const [startPage, setStartPage] = useState(""); //startPage
  const [endPage, setEndPage] = useState(""); //endPage
  const [total, setTotal] = useState("")//list 총갯수
  const [next, setNext] = useState("")//이전 페이지
  const [prev, setPrev] = useState("")//다음 페이지
  const [amount, setAmount] = useState("10");//한 페이지당 보여질 list개수
  
  useEffect(
    ()=>{getBoardList()
  },[]);

  //회원 게시판 list 불러오기
  const getBoardList = async() =>{
    
    await axios
      .get(`http://localhost:9090/board/list?pageNum=${curPage}&amount=${amount}&type=${""}&keyword=${""}`)
        
      .then((response)=> {
        //setBoardList(response.data)
        console.log("response = ", response.data)

          //게시판 종류 이름 지정 및 작성일자 변경(yyyy.MM.dd)
          response.data.list.forEach(element=>{
            let code;
            let date = element.bregist.substr(0,10);

            if(element.bno === 1){
              code = "자유게시판";
              newBoardList.push({bno :code, bcontent : element.bcontent, bid: element.bid, bregist: date, btitle : element.btitle, id : element.id})
            }else if(element.bno === 2){
              code = "리뷰게시판";
              newBoardList.push({bno :code, bcontent : element.bcontent, bid: element.bid, bregist: date, btitle : element.btitle, id : element.id})
            }

            setBoardList(newBoardList)
          })

          setStartPage(response.data.pageMaker.startPage);
          setEndPage(response.data.pageMaker.endPage)
          setTotal(response.data.pageMaker.total);
          setNext(response.data.pageMaker.next)
          setPrev(response.data.pageMaker.prev)
          if(response.data.list.length!=10){
            document.getElementById("adminPagination").style.marginTop = ((10-(response.data.list.length%10))*42+75) + "px";
          }
          else{
            document.getElementById("adminPagination").style.marginTop = "75px";
          }
      })

      .catch((error)=>{
        console.log("error", error)
      })
  }

    
  //게시글 삭제
  function deleteClick(data){
    
    
    //화면상 삭제된 게시글 안보이도록
    const deleteListArray = 
    boardList&&boardList.map((item)=>{
      if(item.bid === data) {
        return -1
      }else{   
        return item
      }
    }).filter((item) => item !== -1);
    setBoardList(deleteListArray)

    axios.post(`http://localhost:9090/board/remove?bid=${data}`, {
      }).then((response)=>{
        console.log(response);
        alert(`${data}번 게시글이 삭제 되었습니다.`)
        getBoardList();

      }).catch((error)=>{
        console.log(error)
        alert("게시글 삭제 실패하였습니다.")
    })

    
  }
    
    //Pagenation에서 현재페이지 받기
    const curPageChange =(page) =>{
      setCurPage(page);
      
      axios.get(`http://localhost:9090/board/list?pageNum=${page}&amount=${amount}&type=${""}&keyword=${""}`)
        
      .then((response)=> {
        console.log("response",response.data)

        //게시판 종류 이름 지정 및 작성일자 변경(yyyy.MM.dd)
        response.data.list.forEach(element=>{
          console.log("element.bno = ", element.bno)
          let code;
          let date = element.bregist.substr(0,10);
          console.log("date=", date)
          
          if(element.bno === 1){
            code = "자유게시판";
            newBoardList.push({bno :code, bcontent : element.bcontent, bid: element.bid, bregist: date, btitle : element.btitle, id : element.id})
          }else if(element.bno === 2){
            code = "리뷰게시판";
            newBoardList.push({bno :code, bcontent : element.bcontent, bid: element.bid, bregist: date, btitle : element.btitle, id : element.id})
          }

          setBoardList(newBoardList)
        })

        setStartPage(response.data.pageMaker.startPage);
        setEndPage(response.data.pageMaker.endPage)
        setTotal(response.data.pageMaker.total);
        setNext(response.data.pageMaker.next)
        setPrev(response.data.pageMaker.prev)
        if(response.data.list.length!=10){
          document.getElementById("adminPagination").style.marginTop = ((10-(response.data.list.length%10))*42+75) + "px";
        }
        else{
          document.getElementById("adminPagination").style.marginTop = "75px";
        }
      })
      .catch((error)=>{
        console.log("error", error)
      })
    }
    
    return (
      <div className="adminMain">
        <table className="adminTable">
          <thead className="adminThead">
            <tr>
              <th>게시판 종류</th>
              <th id="adminBoardTd">게시글번호</th>
              <th>게시글제목</th>
              <th>작성자</th>
              <th>작성일자</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody className="adminTbody">
            {
              boardList&&boardList.map(
                (item, idx)=>(
                  <tr key={idx}>
                    <td id="adminBoardTd">{item.bno}</td>
                    <td>{item.bid}</td>
                    <td id="adminWindowCursor" onClick={() => window.open(`/board/read?bid=${item.bid}`, '_blank')}><span id="adminTableContentLength">{item.btitle}</span></td>
                    <td>{item.id}</td>
                    <td>{item.bregist}</td>
                    <td id="adminBtntd"><button onClick={()=>deleteClick(item.bid)} className="adminDelete-button">삭제</button></td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
        <div>
          <Pagenation
            page={curPage}
            startPage={startPage}
            endPage={endPage}
            curPageChange ={curPageChange}
            total = {total}
            next={next}
            prev ={prev}
            amount={amount}
          />
        </div>
      </div>
    );
  }
  
  export default Board;