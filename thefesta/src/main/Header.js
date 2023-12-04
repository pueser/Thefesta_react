import './Header.css';
import hbgBtn from '../imgs/hbgBtn.svg';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className='header'>
            <div className='header_hbgBtn'>
                <img src={hbgBtn} alt='hamburger button' />
            </div>
            <div className='header_logo hover' >
                <h1>THE<br />FESTA</h1>
            </div>
            <div className='header_menu hover'>
                <p className='menu'>축제</p>
                <p className='menu scheduler'>스케줄러</p>
                <p className='menu'>톡톡</p>
                {/* <li><Link to='/'>Main</Link></li>
                <li><Link to='/scheduler'>Scheduler</Link></li>
                <li><Link to='/board'>Board</Link></li> */}
            </div>
            <div className='header_member hover'>
                <p className='member'>Login</p>
                <p className='member'>Join</p>
            </div>
        </div>
    ); <ul>

    </ul>
}

export default Header;