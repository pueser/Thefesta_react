import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminQuestion from './admin/components/AdminQuestion';
import AdminQuestionRegister from './admin/components/AdminQuestionRegister';
import Board from './admin/components/Board';
import Festa from './admin/components/Festa';
import FestaQuestion from './admin/components/FestaQuestion';
import FestaQuestionDetail from './admin/components/FestaQuestionDetail';
import FestaQuestionRegister from './admin/components/FestaQuestionRegister';
import Member from './admin/components/Member';
import MemberDetail from './admin/components/MemberDetail';
import MemberReport from './admin/components/MemberReport';
import Report from './admin/components/Report';
import ReportDetail from './admin/components/ReportDetail';
import Detail from './festival/routes/Detail';
import LikeList from './festival/routes/LikeList';
import ReplyReport from './festival/routes/ReplyReport';
import Detailfood from './food/Detailfood';
import Footer from './main/Footer';
import Header from './main/Header';
import Main from './main/Main';
import Join from './member/Join';
import Login from './member/Login';
import MemInfoReset from './member/MemInfoReset';
import MyPage from './member/MyPage';
import PwReset from './member/PwReset';
import Withdrawal from './member/Withdrawal';
import Scheduler from './scheduler/scheduler';

function App() {
  return (
    <div id='adminapp'>
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
          <Route
            path='/festival/detail/:contentid/:page?'
            element={<Detail />}
          />
          <Route path='/festival/replyReport' element={<ReplyReport />} />
          <Route path='/food/detail/:contentid' element={<Detailfood />} />
          <Route path='/scheduler' element={<Scheduler />} />
          <Route path='/member/likeList/:id' element={<LikeList />} />

          <Route path='/admin/member' element={<Member />} />
          <Route path='/admin/report' element={<Report />} />
          <Route path='/admin/festa' element={<Festa />} />
          <Route path='/admin/board' element={<Board />} />
          <Route path='/admin/memberDetail/:id' element={<MemberDetail />} />
          <Route
            path='/admin/memberReport/:reportid'
            element={<MemberReport />}
          />
          <Route
            path='/admin/reportDetail/:reportid'
            element={<ReportDetail />}
          />
          <Route
            path='/admin/festaQuestion/:contentid'
            element={<FestaQuestion />}
          />
          <Route
            path='/admin/festaQuestionDetail/:contentid'
            element={<FestaQuestionDetail />}
          />
          <Route
            path='/admin/festaQuestionRegister'
            element={<FestaQuestionRegister />}
          />
          <Route path='/admin/adminQuestion' element={<AdminQuestion />} />
          <Route
            path='/admin/adminQuestionRegister'
            element={<AdminQuestionRegister />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
