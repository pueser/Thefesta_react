import axios from "axios";
import { useEffect, useState } from "react";
import MemberList from "./MemberList";
import Pagenation from "./Pagenation";
import { array } from "prop-types";
import { Link } from "react-router-dom";
import '../css/Table.css';
import '../css/Button.css';

function Member() {
  let newMemberList = [];
  //상태코드 변경값 저장 useState
  const [memberList, setMemberList] = useState([]);
  const [curPage, setCurPage] = useState(1); //현재 페이지 세팅
  const [startPage, setStartPage] = useState(""); //startPage
  const [endPage, setEndPage] = useState(""); //endPage
  const [total, setTotal] = useState("")//list 총갯수
  const [next, setNext] = useState("")//이전 페이지
  const [prev, setPrev] = useState("")//다음 페이지
  const [amount, setAmount] = useState("10");//한 페이지당 보여질 list개수


  useEffect(
    ()=>{getMemberList()
    },[]);
  

  //회원 list 불러오기
  const getMemberList = async() =>{
    
    await axios
        .get(`http://localhost:9090/admin/memberList?pageNum=${curPage}&amount=${amount}`)
        
        .then((response)=> {
          console.log("response", response)
          
          response.data.list.forEach(element=>{
            let code;
            //회원 상태 변경
            if(element.statecode === "1"){
              code = "일반";
              newMemberList.push({rn : element.rn, statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum, totalreportnum : element.totalreportnum})
            }else if(element.statecode === "2"){
              code = "탈퇴";
              newMemberList.push({rn : element.rn, statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum, totalreportnum : element.totalreportnum})
            }else if(element.statecode === "3"){
              code = "재가입 가능"
              newMemberList.push({rn : element.rn, statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum, totalreportnum : element.totalreportnum})
            }else if(element.statecode === "4"){
              code = "강퇴"
              newMemberList.push({rn : element.rn, statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum, totalreportnum : element.totalreportnum})
            }
            setMemberList(newMemberList);
          }
          )
          
          setStartPage(response.data.pageMaker.startPage);
          setEndPage(response.data.pageMaker.endPage)
          setTotal(response.data.pageMaker.total);
          setNext(response.data.pageMaker.next);
          setPrev(response.data.pageMaker.prev);
          if(response.data.list.length!=10){
            document.getElementById("pagination").style.marginTop = ((10-(response.data.list.length%10))*42+60) + "px";
          }
          else{
            document.getElementById("pagination").style.marginTop = "60px";
          }
        })
        .catch((error)=>{
          console.log("error", error)
          alert("list 불러오기 실패")

        })
  }

  //Pagenation에서 현재페이지 받기
  const curPageChange =(page) =>{
    console.log("page", page)
    setCurPage(page);
     axios .get(`http://localhost:9090/admin/memberList?pageNum=${page}&amount=${amount}`)
        
        .then((response)=> {
          console.log("response", response)

          response.data.list.forEach(element=>{
            let code;

            //회원 상태 변경1
            if(element.statecode === "1"){
              code = "일반";
              newMemberList.push({rn : element.rn, statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum, totalreportnum : element.totalreportnum})
            }else if(element.statecode === "2"){
              code = "탈퇴";
              newMemberList.push({rn : element.rn, statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum, totalreportnum : element.totalreportnum })
            }else if(element.statecode === "3"){
              code = "재가입 가능"
              newMemberList.push({rn : element.rn, statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum, totalreportnum : element.totalreportnum})
            }else if(element.statecode === "4"){
              code = "강퇴"
              newMemberList.push({rn : element.rn, statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum, totalreportnum : element.totalreportnum})
            }
            setMemberList(newMemberList)
          })

          setStartPage(response.data.pageMaker.startPage);
          setEndPage(response.data.pageMaker.endPage)
          setTotal(response.data.pageMaker.total);
          setNext(response.data.pageMaker.next)
          setPrev(response.data.pageMaker.prev)
          if(response.data.list.length!=10){
            document.getElementById("pagination").style.marginTop = ((10-(response.data.list.length%10))*42+60) + "px";
          }
          else{
            document.getElementById("pagination").style.marginTop = "60px";
          }
        })
        .catch((error)=>{
          console.log("error", error)
          alert("list 불러오기 실패")
        })
  }

  //상태코드 변경값 저장 useState
  //const [statecodeExpulsionChange, setStateExpulsioncodeChange] = useState(statecode);

  //MemberSelectBox(하위 컴포넌트)에서 값 전달 받음
  function StateExpulsionChange(){
      // console.log("memberDetail statecode 전달받음= ", stateValue)
      this.forceUpdate();
      /* if(stateValue === "일반"){
          setStateExpulsioncodeChange("일반");
      }else if(stateValue === "탈퇴"){
          setStateExpulsioncodeChange("탈퇴");
      }else if(stateValue === "재가입 가능"){
          setStateExpulsioncodeChange("재가입 가능");
      }else if(stateValue === "강퇴"){
          setStateExpulsioncodeChange("강퇴"); 
      }*/
  }

 
console.log("memberlist = ", memberList)
    return (
      <div className="main">
        <table >
          <thead>
            <tr>
              <th>번호</th>
              <th>아이디</th>
              <th>상태</th>
              <th>신고누적현황</th>
              <th>최근 접속일</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody id="memtb">
            {
              memberList&&memberList.map(
                (item, indx)=>(
                  <tr key={indx}>
                    <td>{item.rn}</td>
                    <td>{item.id}</td>
                    <td>{item.statecode}</td>
                    <td>{item.totalreportnum}</td>
                    <td>{item.finalaccess}</td>
                    <td className="ButtonTD"><button className="Rgister-button" ><Link to={{ pathname:`/memberDetail/${item.id}`}}  state ={{statecode: item.statecode, finalaccess: item.finalaccess}} expulsionchange ={StateExpulsionChange} className="link" >수정</Link></button></td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
        <div>
        
        </div>
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
  
  export default Member;
  