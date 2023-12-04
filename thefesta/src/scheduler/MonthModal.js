import React, { useEffect, useRef } from "react";
import './MonthModal.css';

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
        props.setMonthModalShow(false);
        props.setCalendarShow(true);
        }
    }

    const monthBtnEvent=(event)=>{
    //   alert(event.target.name);
        props.handlemonth(event.target.name);
        props.setMonthModalShow(false);
        props.setCalendarShow(true);
    };

    return (
        <div className="monthModalBack" ref={wrapperRef}>
            <div id="monthModal">
                <table>
                    <thead>
                        <tr>
                            <td><button className="monthBtn" onClick={monthBtnEvent.bind(this)} name="1">1</button></td>
                            <td><button className="monthBtn" onClick={monthBtnEvent.bind(this)} name="2">2</button></td>
                            <td><button className="monthBtn" onClick={monthBtnEvent.bind(this)} name="3">3</button></td>
                            <td><button className="monthBtn" onClick={monthBtnEvent.bind(this)} name="4">4</button></td>
                        </tr>
                        <tr>
                            <td><button className="monthBtn" onClick={monthBtnEvent.bind(this)} name="5">5</button></td>
                            <td><button className="monthBtn" onClick={monthBtnEvent.bind(this)} name="6">6</button></td>
                            <td><button className="monthBtn" onClick={monthBtnEvent.bind(this)} name="7">7</button></td>
                            <td><button className="monthBtn" onClick={monthBtnEvent.bind(this)} name="8">8</button></td>
                        </tr>
                        <tr>
                            <td><button className="monthBtn" onClick={monthBtnEvent.bind(this)} name="9">9</button></td>
                            <td><button className="monthBtn" onClick={monthBtnEvent.bind(this)} name="10">10</button></td>
                            <td><button className="monthBtn" onClick={monthBtnEvent.bind(this)} name="11">11</button></td>
                            <td><button className="monthBtn" onClick={monthBtnEvent.bind(this)} name="12">12</button></td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}
export default MomentModal;