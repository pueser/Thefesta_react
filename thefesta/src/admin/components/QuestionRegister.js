import axios from "axios";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/Question.css';

function QuestionRegister (){
    //축제Detail에서 contentid 전달받음
    const location = useLocation();
    const contentid = location.state.contentid
    const title = location.state.title
    const [questioncontent, setQuestioncontent] = useState("");
    const [questioncontentlength, setQuestioncontentlength] = useState("0");
    const [id, setId] = useState("");
    const [member, setMember] = useState([]);
    const message = "건의글 등록을 취소하시겠습니까?";


    useEffect(() => {
        getUserInfo();
    }, []);

    //회원 정보 가져오기
    const getUserInfo = () => {
        const loginInfo = Cookies.get('loginInfo');
        if (loginInfo) {
            try {
                const parsedLoginInfo = JSON.parse(decodeURIComponent(loginInfo));
                console.log('logininfo',loginInfo);
                setId(parsedLoginInfo)
                getNickName(parsedLoginInfo)
            } catch (error) {
                console.error('Error parsing loginInfo:', error);
            }
        }
    };

    //회원 닉네임 가져오기
    function getNickName(data){
        console.log("userId 넘겨받은 = ", data)
         axios.get(`http://localhost:9090/admin/memberNickName?id=${data}`)
            
            .then((response)=> {
              console.log("response", response)
              //alert("list 불러오기 성공")
              setMember(response.data)
            })
            .catch((error)=>{
              console.log("error", error)
              //alert("list 불러오기 실패")
            })
    }

   


    const navigate = useNavigate();

    //글 등록
    const questionRegister = (e) => {
        
        //글자수 script 확인
        if(questioncontentlength === "0"){
            alert("내용을 입력하지 않았습니다.")
            return false;
        }

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
            navigate(-1);
            window.scrollTo({ top: 0, behavior: 'smooth' });

        }).catch((error)=>{
            console.log(error)
            alert("축제 건의글 등록에 실패하였습니다. 관리자에게 문의 바람니다.")
        })
    }

    //글 등록 취소
    const cancle = (e) => {
        e.preventDefault();
        if (window.confirm(message)) {
            alert("취소되었습니다.")
            navigate(-1);
        } else {
          return;
        }
    };


    //입력값
    const handlecontent = (evnet) => {
        evnet.preventDefault()
        console.log("글자수 길이 = ", evnet.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length )
        if(evnet.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length > 3000){
            alert("글자수는 1000글자까지 입력 가능합니다.")
        }
        setQuestioncontent(evnet.target.value)
        setQuestioncontentlength(evnet.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length)
        
    }

    return(
        <div className="Question-container">
            <h1 className="Question-title">건의하기</h1>
            <div className="Question-info">
                <h2>{title}</h2>
            </div>
            <div className="Question-userinfo">
                <div className="Question-info">
                    <img className="Question-profileimg" src={`${member.profileImg}`}></img>
                    <span className="Question-nickname">{member.nickname}</span>
                </div>
            </div>
            <form className="Question-form" >
                <div className="Question-content">
                <textarea rows='20'  cols='50'  name="questioncontent" placeholder="내용을 입력해주세요(1000자 이내)" maxLength={1000} onChange={handlecontent}></textarea>
                </div>
                <div className="Question-button">
                    <input type="button" value="등록" onClick={questionRegister}/>
                    <input type="button" value="취소" onClick={cancle}/>
                </div>
            </form>
        </div>
        
    );
}

export default QuestionRegister