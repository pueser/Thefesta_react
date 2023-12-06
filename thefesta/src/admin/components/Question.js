import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Question (){
    const {contentid} = useParams();
    const [questionList, setQuestionList] = useState([]);
    const [curPage, setCurPage] = useState(1); //현재 페이지 세팅
    const [startPage, setStartPage] = useState(""); //startPage
    const [endPage, setEndPage] = useState(""); //endPage
    const [total, setTotal] = useState("")//list 총갯수
    const [next, setNext] = useState("")//이전 페이지
    const [prev, setPrev] = useState("")//다음 페이지
    const [amount, setAmount] = useState("10");//한 페이지당 보여질 list개수
    console.log("contentid", contentid)

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

        })

        .catch((error)=>{
        console.log("error", error)
        })
    }

    return(
        <div>
            <p><Link to='/festa'>X</Link></p> 
            <table>
          <thead>
            <tr>
              <th>건의 번호</th>
              <th>건의 내용</th>
              <th>작성자</th>
              <th>작성일자</th>
              <th>확인</th>
            </tr>
          </thead>
          <tbody>
            {
              questionList.list&&questionList.list.map(
                (item, idx)=>(
                  <tr key={idx}>
                    <td>{item.questionid}</td>
                    <td><Link to={{ pathname:`/QuestionDetail/${item.contentid}`}} state ={{questioncontent: item.questioncontent}}>{item.questioncontent}</Link></td>
                    <td>{item.id}</td>
                    <td>{item.questiondate}</td>
                    <td><button>확인</button></td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
        <div>
          
        </div>
        </div>
    );
}
export default Question;