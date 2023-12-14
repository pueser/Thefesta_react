import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Pagenation from "./Pagenation";
import '../css/Table.css';
import '../css/Button.css';

function Festa() {
  let festaListCopy = [];
  const [festaList, setFestaList] = useState([]);
  const [curPage, setCurPage] = useState(1); //현재 페이지 세팅
  const [startPage, setStartPage] = useState(""); //startPage
  const [endPage, setEndPage] = useState(""); //endPage
  const [total, setTotal] = useState("")//list 총갯수
  const [next, setNext] = useState("")//이전 페이지
  const [prev, setPrev] = useState("")//다음 페이지
  const [amount, setAmount] = useState("10");//한 페이지당 보여질 list개수
  const message = "해당 축제를 삭제하면 축제 건의도 삭제 됩니다. 삭제하시겠습니까?";

   useEffect(
     ()=>{getFestaList()
     },[]);
  
  //축제 list 불러오기
    const getFestaList = async() =>{
    
      await axios
        .get(`http://localhost:9090/admin/festaList?pageNum=${curPage}&amount=${amount}`)
      
        .then((response)=> {
          console.log("response", response.data)
          //alert("list 불러오기 성공")

          response.data.questionDto.forEach(element=>{
            //addr1 주소 자르기
            let address = element.addr1.split(" ", 1);
            festaListCopy.push({addr1:address[0], contentid : element.contentid, eventenddate: element.eventenddate, eventstartdate: element.eventstartdate, questioncount: element.questioncount, title : element.title})
            //festList 에 넣기
            setFestaList(festaListCopy)
          })

          setStartPage(response.data.pageMaker.startPage);
          setEndPage(response.data.pageMaker.endPage)
          setTotal(response.data.pageMaker.total);
          setNext(response.data.pageMaker.next)
          setPrev(response.data.pageMaker.prev)
          if(response.data.questionDto.length!=10){
            document.getElementById("adminPagination").style.marginTop = ((10-(response.data.questionDto.length%10))*42+75) + "px";
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
    console.log("page", page)
    setCurPage(page);
    axios.get(`http://localhost:9090/admin/festaList?pageNum=${page}&amount=${amount}`)
      
      .then((response)=> {
        console.log("response", response.data)
        //alert("list 불러오기 성공")
        
        response.data.questionDto.forEach(element=>{
          //addr1 주소 자르기
          let address = element.addr1.split(" ", 1);
          festaListCopy.push({addr1:address[0], contentid : element.contentid, eventenddate: element.eventenddate, eventstartdate: element.eventstartdate, questioncount: element.questioncount, title : element.title})
          //festList 에 넣기
          setFestaList(festaListCopy)
        })

        setStartPage(response.data.pageMaker.startPage);
        setEndPage(response.data.pageMaker.endPage)
        setTotal(response.data.pageMaker.total);
        setNext(response.data.pageMaker.next)
        setPrev(response.data.pageMaker.prev)
        if(response.data.questionDto.length!=10){
          document.getElementById("adminPagination").style.marginTop = ((10-(response.data.questionDto.length%10))*42+75) + "px";
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
  
  //삭제 버튼 누렀을 때 alert 창
  const deleteClick = (data) => {
    if (window.confirm(message)) {
      confirm(data);
    } else {
      alert("삭제가 취소되었습니다.")
      return;
    }
  };


  //삭제 alert 확인 눌렀을때
  const confirm = (data)=>{
    setFestaList(festaList.filter((item) => item.contentid !== data));  

    axios.post(`http://localhost:9090/admin/festaDelete?contentid=${data}`, {
      }).then((response)=>{
        console.log(response);
        alert(`${response.data}번 축제가 삭제되었습니다`)
        getFestaList();

      }).catch((error)=>{
        console.log(error)
        alert("축제 삭제가 실패하였습니다. 해당 업체에 문의 바랍니다.")
    })
    
  }
    
    return (
      <div className="adminMain">
        <table className="adminTable">
          <thead className="adminThead">
            <tr>
              <th>축제번호</th>
              <th>축제제목</th>
              <th>장소</th>
              <th>시작일자</th>
              <th>종료일자</th>
              <th>건의 갯수</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody className="adminTbody">
            {
              festaList&&festaList.map(
                (item, idx)=>(
                  <tr key={idx}>
                    <td>{item.contentid}</td>
                    <td ><span id="adminTableContentLength">{item.title}</span></td>
                    <td>{item.addr1}</td>
                    <td>{item.eventstartdate}</td>
                    <td>{item.eventenddate}</td>
                    <td id="adminBtntd"><Link to={{ pathname:`/admin/festaQuestion/${item.contentid}`}} className="adminLinkBtn" >{item.questioncount}</Link></td>
                    <td id="adminBtntd"><button onClick={()=>deleteClick(item.contentid)} className="adminDelete-button">삭제</button></td>
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
  
  export default Festa;