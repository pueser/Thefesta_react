import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function MemberReport(props){
    const {reportid} = useParams();
    const location = useLocation();
    const id = location.state.id
    const statecode = location.state.statecode
    
    //신고내용 저장 useState
    const [memberReport, setMemberReport] = useState("");

    useEffect(
        ()=>{getMemberReport()
    },[]);

    //신고내용 서버 정보 불러오기
    const getMemberReport = async() =>{
        await axios
            .get(`http://localhost:9090/admin/memberReport?reportid=${reportid}`)
            
            .then((response)=> {
                setMemberReport(response.data)
      
                console.log("setMemberReport", response)
                alert("reportcontent 불러오기 성공")
            })
            .catch((error)=>{
              console.log("error", error)
              alert("reportcontent 불러오기 실패")
            })
    }

    //신고글 삭제
    function deleteClick(data){
        
        console.log("삭제할 reportid = ", data)
        axios.post(`http://localhost:9090/admin/memberReportDelete?reportid=${data}`, {
        }).then((response)=>{
            console.log(response);
            alert(`${response.data}번이 삭제 되었습니다.`)

        }).catch((error)=>{
            console.log(error)
            alert("신고글이 삭제되지 않았습니다. 업체에 문의 바랍니다.")
        })
        
    }  

    //select box 변경시 값 취득후 memberDetail(부모 컴포넌트)전달
    function handleChange (e)  {
        e.preventDefault();
		console.log("select값 변경 = ",reportid);
		console.log("select값 변경 = ",id);
        let data =[];
        data.push({reported : id, reportid : reportid})
        console.log("data" , data)
        props.approveClick(data)
	};

    return(
        <div>
            <p><Link to={{ pathname:`/memberDetail/${id}`}}  state ={{statecode: statecode}}>X</Link></p>
            <div>신고번호 : {reportid}</div>
            <table>
                <thead>
                    <tr>
                        <th>신고내용</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{memberReport}</td>
                    </tr>
                </tbody>
                <Link to={{ pathname:`/memberDetail/${id}`}}  state ={{statecode: statecode}}><button onClick={handleChange}>승인</button></Link>
                <Link to={{ pathname:`/memberDetail/${id}`}}  state ={{statecode: statecode}}><button onClick={()=>deleteClick(reportid)}>삭제</button></Link>
            </table>
        </div>
    );
}

export default MemberReport;