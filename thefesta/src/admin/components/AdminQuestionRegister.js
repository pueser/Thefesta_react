import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";

function AdminQuestionRegister (){
    const location = useLocation();
    const bid = location.state.bid
    const id = location.state.id
    const [adminQuestionContent, setAdminQuestionContent] = useState("");
    const [adminQuestioncontentlength, setAdminQuestioncontentlength] = useState("0");
    const [adminId, setAdminId] = useState("");//관리자 아이디 저장
    const [adminNickname, setAdminNickname] = useState("")// 관리자 닉네임 저장
    const message = "건의글 등록을 취소하시겠습니까?";
    const navigate = useNavigate();

    useEffect(() => {
        getUserInfo();
    }, []);

    //관리자 정보 가져오기
    const getUserInfo = () => {
        const loginInfo = Cookies.get('loginInfo');
        if (loginInfo) {
            try {
                const parsedLoginInfo = JSON.parse(decodeURIComponent(loginInfo));
                console.log('parsedLoginInfo',parsedLoginInfo);
                setAdminId(parsedLoginInfo)
                getNickName(parsedLoginInfo)
            } catch (error) {
                console.error('Error parsing loginInfo:', error);
            }
        }
    };

    //관리자 닉네임 가져오기
    function getNickName(data){
        console.log("userId 넘겨받은 = ", data)
         axios.get(`http://localhost:9090/admin/memberNickName?id=${data}`)
            
            .then((response)=> {
              setAdminNickname(response.data.nickname)
            })
            .catch((error)=>{
              console.log("error", error)
            })
    }

    //글 등록
    const adminQuestionRegister = (e) => {
        e.preventDefault();

        //글자수 script 확인
        if(adminQuestioncontentlength === "0"){
            alert("내용을 입력하지 않았습니다.")
            return false;
        }
        console.log("넘어갈 데이터 = ", adminQuestionContent)

        try {

            const formData = new FormData();
        
            formData.append("bid", bid)
            formData.append("brcontent", adminQuestionContent)
            formData.append("nickname", adminNickname)
            formData.append("id", adminId)

            const response = axios.post('http://localhost:9090/replies/new', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response);
            if (response != null) {
                alert("문의답변이 등록되었습니다.");
            };

            

        } catch (error) {
            alert("게시글 등록에 실패하였습니다. 관리자에게 문의하십시오.");
            console.log(error);
        }
        
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
        console.log("입력된 글자 = ", evnet.target.value )
        if(evnet.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length > 3000){
            alert("글자수는 1000글자까지 입력 가능합니다.")
        }
        setAdminQuestionContent(evnet.target.value)
        setAdminQuestioncontentlength(evnet.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length)
        
    }
    return(
        <div className="adminDetailMain">
            <div className="adminDetailDisplay">
                <div className="adminDetailReportLeft">
                    <div className="adminDetailReportNum">문의번호  :  {bid} 번</div>
                    <div className="adminDetailReportContent">작성자 : {id}</div>
                </div>
                <div className="adminDetailOut"><Link to='/admin/adminQuestion' className="adminLinkBtn">X</Link></div>
            </div>
            <form>
                <div >
                <textarea rows='20'  cols='50'  name="questioncontent" placeholder="내용을 입력해주세요(1000자 이내)" maxLength={1000} className="adminQuestion-content"  onChange={handlecontent}></textarea>
                </div>
            </form>
            <div className="adminDetailBtn">
                <Link to='/admin/adminQuestion'><button className="adminApprove-button" onClick={adminQuestionRegister}>작성완료</button></Link>
                <Link to='/admin/adminQuestion'><button className="adminDelete-button" onClick={cancle}>작성취소</button></Link>
            </div>
        </div>
    );
}
export default AdminQuestionRegister;