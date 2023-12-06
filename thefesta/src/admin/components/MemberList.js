import { Link } from "react-router-dom";

function MemberList({id,statecode,totalreportnum,finalaccess, reportnum}){
    return(
            <tr >
                <td>{id}</td>
                <td>{statecode}</td>
                <td>{totalreportnum}</td>
                <td>{finalaccess}</td>
                <td><button><Link to={{ pathname:`/memberDetail/${id}`}}  state ={{statecode: statecode, finalaccess: finalaccess, reportnum : reportnum}} >수정</Link></button></td>
            </tr>
    );
}

export default MemberList;