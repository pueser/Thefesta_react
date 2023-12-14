import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './main/Footer';
import Header from './main/Header';
import Detailfood from './food/Detailfood';
import Scheduler from './scheduler/scheduler';
import Login from './member/Login';
import Main from './main/Main';
import Detail from './festival/routes/Detail';
import Join from './member/Join';
import PwReset from './member/PwReset';
import MyPage from './member/MyPage';
import Withdrawal from './member/Withdrawal';
import MemInfoReset from './member/MemInfoReset';
import Member from './admin/components/Member';
import Report from './admin/components/Report';
import Festa from './admin/components/Festa';
import Board from './admin/components/Board';
import MemberDetail from './admin/components/MemberDetail';
import MemberReport from './admin/components/MemberReport';
import ReportDetail from './admin/components/ReportDetail';
import Question from './admin/components/Question';
import QuestionDetail from './admin/components/QuestionDetail';
import QuestionRegister from './admin/components/QuestionRegister';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/festival/:pageNum/:keyword?' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/pwreset' element={<PwReset />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/withdrawal' element={<Withdrawal />} />
        <Route path='/MemInfoReset' element={<MemInfoReset />} />
        <Route path='/festival/detail/:contentid/:page?' element={<Detail />} />
        <Route path='/food/detail/:contentid' element={<Detailfood />} />
        <Route path='/scheduler' element={<Scheduler />} />

        <Route path='/admin/member' element={<Member />} />
        <Route path='/admin/report' element={<Report />} />
        <Route path='/admin/festa' element={<Festa />} />
        <Route path='/admin/board' element={<Board />} />
        <Route path='/admin/memberDetail/:id' element={<MemberDetail />} />
        <Route path='/admin/memberReport/:reportid' element={<MemberReport />} />
        <Route path='/admin/reportDetail/:reportid' element={<ReportDetail />} />
        <Route path='/admin/Question/:contentid' element={<Question />} />
        <Route path='/admin/QuestionDetail/:contentid' element={<QuestionDetail />} />
        <Route path='/admin/QuestionRegister' element={<QuestionRegister />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
