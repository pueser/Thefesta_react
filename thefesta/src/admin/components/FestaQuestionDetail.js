import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function FestaQuestionDetail (){
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
        <div className="adminDetailMain" style={{marginTop: '75px'}}>
            <div className="adminDetailDisplay">
                <div className="adminDetailReportContent">건의내용</div>
                <div className="adminDetailOut"><Link to={{pathname:`/admin/festaQuestion/${contentid}`}} className="adminLinkBtn">X</Link></div>
            </div>
            <div className="adminReportContent">{questioncontent}</div>
            <div className="adminDetailBtn">
                <Link to={`/admin/festaQuestion/${contentid}`}><button onClick={()=>deleteClick(questionid)} className="adminApprove-button">확인완료</button></Link>
                <Link to={`/admin/festaQuestion/${contentid}`}><button  className="adminApprove-button">확인취소</button></Link>
            </div>
        </div>
    );
}

export default FestaQuestionDetail;