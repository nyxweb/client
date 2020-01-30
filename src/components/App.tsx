import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from 'redux/store';

// Styles
import 'assets/styles/App.scss';

// Layout
import Navbar from 'components/layout/Navbar';
import Header from 'components/layout/Header';
import LeftSidebar from 'components/layout/LeftSidebar';
import MainContent from 'components/layout/MainContent';
import RightSidebar from 'components/layout/RightSidebar';
import Footer from 'components/layout/Footer';

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
