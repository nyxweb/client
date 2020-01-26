import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from 'redux/store';

// Styles
import 'assets/styles/App.scss';

// Components
import Admin from './admin/Admin';
import Client from './client/Client';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <Switch>
            <Route path='/admin' component={Admin} />
            <Route path='/' component={Client} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
