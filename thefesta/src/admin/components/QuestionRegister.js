import axios from "axios";
//import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/Question.css';

function QuestionRegister (){
    //축제Detail에서 contentid 전달받음
    const location = useLocation();
    const contentid = location.state.contentid
    const title = location.state.title
    const [questioncontent, setQuestioncontent] = useState("");
    const [id, setId] = useState("");
    const [member, setMember] = useState([]);
    const message = "건의글 등록을 취소하시겠습니까?";


    // useEffect(() => {
    //     getUserInfo();
    // }, []);

    // 회원 정보 가져오기
    // const getUserInfo = () => {
    //     const loginInfo = Cookies.get('loginInfo');
    //     if (loginInfo) {
    //         try {
    //             const parsedLoginInfo = JSON.parse(decodeURIComponent(loginInfo));
    //             console.log('logininfo',loginInfo);
    //             //setUserId(parsedLoginInfo.id);
    //             console.log('id:', parsedLoginInfo.id);
    //             console.log('userId:', parsedLoginInfo.id);
    //             setId(parsedLoginInfo.id)
    //             getNickName(parsedLoginInfo.id)
    //         } catch (error) {
    //             console.error('Error parsing loginInfo:', error);
    //         }
    //     }
    // };

    //회원 닉네임 가져오기
    // function getNickName(data){
    //     console.log("userId 넘겨받은 = ", data)
    //      axios.get(`http://localhost:9090/admin/memberNickName?id=${data}`)
            
    //         .then((response)=> {
    //           console.log("response", response)
    //           //alert("list 불러오기 성공")
    //           setMember(response.data)
    //         })
    //         .catch((error)=>{
    //           console.log("error", error)
    //           //alert("list 불러오기 실패")
    //         })
    // }

   
    const handlecontent = (evnet) => {
        evnet.preventDefault()
        setQuestioncontent(evnet.target.value)
    }

    const navigate = useNavigate();

    //글 등록
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

    console.log("member", member)
    return(
     
        <div className="Question-container">
            <h1 className="Question-title">건의하기</h1>
            <div className="Question-info">
                <h2>{title}</h2>
                <div className="Question-userinfo">
                    <img className="Question-profileimg" src={`${member.profileImg}`}></img>
                    <h3 className="Question-nickname">{member.nickname}</h3>
                </div>
            </div>
            <form className="Question-form">
                <div className="Question-content">
                    <textarea rows='20'  cols='50'  name="questioncontent" placeholder="내용을 입력해주세요(1500자 이내)" onChange={handlecontent}></textarea>
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