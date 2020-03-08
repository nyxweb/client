import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import 'dotenv/config';

// Redux
import { connect } from 'react-redux';
import userVerification from 'redux/actions/user/verification';
import ReactNotification from 'react-notifications-component';

// Styles
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'assets/styles/App.scss';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

// Layout
import Navbar from 'components/layout/Navbar';
import Header from 'components/layout/Header';
import LeftSidebar from 'components/layout/LeftSidebar';
import MainContent from 'components/layout/MainContent';
import RightSidebar from 'components/layout/RightSidebar';
import Footer from 'components/layout/Footer';

// Axios auth header
axios.defaults.headers.common.nyxAuthToken = localStorage.nyxToken;

interface Props {
  userVerification: Function;
}

const App: React.FC<Props> = ({ userVerification }) => {
  useEffect(() => {
    userVerification();
  }, [userVerification]);

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Header />
        <div className='Container'>
          <LeftSidebar />
          <MainContent />
          <RightSidebar />
        </div>
        <Footer />
      </div>
      <ReactNotification />
    </Router>
  );
};

export default connect(null, { userVerification })(App);
