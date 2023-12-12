import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagenation from "./Pagenation";

function Question (){
    const {contentid} = useParams();
    const [questList, setQuestionList] = useState([]);
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
        
    //건의 list 불러오기
    const getBoardList = async() =>{
    
    await axios
        .get(`http://localhost:9090/admin/questionList?pageNum=${curPage}&amount=${amount}&contentid=${contentid}`)
        
        .then((response)=> {
        console.log("response", response.data)
        setQuestionList(response.data);

        setStartPage(response.data.pageMaker.startPage);
        setEndPage(response.data.pageMaker.endPage)
        setTotal(response.data.pageMaker.total);
        setNext(response.data.pageMaker.next)
        setPrev(response.data.pageMaker.prev)
        if(response.data.list.length!=10){
          document.getElementById("adminPagination").style.marginTop = ((10-(response.data.list.length%10))*42+34) + "px";
        }
        else{
          document.getElementById("adminPagination").style.marginTop = "34px";
        }
        })

        .catch((error)=>{
        console.log("error", error)
        })
    }

  //Pagenation에서 현재페이지 받기
  const curPageChange =(page) =>{
    console.log("page", page)
    setCurPage(page);
    axios.get(`http://localhost:9090/admin/questionList?pageNum=${page}&amount=${amount}&contentid=${contentid}`)
      
      .then((response)=> {
        console.log("setReportList", response.data)
        //alert("list 불러오기 성공")
        setQuestionList(response.data);

        setStartPage(response.data.pageMaker.startPage);
        setEndPage(response.data.pageMaker.endPage)
        setTotal(response.data.pageMaker.total);
        setNext(response.data.pageMaker.next)
        setPrev(response.data.pageMaker.prev)
        if(response.data.list.length!=10){
          document.getElementById("adminPagination").style.marginTop = ((10-(response.data.list.length%10))*42+34) + "px";
        }
        else{
          document.getElementById("adminPagination").style.marginTop = "34px";
        }
        
      })
      .catch((error)=>{
        console.log("error", error)
        //alert("list 불러오기 실패")
      })
  }


  //확인 눌렀을 때
  const deleteClick = (data)=>{

   
   //화면상 확인된 건의글 안보이도록
   const deleteListArray = 
   questList.list&&questList.list.map((item)=>{
     if(item.questionid === data) {
       return -1
     }else{   
       return item
     }
   }).filter((item) => item !== -1);
   setQuestionList({list : deleteListArray, pageMaker : questList.pageMaker})

    axios.post(`http://localhost:9090/admin/questionDelete?questionid=${data}`, {
      }).then((response)=>{
        console.log(response);
        alert(`${response.data}번 건의글이 확인되었습니다`)
        getBoardList();

      }).catch((error)=>{
        console.log(error)
        alert("건의글 확인이 실패하였습니다. 해당 업체에 문의 바랍니다.")
    })
    
  }

    return(
      <div className="adminMain">
      <div className="adminDetailOut" style={{textAlign: 'right'}}><Link to='/festa' className="adminLinkBtn">X</Link></div> 
          <table className="adminTable">
            <thead className="adminThead">
              <tr>
                <th>건의 번호</th>
                <th>건의 내용</th>
                <th>작성자</th>
                <th>작성일자</th>
                <th>확인</th>
              </tr>
            </thead>
            <tbody className="adminTbody">
              {
                questList.list&&questList.list.map(
                  (item, idx)=>(
                    <tr key={idx}>
                      <td>{item.questionid}</td>
                      <td><Link to={{ pathname:`/QuestionDetail/${item.contentid}`}} state ={{questioncontent: item.questioncontent, questionid : item.questionid}}   className="adminLinkBtn" id="adminTableContentLength">{item.questioncontent}</Link></td>
                      <td>{item.id}</td>
                      <td>{item.questiondate}</td>
                      <td id="adminBtntd2"><button onClick={()=>deleteClick(item.questionid)} className="adminApprove-button">확인</button></td>
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

export default Question;