import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import News from 'components/pages/News';
import Register from 'components/pages/Register';
import Download from 'components/pages/Download';
import Rankings from 'components/pages/Rankings';
import Login from 'components/pages/Login';
import UserArea from 'components/pages/UserArea';
import NotFound from 'components/pages/NotFound';

// Reusables
import PrivateRoute from 'components/reusables/PrivateRoute';

interface Props {}

const Router: React.FC<Props> = () => {
  return (
    <div className='Router'>
      <Switch>
        <Route path='/' exact component={News} />
        <Route path='/register' exact component={Register} />
        <Route path='/download' exact component={Download} />
        <Route path='/rankings' exact component={Rankings} />
        <Route path='/login' exact component={Login} />
        <PrivateRoute path='/user' component={UserArea} />
        <Route path='/' component={NotFound} />
      </Switch>
    </div>
  );
};

export default Router;
