import axios from "axios";
import { useEffect, useState } from "react";
import MemberList from "./MemberList";
import Pagenation from "./Pagenation";

function Member() {
  let newMemberList = [];
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
          setMemberList(response.data)
          alert("list 불러오기 성공")
          console.log("setBoardList", response)

          response.data.list.forEach(element=>{
            console.log("element = ", element);
            let code;

            //회원 상태 변경
            if(element.statecode === "1"){
              code = "일반";
              newMemberList.push({statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum, pageMaker : response.data.pageMaker})
            }else if(element.statecode === "2"){
              code = "탈퇴";
              newMemberList.push({statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum , pageMaker : response.data.pageMaker})
            }else if(element.statecode === "3"){
              code = "재가입 가능"
              newMemberList.push({statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum, pageMaker : response.data.pageMaker})
            }else if(element.statecode === "4"){
              code = "강퇴"
              newMemberList.push({statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum, pageMaker : response.data.pageMaker})
            }
            //MemberList 에 넣기
            setMemberList(newMemberList)
          })

          setStartPage(response.data.pageMaker.startPage);
          setEndPage(response.data.pageMaker.endPage)
          setTotal(response.data.pageMaker.total);
          setNext(response.data.pageMaker.next)
          setPrev(response.data.pageMaker.prev)
          
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
          setMemberList(response.data)
          console.log("setBoardList", response)
          alert("list 불러오기 성공")
          
          response.data.list.forEach(element=>{
            console.log("element = ", element);
            let code;

            //회원 상태 변경
            if(element.statecode === "1"){
              code = "일반";
              newMemberList.push({statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum, pageMaker : response.data.pageMaker})
            }else if(element.statecode === "2"){
              code = "탈퇴";
              newMemberList.push({statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum , pageMaker : response.data.pageMaker})
            }else if(element.statecode === "3"){
              code = "재가입 가능"
              newMemberList.push({statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum, pageMaker : response.data.pageMaker})
            }else if(element.statecode === "4"){
              code = "강퇴"
              newMemberList.push({statecode :code, id : element.id, finalaccess: element.finalaccess, reportnum: element.reportnum, pageMaker : response.data.pageMaker})
            }
            //MemberList 에 넣기
            setMemberList(newMemberList)
          })

          setStartPage(response.data.pageMaker.startPage);
          setEndPage(response.data.pageMaker.endPage)
          setTotal(response.data.pageMaker.total);
          setNext(response.data.pageMaker.next)
          setPrev(response.data.pageMaker.prev)
          
        })
        .catch((error)=>{
          console.log("error", error)
          alert("list 불러오기 실패")
        })
  }

  console.log("memberList = ", memberList)
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>아이디</th>
              <th>상태</th>
              <th>신고누적현황</th>
              <th>최근 접속일</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            {
              memberList&&memberList.map(
                (item)=>(
                  <MemberList key={item.id}
                    id={item.id}
                    statecode={item.statecode}
                    reportnum={item.reportnum}
                    finalaccess={item.finalaccess}>
                  </MemberList>
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
  
  export default Member;
  