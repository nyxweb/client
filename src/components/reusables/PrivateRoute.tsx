import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppState from 'redux/types/app';

const PrivateRoute: React.FC<RouteProps> = props => {
  const logged = useSelector((state: AppState) => state.user.account.verified);

  return logged ? (
    <Route {...props} />
  ) : logged === false ? (
    <Redirect to='/login' />
  ) : (
    <></>
  );
};

export default PrivateRoute;
