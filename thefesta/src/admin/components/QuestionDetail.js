import { Link, useLocation, useParams } from "react-router-dom";

function QuestionDetail (){
    const {contentid} = useParams();
    const location = useLocation();
    const questioncontent = location.state.questioncontent
    console.log(contentid)
    console.log("questioncontent", questioncontent)
    return(
        <div>
            <p><Link to={{pathname:`/Question/${contentid}`}}>X</Link></p> 
            <table>
                <thead>
                    <tr>
                        <th>건의내용</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>{questioncontent}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button>확인</button>
            </div>
        </div>
    );
}
export default QuestionDetail;