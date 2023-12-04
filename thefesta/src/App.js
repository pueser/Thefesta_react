import logo from './logo.svg';
import Header from "./common/Header";
import Footer from "./common/Footer";
import List from './food/List';
import Detailfood from './food/Detailfood';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './food/Login';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/food/list' element={<List />} />
        <Route path='/food/detail/:contentid' element={<Detailfood />} />
        <Route path='/member/loginPost' element={<Login />} />
        <Route path='/*' element={<List />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
