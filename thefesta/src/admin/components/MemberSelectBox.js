import { useState } from "react";


function MemberSelectBox(props){
    console.log("디폴트 옵션 : ", props.defaultValue)
    //회원 상태코드(변경전)
    const stateChangeBefore= [props.stateCode]

    //회원 상태 코드
    const OPTIONS = [
        { value: "1", name: "일반", disabled : true},
        { value: "2", name: "탈퇴", disabled : true},
        { value: "4", name: "강퇴", disabled : true},
        { value: "3", name: "재가입 가능" ,disabled : true},
    ];
    //회원 select값 disabled변경 useState 저장
    const [memberSelectBox] = useState(OPTIONS);
    console.log("변경전 = ")
    //회원 상태에 따라 변경할 수 있는 select값 disabled 변경
    if(props.defaultValue === '일반' || props.stateCode === "일반"){
        memberSelectBox.map((item)=>{
            if(item.name === "강퇴" || item.name === "일반"){
                item.disabled = false;
            }
        })
    }else if(props.defaultValue === '탈퇴'){
        memberSelectBox.map((item)=>{
            if(item.name === "재가입 가능" || item.name === "탈퇴"){
                item.disabled = false;
            }
        })
    }else if(props.defaultValue === '강퇴'){
        memberSelectBox.map((item)=>{
            if(item.name === "재가입 가능" || item.name === "강퇴"){
                item.disabled = false;
            }
        })
    }

    //select box 변경시 값 취득후 memberDetail(부모 컴포넌트)전달
    function handleChange (e)  {
        e.preventDefault();
		console.log("select값 변경 = ", e.target.value);
        props.statecodeChange(e.target.value)
	};

    
    return(
            <select  defaultValue={props.defaultValue} onClick={handleChange}>
                {
                    memberSelectBox.map(
                    (item, idx)=>(
                    <option key={idx} value={item.name} disabled = {item.disabled} >{item.name}</option>
                    )
                )
                }
            </select >
    );
}

export default MemberSelectBox;