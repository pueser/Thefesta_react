import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function QuestionDetail (){
    const {contentid} = useParams();
    const location = useLocation();
    const questioncontent = location.state.questioncontent
    const questionid = location.state.questionid
    const navigate = useNavigate();
    console.log(contentid)
    console.log("questionid = ", questionid)
    console.log("questioncontent", questioncontent)

    //확인 눌렀을 때
    const deleteClick = (data)=>{
   
        axios.post(`http://localhost:9090/admin/questionDelete?questionid=${data}`, {
        }).then((response)=>{
            console.log(response);
            alert(`${response.data}번 건의글이 확인되었습니다`)
            navigate(`/Question/${contentid}`)

        }).catch((error)=>{
            console.log(error)
            alert("건의글 확인이 실패하였습니다. 해당 업체에 문의 바랍니다.")
        })
    
    }


    return(
        <div>
            <p><Link to={{pathname:`/Question/${contentid}`}}>X</Link></p> 
            <table>
                <thead>
                    <tr>
                        <th>건의내용</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>{questioncontent}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={()=>deleteClick(questionid)}>확인</button>
            </div>
        </div>
    );
}
export default QuestionDetail;