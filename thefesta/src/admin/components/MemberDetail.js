import axios from "axios";
import * as ReactDOM from 'react-dom/client';
import React, { Component, createContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigation, useParams } from "react-router-dom";
import MemberSelectBox from "./MemberSelectBox";
import Pagenation from "./Pagenation";
import Member from "./Member";
import App from "../../App";
import { useNavigate } from "react-router-dom";



function MemberDetail(){
   
  
  //member(부모 컴포넌트)에서 값(아이디, statecode) 전달 받음
  const {id} = useParams();
  const location = useLocation();
  const statecode = location.state.statecode
  const finalaccess = location.state.finalaccess
  const reportnum = location.state.reportnum
  const [curPage, setCurPage] = useState(1); //현재 페이지 세팅
  const [startPage, setStartPage] = useState(""); //startPage
  const [endPage, setEndPage] = useState(""); //endPage
  const [total, setTotal] = useState("")//list 총갯수
  const [next, setNext] = useState("")//이전 페이지
  const [prev, setPrev] = useState("")//다음 페이지
  const [amount, setAmount] = useState("10");//한 페이지당 보여질 list개수
  const navigate = useNavigate();
  let userData = []; // 회원 상태코드변경 
  let newMemberList =[]; //회원 신고대상 및 상태코드(0번일 때)

  
  


  console.log("location statecode",statecode)
  console.log("location reportnum",reportnum)

  //회원 상세페이지 정보 저장 useState
  const [memberDetail, setMemberDetail] = useState([]);
  //상태코드 변경값 저장 useState
  const [statecodeChange, setStatecodeChange] = useState(statecode);
  const message = "회원의 현재 신고 누적 갯수가 4회 입니다. 한 번더 승인하시면 회원은 강퇴 처리되며 남은 신고들은 삭제됩니다. 승인 하시겠습니까?";

  
  
  useEffect(
      ()=>{
        getMemberrDetail()
        
  },[]);
  
  //회원 상세페이지 get
  const getMemberrDetail = async() =>{
  await axios
      .get(`http://localhost:9090/admin/memberDetail?id=${id}&pageNum=${curPage}&amount=${amount}`)
      
      .then((response)=> {
        console.log("response", response)

        response.data.list.forEach(element=>{
          
            //회원 신고 대상
            if(element.rfrno > 0 && element.rbid === 0 && element.rbrno === 0){  //축제댓글
              newMemberList.push({ finalaccess: element.finalaccess, reportcontent: element.reportcontent, reportdate : element.reportdate
                ,reported : element.reported, reporter : element.reporter, reportid : element.reportid, reportnumber : "축제 댓글 코드"})
            }else if(element.rfrno === 0 && element.rbid >0 && element.rbrno === 0){ //게시글
              newMemberList.push({finalaccess: element.finalaccess, reportcontent: element.reportcontent, reportdate : element.reportdate
                ,reported : element.reported, reporter : element.reporter, reportid : element.reportid, reportnumber : "게시글 코드"})
            }else if(element.rfrno === 0 && element.rbid === 0 && element.rbrno >0){//게시글 댓글
              newMemberList.push({finalaccess: element.finalaccess, reportcontent: element.reportcontent, reportdate : element.reportdate
                ,reported : element.reported, reporter : element.reporter, reportid : element.reportid, reportnumber : "게시글 댓글 코드"})
            }
          
          setMemberDetail(newMemberList)
        })
      
        setStartPage(response.data.pageMaker.startPage);
        setEndPage(response.data.pageMaker.endPage)
        setTotal(response.data.pageMaker.total);
        setNext(response.data.pageMaker.next)
        setPrev(response.data.pageMaker.prev)

        if(response.data.list.length!=10){
          document.getElementById("adminPagination").style.marginTop = ((10-(response.data.list.length%10))*42+20) + "px";
        }
        else{
          document.getElementById("adminPagination").style.marginTop = "20px";
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
    
     axios.get(`http://localhost:9090/admin/memberDetail?id=${id}&pageNum=${page}&amount=${amount}`)
      
      .then((response)=> {
        console.log("MEmberDetail response", response)
        
        response.data.list.forEach(element=>{
          
          //회원 신고 대상
          if(element.rfrno > 0 && element.rbid === 0 && element.rbrno === 0){  //축제댓글
            newMemberList.push({finalaccess: element.finalaccess, reportcontent: element.reportcontent, reportdate : element.reportdate
              ,reported : element.reported, reporter : element.reporter, reportid : element.reportid, reportnumber : "축제 댓글 코드"})
          }else if(element.rfrno === 0 && element.rbid > 0 && element.rbrno === 0){ //게시글
            newMemberList.push({finalaccess: element.finalaccess, reportcontent: element.reportcontent, reportdate : element.reportdate
              ,reported : element.reported, reporter : element.reporter, reportid : element.reportid, reportnumber : "게시글 코드"})
          }else if(element.rfrno === 0 && element.rbid === 0 && element.rbrno > 0){//게시글 댓글
            newMemberList.push({ finalaccess: element.finalaccess, reportcontent: element.reportcontent, reportdate : element.reportdate
              ,reported : element.reported, reporter : element.reporter, reportid : element.reportid, reportnumber : "게시글 댓글 코드"})
          }
          setMemberDetail(newMemberList)
        })

        
        setStartPage(response.data.pageMaker.startPage);
        setEndPage(response.data.pageMaker.endPage)
        setTotal(response.data.pageMaker.total);
        setNext(response.data.pageMaker.next)
        setPrev(response.data.pageMaker.prev)

        if(response.data.list.length!=10){
          document.getElementById("adminPagination").style.marginTop = ((10-(response.data.list.length%10))*42+20) + "px";
        }
        else{
          document.getElementById("adminPagination").style.marginTop = "20px";
        }
        
      })
      .catch((error)=>{
        console.log("error", error)
        //alert("list 불러오기 실패")
      })
  }

  //MemberSelectBox(하위 컴포넌트)에서 값 전달 받음
  function StateChange(stateValue){
    console.log("셀렉트박스 전달 받은 값 = ", stateValue)
    if(stateValue === "일반"){
      setStatecodeChange("일반");
    }else if(stateValue === "탈퇴"){
      setStatecodeChange("탈퇴");
    }else if(stateValue === "재가입 가능"){
      setStatecodeChange("재가입 가능");
    }else if(stateValue === "강퇴"){
      setStatecodeChange("강퇴");
    }
  }

  //저장 눌렀을 때
  //회원 상태코드 변경 및  (회원 controller)
  const SaveClick =  (e) => {
    e.preventDefault();
    console.log("저장 statecodeChange", statecodeChange)
    let newStatecode = null;
    if(statecodeChange  === "일반"){
      console.log("if문 타기")
      newStatecode = "1";
    }else if(statecodeChange === "탈퇴"){
      newStatecode = "2";
    }else if(statecodeChange === "재가입 가능"){
      newStatecode = "3";
    }else if(statecodeChange === "강퇴"){
      newStatecode = "4";
    }
    console.log("id", id)
    console.log("statecode", newStatecode)
    userData = ({id : id, statecode : newStatecode})
    
    axios.post('http://localhost:9090/member/updateState', userData
      
      ).then((response) => {
          console.log(response.data[0])
          alert("변경사항이 저장되었습니다.")
          
      })
      .catch((error)=>{
      console.log(error.data[0])
      alert("변경사항이 저장에 실패하였습니다.")
    })
  }

  


//승인 버튼 누렀을 때 alert 창
const confirmAction = (data) => {
  if (window.confirm(message)) {
    noConfirm(data);
  } else {
    alert("승인이 취소되었습니다.")
    return;
  }
};












// const container = document.getElementById('adminroot')


//회원 승인 버튼 눌렀을 때(신고누적 4회)
const noConfirm = (data) =>{
  axios.post(`http://localhost:9090/admin/memberReportnumCnt?id=${data.reported}&reportid=${data.reportid}`, {
  }).then((response)=> {
    console.log("response", response.data)
    alert(`${response.data}번 신고글이 승인 되었습니다.`)
    
    // ReactDOM.createRoot(container).render(<BrowserRouter><MemberDetail/></BrowserRouter>);
    navigate(-1);


  }).catch((error)=>{
    console.log("error", error.data)
    alert("신고글이 승인 되지 않았습니다. 해당 업체에 문의바랍니다.")
  })
}


//회원 승인 버튼 눌렀을 때(신고누적 4회 이상X)
const onConfirm = (data) => {
  console.log(" onConfirm data = ", data)
  console.log(" onConfirm memberDetail" , memberDetail)
  const deleteListArray = 
  memberDetail&&memberDetail.map((item)=>{
    if(item.reportid === data.reportid) {
      return -1
    }else{   
      return item
    }
  }).filter((item) => item !== -1);
  setMemberDetail(deleteListArray)

  axios.post(`http://localhost:9090/admin/memberReportnumCnt?id=${data.reported}&reportid=${data.reportid}`, {
  }).then((response)=> {
    alert(`${response.data}번 신고글이 승인 되었습니다.`)
    getMemberrDetail();
    

  }).catch((error)=>{
    console.log("error", error.data)
    alert("신고글이 승인 되지 않았습니다. 해당 업체에 문의바랍니다.")
  })
}

//승인버튼 누를때
const approveClick = (data)=>{
  console.log("data = ", data)
  //setText("Y")
   console.log("승인 data.reported = ", data.reported);
  axios.get(`http://localhost:9090/admin/memberReportnumRead?reportid=${data.reportid}&id=${data.reported}`, {
    }).then((response)=> {

      console.log("response = ", response.data)

      //회원 reportnum이 4회인 경우 alert(확인 or 취소)
      if(response.data === 4){
        confirmAction(data);
      }else{
        onConfirm(data);
      }

      alert(response.data)
      
      
      
    }).catch((error)=>{
      console.log("error", error.data)
      alert(error.data)
    })
}

  
  //신고글 삭제
  function deleteClick(data){
    console.log("삭제할 reportid = ", data)

    const deleteListArray = 
    memberDetail.list&&memberDetail.list.map((item)=>{
      if(item.reportid === data) {
        return -1
      }else{   
        return item
      }
    }).filter((item) => item !== -1);
    setMemberDetail({list : deleteListArray, pageMaker : memberDetail.pageMaker})
      
      axios.post(`http://localhost:9090/admin/memberReportDelete?reportid=${data}`, {
        }).then((response)=>{
          console.log(response);
          alert(response.data)
  
        }).catch((error)=>{
          console.log(error)
          alert(error.data)
      })
  }
  console.log("setMemberDetail = ", memberDetail)
  return(
    <div className="adminMain" style={{marginBottom: '12px', marginTop: '20px'}} id="adminroot">
      <div className="adminDetailMemeberDisplay">
          <div className="adminDetailReportLeft">
              <div style={{textAlign: 'left' ,marginBottom: '5px'}}><span style={{fontWeight: 'bold'}}>신고대상</span> : {id}</div>
              <span style={{marginRight: '5px', textAlign: 'left'}}><span style={{fontWeight: 'bold'}}>회원상태</span> : <MemberSelectBox  defaultValue={statecodeChange} stateCode={statecode} statecodeChange={StateChange} ></MemberSelectBox></span>
              <span style={{marginRight: '5px', textAlign: 'left'}}><span style={{fontWeight: 'bold'}}>강퇴누적</span> : {reportnum} 번 </span>
              <span><span style={{fontWeight: 'bold'}}>최근 접속일</span> : {finalaccess}</span>
          </div>
          <div className="adminDetailOut"><Link to='/admin/member' className="adminLinkBtn">X</Link></div>
      </div>
      <table className="adminTable" style={{marginTop: '10px'}}>
        <thead className="adminThead">
          <tr>
            <th>신고번호</th>
            <th>신고내용</th>
            <th>신고자</th>
            <th>신고대상</th>
            <th>신고일자</th>
            <th>승인</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody className="adminTbody" >
          {
            memberDetail&&memberDetail.map(
              (item, idx)=>(
                <tr key={idx}>
                  <td>{item.reportid}</td>
                  <td ><Link to={{ pathname:`/admin/memberReport/${item.reportid}`}} state={{ id: id, statecode:statecode}} className="adminLinkBtn" id="adminTableContentLength">{item.reportcontent}</Link></td>
                  <td>{item.reporter}</td>
                  <td>{item.reportnumber}</td>
                  <td>{item.reportdate}</td>
                  <td id="adminBtntd2"><button onClick={()=>approveClick(item)} className="adminApprove-button">승인</button></td>
                  <td id="adminBtntd2"><button onClick={()=>deleteClick(item.reportid)} className="adminDelete-button">삭제</button></td>
                </tr>
              )
            )
          }
        </tbody>
        
      </table> 
      <div >
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
      <section>
        <button onClick={SaveClick} className="adminApprove-button">저장</button>
        <Link to='/admin/member'><button onClick={()=>getMemberrDetail()} className="adminDelete-button">취소</button></Link>
      </section>
    </div>
  );


  
}
export default MemberDetail
