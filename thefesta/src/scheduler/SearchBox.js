import React, { useState } from "react";

function SearchBox(props){

    const[keyword, setKeyword] = useState("");

    const handleKeywordValue = (e)=>{
        // alert(e.target.value);
        setKeyword(e.target.value);
    }
    const inputKeywordValue = (e) => {
        if(e.key==='Enter'){
            // alert(keyword);
            props.setKeyword(keyword)
        }
    }

    return(
        <div id='searchLine'>
          <input id='searchBox' placeholder="원하시는 축제를 입력해주세요." onChange={handleKeywordValue} onKeyDown={inputKeywordValue}></input>
        </div>
    );
}

export default SearchBox;