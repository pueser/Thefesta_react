import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagenation from "./Pagenation";

function Board() {
  const [boardList, setBoardList] = useState([]);
  const [curPage, setCurPage] = useState(1); //현재 페이지 세팅
  const [startPage, setStartPage] = useState(""); //startPage
  const [endPage, setEndPage] = useState(""); //endPage
  const [total, setTotal] = useState("")//list 총갯수
  const [next, setNext] = useState("")//이전 페이지
  const [prev, setPrev] = useState("")//다음 페이지
  const [amount, setAmount] = useState("10");//한 페이지당 보여질 list개수


  //게시판 종류(자유게시판, 리뷰게시판)
  const [bno, setBno] = useState("");
  //작성일자(yyyy.MM.dd)
  const [bregist, setBregist] = useState("");
  

  console.log("boardList = ", boardList)
  
  useEffect(
    ()=>{getBoardList()
  },[]);


    
  //회원 게시판 list 불러오기
  const getBoardList = async() =>{
    
    await axios
      .get(`http://localhost:9090/board/list?pageNum=${curPage}&amount=${amount}&type=${""}&keyword=${""}`)
        
      .then((response)=> {
        setBoardList(response.data)
        console.log(response.data)

        //게시판 종류 이름 지정 및 작성일자 변경(yyyy.MM.dd)
        response.data.list.forEach(element => {
          // console.log("element = ", element)
           if(element.bno === 1){
             setBno(...bno, {bno : 1, name: "자유게시판"})
           }else if(element.bno === 2){
             setBno(...bno, {bno : 2, name: "리뷰게시판"})
           }else{
             setBno(...bno, {bno : "삭제된 게시글 입니다", name: "삭제된 게시글 입니다"})
           }

           let newBregist = element.bregist.substr(0,10);
           setBregist(...bregist, newBregist);
        });


          setStartPage(response.data.pageMaker.startPage);
          setEndPage(response.data.pageMaker.endPage)
          setTotal(response.data.pageMaker.total);
          setNext(response.data.pageMaker.next)
          setPrev(response.data.pageMaker.prev)
      })

      .catch((error)=>{
        console.log("error", error)
      })
  }

    
  //게시글 삭제
  function deleteClick(data){

    //화면상 삭제된 게시글 안보이도록
    const deleteListArray = 
    boardList.list&&boardList.list.map((item)=>{
      if(item.bid === data) {
        return -1
      }else{   
        return item
      }
    }).filter((item) => item !== -1);
    setBoardList({list : deleteListArray, pageMaker : boardList.pageMaker})

    axios.post(`http://localhost:9090/board/remove?bid=${data}`, {
      }).then((response)=>{
        console.log(response);
        alert(data , "번 게시글이 삭제 되었습니다.")
        getBoardList()

      }).catch((error)=>{
        console.log(error)
        alert(data , "번 게시글 삭제 실패하였습니다.")
    })

    
  }
    
    //Pagenation에서 현재페이지 받기
    const curPageChange =(page) =>{
      setCurPage(page);
      console.log("넘겨받은 page = ", page)
      
      axios.get(`http://localhost:9090/board/list?pageNum=${page}&amount=${amount}&type=${""}&keyword=${""}`)
        
      .then((response)=> {
        setBoardList(response.data)
        console.log(response.data)

        setStartPage(response.data.pageMaker.startPage);
        setEndPage(response.data.pageMaker.endPage)
        setTotal(response.data.pageMaker.total);
        setNext(response.data.pageMaker.next)
        setPrev(response.data.pageMaker.prev)
      })
      .catch((error)=>{
        console.log("error", error)
      })
    }
    

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>게시판 종류</th>
              <th>게시글번호</th>
              <th>게시글제목</th>
              <th>작성자</th>
              <th>작성일자</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {
              boardList.list&&boardList.list.map(
                (item, idx)=>(
                  <tr key={idx}>
                    <td>{bno.name}</td>
                    <td>{item.bid}</td>
                    <td onClick={() => window.open(`/board/read?bid=${item.bid}`, '_blank')}>{item.btitle}</td>
                    <td>{item.id}</td>
                    <td>{bregist}</td>
                    <td><button onClick={()=>deleteClick(item.bid)}>삭제</button></td>
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