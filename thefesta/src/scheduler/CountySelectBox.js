import React from "react";

function CountySelectBox(props){
    
    const countySelectOptions = [
        {acode:1, aname:"서울"},
        {acode:2, aname:"인천"},
        {acode:3, aname:"대전"},
        {acode:4, aname:"대구"},
        {acode:5, aname:"광주"},
        {acode:6, aname:"부산"},
        {acode:7, aname:"울산"},
        {acode:8, aname:"세종특별자치시"},
        {acode:31, aname:"경기도"},
        {acode:32, aname:"강원특별자치도"},
        {acode:33, aname:"충청북도"},
        {acode:34, aname:"충청남도"},
        {acode:35, aname:"경상북도"},
        {acode:36, aname:"경상남도"},
        {acode:37, aname:"전라북도"},
        {acode:38, aname:"전라남도"},
        {acode:39, aname:"제주도"}
    ]
    
    const handelSelectedValueChange = (e)=>{
        props.setSelectedCountyvalue(e.target.value);
        props.setSelectedDistrictvalue("0")
        if(e.target.value==="0"){
            props.setDistrictAbled(true);
        }
        else{
            props.setDistrictAbled(false);
        }
    }

    return(
        <select className="selectOptions" id="countyOptions" defaultValue={0} onChange={handelSelectedValueChange}>
            <option value="0">
                전국
            </option>
            {
                countySelectOptions.map(
                    (option)=>{
                        return(
                            <option key={option.acode} value={option.acode}>
                                {option.aname}
                            </option>
                        );
                    }
                )
            }
        </select>
        );
}

export default CountySelectBox;