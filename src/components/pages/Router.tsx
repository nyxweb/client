import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import News from './News';
import Register from './Register';
import Download from './Download';
import Rankings from './Rankings';
import Character from './Character';
import Guild from './Guild';
import Login from './Login';
import UserArea from './UserArea';
import NotFound from './NotFound';

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
        <Route path='/char/:name' exact component={Character} />
        <Route path='/guild/:name' exact component={Guild} />
        <Route path='/login' exact component={Login} />
        <PrivateRoute path='/user' component={UserArea} />
        <Route path='/' component={NotFound} />
      </Switch>
    </div>
  );
};

export default Router;
