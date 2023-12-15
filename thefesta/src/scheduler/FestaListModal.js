import React, { useEffect, useRef, useState } from "react";
import './FestaListModal.css';
import axios from "axios";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function FestaListModal(props){
    let wrapperRef = useRef(); //모달창 가장 바깥쪽 태그를 감싸주는 역할

    
    useEffect(()=>{
        document.addEventListener('mousedown', handleClickOutside);
        return()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        }
    });
    
    let [festaList,setFestaList]= useState([]);

    useEffect(()=>{
        const getFestaList = async() => {

            await axios(
                {
                    method: 'get',
                    url: 'http://localhost:9090/schduler/festaList',
                    params: {
                        "date":props.date,
                        "countyValue":props.selectedCountyValue,
                        "districtValue":props.selectedDistrictValue,
                        "keyword":props.keyword
                    }
                })
                .then(response => { // 통신 성공
                    // alert("통신 성공");
                    setFestaList(response.data.festaList);
                    console.log("festaList",festaList)
                })
                .catch(error => {
                    console.log(error)
                    // alert("통신 실패");
                }); // 통신 실패
        };
        getFestaList();
    },[props.date, props.selectedCountyValue, props.selectedDistrictValue, props.keyword]);

    const handleClickOutside=(event)=>{
        if (wrapperRef && !wrapperRef.current.contains(event.target)) {
            props.festaListModalViewHandle(false);
        }
    }

    return(
        <div id="FestaListModalBack"  ref={wrapperRef}>
            <span id="modalTitle">축제들</span><hr/>
            <ul id="festaTitles">
                {festaList&&festaList.map((data, index)=>{
                    if(props.date===data.eventstartdate){
                        return(
                            <li className="festaTitle" key={data.contentid}>
                            <Link to={"/festival/detail/"+data.contentid}
                            state={{
                                contentid:          data.contentid,
                                title:              data.title,
                                startDate:          data.startDate,
                                endDate:            data.endDate,
                                addr1:              data.addr1,
                                eventintro:         data.eventintro,
                                eventtext:          data.eventtext,
                                homepage:           data.homepage,
                                agelimit:           data.agelimit,
                                sponsor1:           data.sponsor1,
                                sponsor1tel:        data.sponsor1tel,
                                sponsor2:           data.sponsor2,
                                sponsor2tel:        data.sponsor2tel,
                                usetimefestival:    data.usetimefestival,
                                playtime:           data.playtime
                            }}>
                                <Icon icon="clarity:circle-line"></Icon>{data.title}
                              </Link>
                          </li>
                        );
                    }
                    else if(props.date===data.eventenddate){
                        return(
                            <li className="festaTitle" key={data.contentid}>
                                <Link to={"/festival/detail/"+data.contentid}
                                state={{
                                    contentid:          data.contentid,
                                    title:              data.title,
                                    startDate:          data.startDate,
                                    endDate:            data.endDate,
                                    addr1:              data.addr1,
                                    eventintro:         data.eventintro,
                                    eventtext:          data.eventtext,
                                    homepage:           data.homepage,
                                    agelimit:           data.agelimit,
                                    sponsor1:           data.sponsor1,
                                    sponsor1tel:        data.sponsor1tel,
                                    sponsor2:           data.sponsor2,
                                    sponsor2tel:        data.sponsor2tel,
                                    usetimefestival:    data.usetimefestival,
                                    playtime:           data.playtime
                                }}>
                                    <Icon icon="ri:square-line"></Icon>{data.title}
                                </Link>
                            </li>
                        );
                    }
                    else{
                        return(
                            <li className="festaTitle" key={data.contentid}>
                                <Link to={`/festival/detail/${data.contentid}`}
                                state={{
                                    contentid:          data.contentid,
                                    title:              data.title,
                                    startDate:          data.startDate,
                                    endDate:            data.endDate,
                                    addr1:              data.addr1,
                                    eventintro:         data.eventintro,
                                    eventtext:          data.eventtext,
                                    homepage:           data.homepage,
                                    agelimit:           data.agelimit,
                                    sponsor1:           data.sponsor1,
                                    sponsor1tel:        data.sponsor1tel,
                                    sponsor2:           data.sponsor2,
                                    sponsor2tel:        data.sponsor2tel,
                                    usetimefestival:    data.usetimefestival,
                                    playtime:           data.playtime
                                }}>
                                    <Icon icon="iconamoon:star"></Icon>{data.title}
                                </Link>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
}

export default FestaListModal;