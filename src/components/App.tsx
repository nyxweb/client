import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import 'dotenv/config';

// Redux
import { connect } from 'react-redux';
import userVerification from 'redux/actions/user/verification';

// Styles
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'assets/styles/App.scss';

// Layout
import Navbar from 'components/layout/Navbar';
import Header from 'components/layout/Header';
import LeftSidebar from 'components/layout/LeftSidebar';
import MainContent from 'components/layout/MainContent';
import RightSidebar from 'components/layout/RightSidebar';
import Footer from 'components/layout/Footer';
import AppState from 'redux/types/app';

// Axios auth header
axios.defaults.headers.common.nyxAuthToken = localStorage.nyxToken;

interface Props {
  username: null | string;
  userVerification: Function;
}

const App: React.FC<Props> = ({ username, userVerification }) => {
  useEffect(() => {
    username && userVerification();
  }, [username, userVerification]);

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
    </Router>
  );
};

const mapStateToProps = (state: AppState) => ({
  username: state.login.username
});

export default connect(mapStateToProps, { userVerification })(App);
