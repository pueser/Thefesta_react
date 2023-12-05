import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ReportDetail(){
    const {reportid} = useParams();
    
    //신고내용 저장 useState
    const [reportDetail, setReportDetail] = useState("");

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
                alert("reportcontent 불러오기 성공")
            })
            .catch((error)=>{
              console.log("error", error)
              alert("reportcontent 불러오기 실패")
            })
    }

    //승인버튼 누를때
    function approveClick(data){
        axios.post(`http://localhost:9090/admin/reportstateChange?reportid=${data}`, {
        }).then((response)=> {
            console.log("response", response.data)
            alert(response.data)
        }).catch((error)=>{
            console.log("error", error.data)
            alert(error.data)
        })
    }
    //반려버튼 누를때
    function deleteClick(data){
        axios.post(`http://localhost:9090/admin/memberReportDelete?reportid=${data}`, {
        }).then((response)=>{
            console.log(response);
            alert(response.data)

        }).catch((error)=>{
            console.log(error)
            alert(error.data)
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
                <Link to='/report'><button onClick={()=>approveClick(reportid)}>승인</button></Link>
                <Link to='/report'><button onClick={()=>deleteClick(reportid)}>반려</button></Link>
            </table>
        </div>
    );
}
export default ReportDetail;