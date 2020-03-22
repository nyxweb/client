import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppState from 'redux/types/app';

// Pages
import Login from 'components/pages/Login';

const PrivateRoute: React.FC<RouteProps> = props => {
  const logged = useSelector((state: AppState) => state.user.account.verified);

  return logged ? <Route {...props} /> : <Login />;
};

export default PrivateRoute;
