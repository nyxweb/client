import React from 'react';
import { Route } from 'react-router-dom';

// Components
import Login from './Login';

const Admin: React.FC = () => {
  return (
    <div className='Admin'>
      <Route path='/admin/login' component={Login} />
      <Route path='/admin/home' component={() => <div>meh</div>} />
    </div>
  );
};

export default Admin;
