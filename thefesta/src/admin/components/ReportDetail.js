import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
            navigate('/report')

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
            navigate('/report')

        }).catch((error)=>{
            console.log(error)
            alert("승인이 되지 않았습니다. 해당 업체에 문의 바랍니다.")
        })
    }  

    return(
        <div>
            <p><Link to='/report'>X</Link></p>
            <div>신고번호 : {reportid}</div>
            <table>
                <thead>
                    <tr>
                        <th>신고내용</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{reportDetail}</td>
                    </tr>
                </tbody>
            </table>
            <td>
                <Link to='/report'><button onClick={()=>approveClick(reportid)}>승인</button></Link>
                <Link to='/report'><button onClick={()=>deleteClick(reportid)}>반려</button></Link>
            </td>
        </div>
    );
}
export default ReportDetail;