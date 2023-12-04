import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./common/Footer";
import Header from "./common/Header";
import Detailfood from './food/Detailfood';
import List from './food/List';
import Login from './food/Login';
import Scheduler from './scheduler/scheduler';
import Detail from './festival/Detail';
import Main from './festival/Main';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path='/food/list' element={<List />} /> */}
        <Route path='/food/detail/:contentid' element={<Detailfood />} />
        <Route path='/member/loginPost' element={<Login />} />
        <Route path='/scheduler' element={<Scheduler />} />
        <Route path='/festival/detail/:contentid' element={<Detail />} />
        <Route path='/festival/list' element={<Main />} />
        {/* <Route path='/*' element={<List />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
