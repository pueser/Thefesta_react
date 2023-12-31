import React, { useState } from "react";
import './Years.css'
import moment from 'moment';

function Years(props){
    
  const [getMoment, setMoment]=useState(moment());     
  const today = getMoment;    // today == moment()   입니다.
  const nowyear = today.clone().year();

  let [year,setYear] = useState(nowyear-4);
  let yearsFirstRow = [];
  let yearsSecondRow = [];
  let yearsThirdRow = [];

  const[yearRequreCnt,setYearRequreCnt] = useState(0);

  if(yearRequreCnt<props.yearRequreCnt){
    if(props.getYearRequre==="plus"){
      setYear(year+9);
    }
    else if(props.getYearRequre==="subtract"){
      setYear(year-9);
    }
    setYearRequreCnt(yearRequreCnt+1);
  }

  for ( let i=1; i <= 9; i++) {
    let yearsItem = {key: i, year:year};
    if(i <= 3){
      yearsFirstRow.push(yearsItem);
    }
    else if (i <= 6){
      yearsSecondRow.push(yearsItem);
    }
    else{
      yearsThirdRow.push(yearsItem);
    }
    year++;
    // console.log(i);
  };
  // console.log(yearsFirstRow);
  // console.log(yearsSecondRow);
  // console.log(yearsThirdRow);

  const yearBtnEvent=(event)=>{
  //   alert(event.target.name);
      props.yearBtnEvent(event.target.name);
  };

  return(
    <table id="yearModalTable">
      <thead>
        <tr>
          { yearsFirstRow.map(
            (data, index)=>{
              return(
                <td key={index} className='yearBlock'>
                  <span className='yearText'><button className="yearBtn" onClick={yearBtnEvent.bind(this)} name={data.year} style={{color:"black"}}>{data.year}</button></span>
                </td>
              );
            }
          )}
        </tr>
        <tr>
          { yearsSecondRow.map(
            (data, index)=>{
              if(data.year===nowyear){
                return(
                  <td key={index} className='yearBlock' id="nowYearBlock">
                    <span className='yearText'><button className="yearBtn" onClick={yearBtnEvent.bind(this)} name={data.year} style={{color:"red"}}>{data.year}</button></span>
                  </td>
                );
              }
              return(
                <td key={index} className='yearBlock'>
                  <span className='yearText'><button className="yearBtn" onClick={yearBtnEvent.bind(this)} name={data.year} style={{color:"black"}}>{data.year}</button></span>
                </td>
              );
            }
          )}
        </tr>
        <tr>
          { yearsThirdRow.map(
            (data, index)=>{
              return(
                <td key={index} className='yearBlock'>
                  <span className='yearText'><button className="yearBtn" onClick={yearBtnEvent.bind(this)} name={data.year} style={{color:"black"}}>{data.year}</button></span>
                </td>
              );
            }
          )}
        </tr>
      </thead>
    </table>
  );
}

export default Years;