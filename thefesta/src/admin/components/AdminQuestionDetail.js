import { Link, useLocation } from "react-router-dom"

function AdminQuestionDetail (){
    const location = useLocation();
    const bid = location.state.bid
    const id = location.state.id
    const bcontent = location.state.bcontent


    return(
        <div className="adminDetailMain">
            <div className="adminDetailDisplay">
                <div className="adminDetailReportLeft">
                    <div className="adminDetailReportNum">문의번호  :  {bid}번</div>
                    <div className="adminDetailReportContent">문의내용</div>
                </div>
                <div className="adminDetailOut"><Link to='/admin/adminQuestion' className="adminLinkBtn">X</Link></div>
            </div>
            <div className="adminReportContent">{bcontent}</div>
            {/* <div className="adminDetailBtn">
                <button className="adminRgister-button" id="adminBtntd2"><Link to={'/admin/adminQuestionRegister'} state={{bid: bid, id: id}} className="adminLinkBtn">답변하기</Link></button>
            </div> */}
        </div>
    )
}
export default AdminQuestionDetail