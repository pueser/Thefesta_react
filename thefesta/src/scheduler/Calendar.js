import moment from 'moment';
import React, { useState } from "react";
import './Calendar.css';
import FestaCnt from "./FestaCnt";

function Calendar(props){
    
    const [getMoment, setMoment]=useState(moment());     
    const today = getMoment;    // today == moment()   입니다.
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

    const [getCnt, setCnt] = useState(0);
    if(getCnt < props.getCnt){

        if(props.handlemonth === "plus"){
            setMoment(getMoment.clone().add(1, 'month'));
        }
        else if(props.handlemonth === "subtract"){
            setMoment(getMoment.clone().subtract(1, 'month'));
        }
        else{
          setMoment(getMoment.clone().year(props.handleyear).month(props.handlemonth-1));
        }

        setCnt(getCnt+1);
    }

    let result = [];
    let week = firstWeek;
    for ( week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week} id="calendarRow">
          {
            Array(7).fill(0).map((data, index) => {
              let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
              
              let textColor = "black";

              if(index === 0 || index === 6){
                textColor = "red";
              }

              if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                return(
                    <td key={index} className='dayBlock' id='todayBlock' >
                      <span className='dayDateText' style={{color:textColor}}>{days.format('D')}</span>
                      <FestaCnt 
                        date={days.format('YYYYMMDD')} 
                        selectedCountyValue={props.selectedCountyValue} 
                        selectedDistrictValue={props.selectedDistrictValue}
                        keyword={props.keyword}
                      />
                    </td>
                );
              }else if(days.format('MM') !== today.format('MM')){
                return(
                    <td key={index} className='dayBlock' id='notNowMonth' >
                      <span className='dayDateText' style={{color:textColor}}>{days.format('D')}</span>
                      <FestaCnt 
                        date={days.format('YYYYMMDD')} 
                        selectedCountyValue={props.selectedCountyValue} 
                        selectedDistrictValue={props.selectedDistrictValue}
                        keyword={props.keyword}
                      />
                    </td>
                );
              }else{
                return(
                    <td key={index} className='dayBlock'>
                      <span className='dayDateText' style={{color:textColor}}>{days.format('D')}</span>
                      <FestaCnt 
                        date={days.format('YYYYMMDD')} 
                        selectedCountyValue={props.selectedCountyValue} 
                        selectedDistrictValue={props.selectedDistrictValue}
                        keyword={props.keyword}
                      />
                    </td>
                );
              }
            })
          }
        </tr>);
    }

    console.log("CalendarMomentLog : " + getMoment.format("YYYY／MM"));
    return result;
}

export default Calendar;