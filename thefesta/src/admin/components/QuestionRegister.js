import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function QuestionRegister (){
    //Detail에서 contentid 전달받음
    const location = useLocation();
    const contentid = location.state.contentid
    const [questioncontent, setQuestioncontent] = useState("");
    const [id, setId] = useState("");

    const handlecontent = (evnet) => {
        evnet.preventDefault()
        setQuestioncontent(evnet.target.value)
    }
    const handlewriter = (evnet) => {
        evnet.preventDefault()
        setId(evnet.target.value)
    }

    const navigate = useNavigate();
    const questionRegister = (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append('questioncontent', questioncontent)
        formData.append('id', id);
        formData.append('contentid', contentid);
        

        axios({
            method: "post",
            url : 'http://localhost:9090/admin/questionRegister',
            data: formData,
        }).then((response)=>{
            console.log(response);
            alert("축제 건의글 등록되었습니다..");
            navigate("/");

        }).catch((error)=>{
            console.log(error)
            alert("축제 건의글 등록에 실패하였습니다. 관리자에게 문의 바람니다.")
        })
    }

    return(
        <div>
            <h1>작성하기</h1>
            <form>
                <div>
                    <label>Content</label>
                    <textarea rows='3' name="questioncontent" onChange={handlecontent}></textarea>
                    <label>Writer</label>
                    <input type="text" name="id" onChange={handlewriter}></input>
                </div>
                <Link to='/'><input type="button" value="글등록" onClick={questionRegister} /></Link>
            </form>
        </div>
    );
}
export default QuestionRegister