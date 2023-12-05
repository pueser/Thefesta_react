import React, { useEffect, useRef, useState } from "react";
import Years from "./Years";
import './YearModal.css';
import { Icon } from '@iconify/react';

function MomentModal (props){

    let wrapperRef = useRef(); //모달창 가장 바깥쪽 태그를 감싸주는 역할

    useEffect(()=>{
      document.addEventListener('mousedown', handleClickOutside);
      return()=>{
        document.removeEventListener('mousedown', handleClickOutside);
      }
    })
    const handleClickOutside=(event)=>{
      if (wrapperRef && !wrapperRef.current.contains(event.target)) {
        props.setYearModalShow(false);
        props.setCalendarShow(true);
      }
    }

    const yearBtnEvent=(name)=>{
    //   alert(event.target.name);
        props.handleyear(name);
        props.setYearModalShow(false);
        props.setMonthModalShow(true);
    };

    const[getYearRequre, setYearRequre] = useState("");
    const[yearRequreCnt,setYearRequreCnt] = useState(0);

    return (
        <div className="yearModalBack" ref={wrapperRef}>
            <div id="yearModal">
                <div className="yearModalContent" id="prevYears">
                    <Icon   icon="ooui:next-rtl" className="yearsIcon" 
                            onClick={
                                ()=>{
                                    setYearRequre("subtract");
                                    setYearRequreCnt(yearRequreCnt+1);
                                }
                            }
                    />
                </div>
                <div className="yearModalContent" id="tableYears">
                    { props.yearModalShow && 
                        <Years
                            yearBtnEvent={yearBtnEvent}
                            getYearRequre={getYearRequre}
                            yearRequreCnt={yearRequreCnt}
                            setYearModalShow={props.setYearModalShow}
                            setMonthModalShow={props.setMonthModalShow}
                        /> 
                    }
                </div>
                <div className="yearModalContent" id="nextYears">
                    <Icon   icon="ooui:next-ltr" className="yearsIcon" 
                            onClick={
                                ()=>{
                                    setYearRequre("plus");
                                    setYearRequreCnt(yearRequreCnt+1);
                                }
                            }
                    />
                </div>
            </div>
        </div>
    );
}
export default MomentModal;