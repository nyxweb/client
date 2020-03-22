import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import NotFound from 'components/pages/NotFound';

// Partials
import News from './admin/News';
import Config from './admin/Config';
import Adder from './admin/Adder';

interface Props {}

const Admin: React.FC<Props> = () => {
  return (
    <div className='Admin'>
      <Switch>
        <Route path='/user/admin/news' component={News} />
        <Route path='/user/admin/config' component={Config} />
        <Route path='/user/admin/adder' component={Adder} />
        <Route path='/user/admin' component={NotFound} />
      </Switch>
    </div>
  );
};

export default Admin;
