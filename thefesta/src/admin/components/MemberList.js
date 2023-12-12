import { useState } from "react";
import { Link } from "react-router-dom";
import MemberDetail from "./MemberDetail";

function MemberList({id,statecode,totalreportnum,finalaccess, count, getMemberList}){

    //상태코드 변경값 저장 useState
    const [statecodeExpulsionChange, setStateExpulsioncodeChange] = useState(statecode);

    //MemberSelectBox(하위 컴포넌트)에서 값 전달 받음
    function StateExpulsionChange(stateValue){
        console.log("memberDetail statecode 전달받음= ", stateValue)
        if(stateValue === "일반"){
            setStateExpulsioncodeChange("일반");
        }else if(stateValue === "탈퇴"){
            setStateExpulsioncodeChange("탈퇴");
        }else if(stateValue === "재가입 가능"){
            setStateExpulsioncodeChange("재가입 가능");
        }else if(stateValue === "강퇴"){
            setStateExpulsioncodeChange("강퇴");
        }
    }

    
    return(
            <tr >
                <td>{count}</td>
                <td>{id}</td>
                <td>{statecode}</td>
                <td>{totalreportnum}</td>
                <td>{finalaccess}</td>
                <td><button><Link to={{ pathname:`/memberDetail/${id}`}}  state ={{statecode: statecode, finalaccess: finalaccess}} getMemberList ={getMemberList}>수정</Link></button></td>
            </tr>
    );
}

export default MemberList;