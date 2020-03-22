import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Partials
import Account from 'components/partials/MainContent/user/Account';
import Character from 'components/partials/MainContent/user/Character';
import Extras from 'components/partials/MainContent/user/Extras';
import Admin from 'components/partials/MainContent/user/Admin';

interface Props {}

const UserArea: React.FC<Props> = () => {
  return (
    <div className='UserArea'>
      <Switch>
        <Route path='/user/account' component={Account} />
        <Route path='/user/char' component={Character} />
        <Route path='/user/extra' component={Extras} />
        <Route path='/user/admin' component={Admin} />
      </Switch>
    </div>
  );
};

export default UserArea;
