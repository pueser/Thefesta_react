import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <div className="header">
            <div className="header_logo">
                <h1>The<br />Festa</h1>
            </div>
            <div className="header_menu">
                <Link to={"/food/list"}>축제</Link >
                <Link to={"/"}>스케줄러</Link >
                <Link to={"/"}>톡톡</Link >
            </div>
            <div className="header_member">
                <Link to={"/member/loginPost"}>Login</Link >
                <Link to={"/"}>Join</Link >
            </div>
        </div>
    );
}

export default Header;