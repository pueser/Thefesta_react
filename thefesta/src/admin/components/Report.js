import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagenation from "./Pagenation";
import '../css/Table.css';
import '../css/Button.css';

function Report() {
  //신고내용 저장 useState
  const [reportList, setReportList] = useState([]);
  const [curPage, setCurPage] = useState(1); //현재 페이지 세팅
  const [startPage, setStartPage] = useState(""); //startPage
  const [endPage, setEndPage] = useState(""); //endPage
  const [total, setTotal] = useState("")//list 총갯수
  const [next, setNext] = useState("")//이전 페이지
  const [prev, setPrev] = useState("")//다음 페이지
  const [amount, setAmount] = useState("10");//한 페이지당 보여질 list개수

  useEffect(
    ()=>{getReportList()
    },[]);
  
  //회원 list 불러오기
  const getReportList = async() =>{
   console.log("curPage", curPage)
    await axios
        .get(`http://localhost:9090/admin/reportList?pageNum=${curPage}&amount=${amount}`)
        
        .then((response)=> {
          setReportList(response.data)
          console.log("setReportList", response.data)

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
          //alert("list 불러오기 실패")
        })
  }
  
  //Pagenation에서 현재페이지 받기
  const curPageChange =(page) =>{
    setCurPage(page);
    console.log("넘겨받은 page = ", page)
    
    axios.get(`http://localhost:9090/admin/reportList?pageNum=${page}&amount=${amount}`)
      
    .then((response)=> {
      setReportList(response.data)
      console.log(response.data)

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
  console.log("reportList", reportList);


  //승인버튼 누를때
  function approveClick(data){

    const deleteListArray = 
    reportList.list&&reportList.list.map((item)=>{
      if(item.reportid === data) {
        return -1
      }else{   
        return item
      }
    }).filter((item) => item !== -1);
    setReportList({list : deleteListArray, pageMaker : reportList.pageMaker})
    
    axios.post(`http://localhost:9090/admin/reportstateChange?reportid=${data}`, {
    }).then((response)=>{
        console.log(response);
        alert(`${response.data}번 승인 되었습니다. 해당 회원 상세페이지에서 확인 가능 합니다.`)
        getReportList();

    }).catch((error)=>{
        console.log(error)
        alert("승인이 되지 않았습니다. 해당 업체에 문의 바랍니다.")
    })
 
  }

  

  //반려버튼 누를때
  const deleteClick =(data) =>{
    const deleteListArray = 
    reportList.list&&reportList.list.map((item)=>{
      if(item.reportid === data) {
        return -1
      }else{   
        return item
      }
    }).filter((item) => item !== -1);
    setReportList({list : deleteListArray, pageMaker : reportList.pageMaker})
    
    console.log("반려 reportList", reportList)
    axios.post(`http://localhost:9090/admin/memberReportDelete?reportid=${data}`, {
    }).then((response)=>{
        console.log(response);
        alert(`${response.data}번 반려 되었습니다`)
        getReportList();


    }).catch((error)=>{
        console.log(error)
        alert("승인이 되지 않았습니다. 해당 업체에 문의 바랍니다.")
        
    })
  }  
  
  return (
    <div className="adminMain">
      <table className="adminTable">
        <thead className="adminThead">
          <tr>
            <th>신고번호</th>
            <th>신고내용</th>
            <th>신고자</th>
            <th>신고대상</th>
            <th>신고일자</th>
            <th>승인 / 반려</th>
          </tr>
        </thead>
        <tbody className="adminTbody">
          {
            reportList.list&&reportList.list.map(
              (item, idx)=>(
                <tr key={idx}>
                  <td className="adminTableTr">{item.reportid}</td>
                  <td><Link to={{ pathname:`/admin/reportDetail/${item.reportid}`}} className="adminLinkBtn" id="adminTableContentLength">{item.reportcontent}</Link></td>
                  <td>{item.reporter}</td>
                  <td>{item.reportnumber}</td>
                  <td>{item.reportdate}</td>
                  <td id="adminBtntd">
                    <button onClick={()=>approveClick(item.reportid)} className="adminApprove-button">승인</button>
                    <button onClick={()=>deleteClick(item.reportid)} className="adminDelete-button">반려</button>
                  </td>
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
  export default Report;