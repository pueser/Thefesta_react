import '../App.css';
import Kakaomap from "../components/Kakaomap";
function Main() {
    return (
        <div>
            <Kakaomap></Kakaomap>
            <div className='div'>
                <div className='red'>
                    <p>축제이름</p>
                    <p>축제기간 2022년 12월 24일 - 2023년 02월 12일</p>
                    <p>지역ll</p>
                </div>
            </div>
            <hr className='hr' />
        </div>
    );
}

export default Main;