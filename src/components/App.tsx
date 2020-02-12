import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import 'dotenv/config';

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

// Partials
import Loader from 'components/partials/Loader';
import ReactNotification from 'react-notifications-component';

// Redux
import { connect } from 'react-redux';
import { verification } from 'actions/user';

// Axios auth header
axios.defaults.headers.common.nyxAuthToken = localStorage.nyxToken;

interface Props {
  verification: Function;
}

const App: React.FC<Props> = ({ verification }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verification(setLoading);
  }, [verification]);

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
        <Loader active={loading} styles='dark' />
      </div>
      <ReactNotification />
    </Router>
  );
};

export default connect(null, { verification })(App);
