import axios from "axios";
import './FestaCnt.css'
import FestaListModal from "./FestaListModal";
import React, { useEffect, useState } from "react";

function FestaCnt(props){
    
    const [festaCnt, setFestaCnt] = useState(0);

    useEffect(
        ()=>{
            const getFestaCnt = async() => {

                await axios(
                    {
                        method: 'get',
                        url: 'http://localhost:9090/schduler/festaCnt',
                        params: {
                            "date":props.date,
                            "countyValue":props.selectedCountyValue,
                            "districtValue":props.selectedDistrictValue,
                            "keyword":props.keyword
                        }
                    })
                    .then(response => { // 통신 성공
                        // alert("통신 성공");
                        setFestaCnt(response.data.festaCnt);
                        // console.log("setFestaCnt",response.data.festaCnt)
                    })
                    .catch(error => {
                        console.log(error)
                        // alert("통신 실패");
                    }); // 통신 실패
            };
            getFestaCnt();
        },[props.date, props.selectedCountyValue, props.selectedDistrictValue, props.keyword]
    );

    const[festaListModalView,setFestaListModal]=useState(false);
    
    const festaListModalViewHandle = (modalRequre) => {
        setFestaListModal(modalRequre);
    }

    if(festaCnt !== 0){
        return(
            <div id="festaCnt">
                <div id="festaText" onClick={()=>{festaListModalViewHandle(true)}}>{festaCnt}</div>
                {festaListModalView&&<FestaListModal 
                    date={props.date} 
                    festaListModalViewHandle={festaListModalViewHandle}
                    selectedCountyValue={props.selectedCountyValue} 
                    selectedDistrictValue={props.selectedDistrictValue}
                    keyword={props.keyword}
                />}
            </div>
        );
    }
    else{
        return(
            <div id="festaCnt">
                <div id="festaText" style={{backgroundColor:"gray"}}>{festaCnt}</div>
            </div>
        );
    }
}

export default FestaCnt;