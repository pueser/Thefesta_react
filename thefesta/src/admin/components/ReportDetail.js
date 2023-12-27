import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useHistory } from "react-router-dom";
import '../css/DetailContent.css';
import '../css/Button.css';

 function ReportDetail(){
    const {reportid} = useParams();
    const [reportDetail, setReportDetail] = useState("");
    const navigate = useNavigate();

    useEffect(
        ()=>{getReportDetail()
    },[]);

    //신고내용 서버 정보 불러오기
    const getReportDetail = async() =>{
        await axios
            .get(`http://localhost:9090/admin/memberReport?reportid=${reportid}`)
            
            .then((response)=> {
                setReportDetail(response.data)
                console.log("setReportDetail", response)
            })
            .catch((error)=>{
              console.log("error", error)
            })
    }

    //승인버튼 누를때
    function approveClick(data){
        axios.post(`http://localhost:9090/admin/reportstateChange?reportid=${data}`, {
        }).then((response)=> {
            console.log("response", response.data)
            alert(`${response.data}번 승인 되었습니다. 해당 회원 상세페이지에서 확인 가능 합니다.`)
            navigate(-2)

        }).catch((error)=>{
            console.log("error", error.data)
            alert("승인이 되지 않았습니다. 해당 업체에 문의 바랍니다.")
        })
    }
    //반려버튼 누를때
    function deleteClick(data){
        axios.post(`http://localhost:9090/admin/memberReportDelete?reportid=${data}`, {
        }).then((response)=>{
            console.log(response);
            alert(`${response.data}번 반려 되었습니다`)
            navigate(-2)

        }).catch((error)=>{
            console.log(error)
            alert("승인이 되지 않았습니다. 해당 업체에 문의 바랍니다.")
        })
    }  

    return(
        <div className="adminDetailMain">
            <div className="adminDetailDisplay">
                <div className="adminDetailReportLeft">
                    <div className="adminDetailReportNum">신고번호  :  {reportid} 번</div>
                    <div className="adminDetailReportContent">신고내용</div>
                </div>
                <div className="adminDetailOut"><Link to='/admin/report' className="adminLinkBtn">X</Link></div>
            </div>
            <div className="adminReportContent">{reportDetail}</div>
            <div className="adminDetailBtn">
                <Link to='/admin/report'><button onClick={()=>approveClick(reportid)} className="adminApprove-button">승인</button></Link>
                <Link to='/admin/report'><button onClick={()=>deleteClick(reportid)} className="adminDelete-button">반려</button></Link>
            </div>
        </div>
    );
}


export default ReportDetail;