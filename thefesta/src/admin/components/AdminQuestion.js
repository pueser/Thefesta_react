import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/Board.css';
import '../css/Button.css';
import '../css/Table.css';
import Pagenation from "./Pagenation";

function AdminQuestion (){
    let newAdminQuestionList =[];
    const [adminQuestionList, setAdminQuestionList] = useState([]);
    const [curPage, setCurPage] = useState(1); //현재 페이지 세팅
    const [startPage, setStartPage] = useState(""); //startPage
    const [endPage, setEndPage] = useState(""); //endPage
    const [total, setTotal] = useState("")//list 총갯수
    const [next, setNext] = useState("")//이전 페이지
    const [prev, setPrev] = useState("")//다음 페이지
    const [amount, setAmount] = useState("10");//한 페이지당 보여질 list개수

    useEffect(
        ()=>{getAdminQuestionList()
      },[]);

      
    
    //문의 게시판 list 불러오기
    const getAdminQuestionList = async() =>{
    
    await axios
        .get(`http://localhost:9090/admin/adminQuestionList?pageNum=${curPage}&amount=${amount}`)
        
        .then((response)=> {
        //setBoardList(response.data)
        console.log("response = ", response.data)

            //게시판 종류 이름 지정 및 작성일자 변경(yyyy.MM.dd)
            response.data.list.forEach(element=>{
            let date = element.bregist.substr(0,10);

            if(element.bno === 3){
                newAdminQuestionList.push({bid : element.bid, id : element.id, btitle : element.btitle, bcontent : element.bcontent, bregist: date})
            }
            setAdminQuestionList(newAdminQuestionList)
            })

            setStartPage(response.data.pageMaker.startPage);
            setEndPage(response.data.pageMaker.endPage)
            setTotal(response.data.pageMaker.total);
            setNext(response.data.pageMaker.next)
            setPrev(response.data.pageMaker.prev)
            if(response.data.list.length!==10){
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
console.log("adminQuestionList = ", adminQuestionList)



    //Pagenation에서 현재페이지 받기
    const curPageChange =(page) =>{
        setCurPage(page);
        
        axios.get(`http://localhost:9090/admin/adminQuestionList?pageNum=${page}&amount=${amount}`)
          
        .then((response)=> {
          console.log("response",response.data)
  
         //게시판 종류 이름 지정 및 작성일자 변경(yyyy.MM.dd)
         response.data.list.forEach(element=>{
            let date = element.bregist.substr(0,10);

            if(element.bno === 3){
                newAdminQuestionList.push({bid : element.bid, id : element.id, btitle : element.btitle, bcontent : element.bcontent, bregist: date})
            }
            setAdminQuestionList(newAdminQuestionList)
            })

            setStartPage(response.data.pageMaker.startPage);
            setEndPage(response.data.pageMaker.endPage)
            setTotal(response.data.pageMaker.total);
            setNext(response.data.pageMaker.next)
            setPrev(response.data.pageMaker.prev)
            if(response.data.list.length!==10){
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
    

    console.log("adminQuestionList = ", adminQuestionList)

    return(
        <div className="adminMain">
            <table className="adminTable">
                <thead className="adminThead">
                    <tr>
                    <th>문의번호</th>
                    <th>문의제목</th>
                    <th>문의내용</th>
                    <th>작성자</th>
                    <th>등록일자</th>
                    <th>답변하기</th>
                    </tr>
                </thead>
                <tbody className="adminTbody">
                {
                    adminQuestionList&&adminQuestionList.map(
                        (item, idx)=>(
                        <tr key={idx} >
                            <td >{item.bid}</td>
                            <td><span id="adminTableContentLengthQuestion">{item.btitle}</span></td>
                            <td><Link to={'/admin/adminQuestionDetail'} state={{bid: item.bid, id:item.id, bcontent:item.bcontent}} className="adminLinkBtn"><span id="adminTableContentLengthQuestion">{item.bcontent}</span></Link></td>
                            <td>{item.id}</td>
                            <td>{item.bregist}</td>
                            <td id="adminBtntd2"><button className="adminRgister-button"><Link to={'/admin/adminQuestionRegister'} state={{bid: item.bid, id:item.id}} className="adminLinkBtn" >답변하기</Link></button></td>
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
export default AdminQuestion