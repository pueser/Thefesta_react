import { Link } from "react-router-dom";

function MemberList({id,statecode,reportnum,finalaccess}){
    console.log("넘겨받은 id", id)
    return(
            <tr >
                <td>{id}</td>
                <td>{statecode}</td>
                <td>{reportnum}</td>
                <td>{finalaccess}</td>
                <td><button><Link to={{ pathname:`/memberDetail/${id}`}}  state ={{statecode: statecode}} >수정</Link></button></td>
            </tr>
    );
}

export default MemberList;