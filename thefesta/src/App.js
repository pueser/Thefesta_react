import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./common/Footer";
import Header from "./common/Header";
import Detailfood from './food/Detailfood';
import List from './food/List';
import Login from './food/Login';
import Scheduler from './scheduler/scheduler';
<<<<<<< HEAD
import Detail from './festival/Detail';
import Main from './festival/Main';

=======
import Main from './main/Main';
>>>>>>> 659e923005355a8a3b4ad049080ab98928dd6dc7
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Main />
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
