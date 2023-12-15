import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BoardList from '../Boards/BoardList';

const BoardPage = () => {

  useEffect(() => {

  }, []);

  return (
    <>
      <BoardList></BoardList>
    </>
  );
};

export default BoardPage;