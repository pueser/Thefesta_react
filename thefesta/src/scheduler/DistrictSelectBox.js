import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

function DistrictSelectBox(props){
    
    useEffect(
        ()=>{
            const getDistrictSelectOptions = async() => {

                await axios(
                    {
                        method: 'get',
                        url: 'http://localhost:9090/schduler/districtSelectOption',
                        params: {
                        "acode":props.selectedCountyValue
                        }
                    })
                    .then(response => { // 통신 성공
                        // alert("통신 성공");
                        setDistrictSelectOptions(response.data.districtList);
                        console.log("areaSelectOptions",districtSelectOptions)
                    })
                    .catch(error => {
                        console.log(error)
                        // alert("통신 실패");
                    }); // 통신 실패
            };
            getDistrictSelectOptions();
        },[props.selectedCountyValue]
    );

    const [districtSelectOptions, setDistrictSelectOptions] = useState([]);
    
    const handelSelectedValueChange = (e)=>{
        props.setSelectedDistrictvalue(e.target.value);
    }

    return(
        <select className="selectOptions" id="districtOptions" defaultValue={0} onChange={handelSelectedValueChange} disabled={props.districtAbled}>
            <option value={0}>
                전체
            </option>
            {
                districtSelectOptions.map(
                    (option)=>{
                        return(
                            <option key={option.scode} value={option.scode}>
                                {option.sname}
                            </option>
                        );
                    }
                )
            }
        </select>
        );
}

export default DistrictSelectBox;