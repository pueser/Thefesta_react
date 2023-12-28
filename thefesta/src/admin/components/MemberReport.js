import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function MemberReport(){
    const {reportid} = useParams();
    const location = useLocation();
    const id = location.state.id
    const statecode = location.state.statecode
    const message = "회원의 현재 신고 누적 갯수가 4회 입니다. 한 번더 승인하시면 회원은 강퇴 처리되며 남은 신고들은 삭제됩니다. 승인 하시겠습니까?";
    const navigate = useNavigate();
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
            })
            .catch((error)=>{
              console.log("error", error)
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

    //승인 버튼 누렀을 때 alert 창
    const confirmAction = () => {
        if (window.confirm(message)) {
        noConfirm();
        } else {
        alert("승인이 취소되었습니다.")
        return;
        }
    };
  
  
    //회원 승인 버튼 눌렀을 때(신고누적 4회)
    const noConfirm = () =>{
    axios.post(`http://localhost:9090/admin/memberReportnumCnt?id=${id}&reportid=${reportid}`, {
    }).then((response)=> {
      console.log("response", response.data)
      alert(`${response.data}번 신고글이 승인 되었습니다.`)
        window.location.reload();
        return
  
  
    }).catch((error)=>{
      console.log("error", error.data)
      alert("신고글이 승인 되지 않았습니다. 해당 업체에 문의바랍니다.")
    })
    }
  
  
  //회원 승인 버튼 눌렀을 때(신고누적 4회 이상X)
  const onConfirm = () => {
    console.log("승인 reported = ", reportid);
    console.log("승인 reported = ", id);
  
    axios.post(`http://localhost:9090/admin/memberReportnumCnt?id=${id}&reportid=${reportid}`, {
    }).then((response)=> {
      alert(`${response.data}번 신고글이 승인 되었습니다.`)
      window.location.reload();
      return
      
  
    }).catch((error)=>{
      console.log("error", error.data)
      alert("신고글이 승인 되지 않았습니다. 해당 업체에 문의바랍니다.")
    })
  }
  
  
  //승인버튼 누를때
  function approveClickBtn(){
    
     console.log("승인 reported = ", reportid);
     console.log("승인 reported = ", id);
    axios.get(`http://localhost:9090/admin/memberReportnumRead?reportid=${reportid}&id=${id}`, {
      }).then((response)=> {
  
        console.log("response = ", response.data)
  
        //회원 reportnum이 4회인 경우 alert(확인 or 취소)
        if(response.data === 4){
          confirmAction();
        }else{
          onConfirm();
        }
        
      }).catch((error)=>{
        console.log("error", error.data)
      })
  }
    
    //select box 변경시 값 취득후 memberDetail(부모 컴포넌트)전달
    // function handleChange (e)  {
    //     e.preventDefault();
	// 	console.log("select값 변경 = ",reportid);
	// 	console.log("select값 변경 = ",id);
    //     let data =[];
    //     data.push({reported : id, reportid : reportid})
    //     console.log("data" , data)
    //     props.approveClick(data)
	// };

    return(
        <div className="adminDetailMain">
            <div className="adminDetailDisplay">
                <div className="adminDetailReportLeft">
                    <div className="adminDetailReportNum">신고번호  :  {reportid} 번</div>
                    <div className="adminDetailReportContent">신고내용</div>
                </div>
                <div className="adminDetailOut"><Link to={{ pathname:`/admin/memberDetail/${id}`}}  state ={{statecode: statecode}} className="adminLinkBtn">X</Link></div>
            </div>
                <div className="adminReportContent">{memberReport}</div>
                <div className="adminDetailBtn">
                <Link to={{ pathname:`/admin/memberDetail/${id}`}}  state ={{statecode: statecode}}><button onClick={()=>approveClickBtn()} className="adminApprove-button">승인</button></Link>
                <Link to={{ pathname:`/admin/memberDetail/${id}`}}  state ={{statecode: statecode}}><button onClick={()=>deleteClick(reportid)} className="adminDelete-button">삭제</button></Link>
            </div>
        </div>
    );
}


export default MemberReport;