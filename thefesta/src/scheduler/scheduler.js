import { Icon } from '@iconify/react';
import moment from 'moment';
import { useState } from 'react';
import Calendar from './Calendar.js';
import CountySelectBox from './CountySelectBox.js';
import DistrictSelectBox from './DistrictSelectBox.js';
import MonthModal from './MonthModal.js';
import './Scheduler.css';
import SearchBox from './SearchBox.js';
import YearModal from './YearModal.js';

function Scheduler(){
  const [getMoment, setMoment]=useState(moment);     
  const today = getMoment;    // today == moment()   입니다.
  const [calendarShow, setCalendarShow]=useState(true);
  const [yearModalShow, setYearModalShow] = useState(false);
  
  const handleyearmodal = (modalRequre) => {
    setYearModalShow(modalRequre);
    if(modalRequre===true){
      setCalendarShow(false);
    }
  };
  
  const [getYear, setYear] = useState("");

  const handleyear = (yearRequre) => {
    setYear(yearRequre);
    // alert("getMonth : " + getMonth + ", monthRequre : "+ monthRequre + ", getMoment.clone() : " +getMoment.clone().month(monthRequre));
    setMoment(getMoment.clone().year(yearRequre));
  };

  const [monthModalShow, setMonthModalShow] = useState(false);
  
  // const handlemonthmodal = (modalRequre) => {
  //   setMonthModalShow(modalRequre);
  // };

  const [getMonth, setMonth] = useState("");

  const [getCnt, setCnt] = useState(0);

  const handlemonth = (monthRequre) => {
    setMonth(monthRequre);
    if(monthRequre === "plus"){
      setMoment(getMoment.clone().add(1, 'month'));
    }
    else if(monthRequre === "subtract"){
      setMoment(getMoment.clone().subtract(1, 'month'));
    }
    else{
      // alert("getMonth : " + getMonth + ", monthRequre : "+ monthRequre + ", getMoment.clone() : " +getMoment.clone().month(monthRequre));
      setMoment(getMoment.clone().month(monthRequre-1));
    }
    setCnt(getCnt+1);
  };

  const [selectedCountyValue,setSelectedCountyvalue] = useState("0");
  const [selectedDistrictValue,setSelectedDistrictvalue] = useState("0");
  const [districtAbled,setDistrictAbled] = useState(true);
  // alert(selectedDistrictValue);

  const [keyword,setKeyword] = useState("");

  return(
    <div className="scheduleBox">
      <div id='filterLine'>
        <div id='selectLine'>
          <div className='selectMenu' id='countyMenu'>
            {/* 광역시／
            <Icon icon="fad:digital-colon"/> */}
            {/* <select className="selectOptions" id="countyOptions">
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
            </select> */}
            <CountySelectBox 
              setSelectedCountyvalue={setSelectedCountyvalue} 
              setSelectedDistrictvalue={setSelectedDistrictvalue} 
              setDistrictAbled={setDistrictAbled}
            />
          </div>
          <div className='selectMenu' id='districtMenu' >
            {/* 축제 종류
            <Icon icon="fad:digital-colon"/> */}
            {/* <select className="selectOptions" id="districtOptions" >
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
            </select> */}
            <DistrictSelectBox 
              selectedCountyValue={selectedCountyValue} 
              setSelectedDistrictvalue={setSelectedDistrictvalue} 
              districtAbled={districtAbled}
            />
          </div>
        </div>
        <SearchBox setKeyword={setKeyword}/>
      </div>
      <div className='scheduler'>
        <div className="control">
          <button onClick={()=>handlemonth("subtract")} ><Icon icon="ooui:next-rtl"/></button>
          <button onClick={()=>handleyearmodal(true)}>{today.format('YYYY 년 MM 월')}</button>   {/* YYYY는 년도 MM 은 달 입니다. */}
          <button onClick={()=>handlemonth("plus")} ><Icon icon="ooui:next-ltr"/></button>
        </div>
        { 
          yearModalShow && <YearModal 
            className="momentModal" 
            yearModalShow={yearModalShow} 
            setYearModalShow={setYearModalShow}  
            setMonthModalShow={setMonthModalShow}
            handleyear={handleyear}
            setCalendarShow={setCalendarShow}
          /> 
        }
        { 
          monthModalShow && <MonthModal
            className="momentModal" 
            setMonthModalShow={setMonthModalShow} 
            handlemonth={handlemonth} 
            setCalendarShow={setCalendarShow}
          /> 
        }
        {calendarShow&&<table>
          <thead>
            <tr>
              <td style={{color:'red'}} className='dayBlock'>일</td>
              <td className='dayBlock'>월</td>
              <td className='dayBlock'>화</td>
              <td className='dayBlock'>수</td>
              <td className='dayBlock'>목</td>
              <td className='dayBlock'>금</td>
              <td style={{color:'red'}} className='dayBlock'>토</td>
            </tr>
          </thead>
          <tbody>
            <Calendar 
              handleyear={getYear} 
              handlemonth={getMonth} 
              getCnt={getCnt} 
              selectedCountyValue={selectedCountyValue} 
              selectedDistrictValue={selectedDistrictValue}
              keyword={keyword}
            />
          </tbody>
        </table>}
        {calendarShow&&<div id='document'>
          <div><Icon icon="clarity:circle-line"></Icon>시작하는 축제</div>
          <div>/</div>
          <div><Icon icon="iconamoon:star"></Icon>진행중인 축제</div>
          <div>/</div>
          <div><Icon icon="ri:square-line"></Icon>종료하는 축제</div>
        </div>}
      </div>
    </div>
  );
}
export default Scheduler;