import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import NotFound from 'components/pages/NotFound';

// Partials
import Password from './account/Password';
import VIP from './account/VIP';
import Online from './account/Online';
import Logs from './account/Logs';

interface Props {}

const AccountMain: React.FC<Props> = () => {
  return (
    <div className='Account'>
      <Switch>
        <Route path='/user/account/password' component={Password} />
        <Route path='/user/account/vip' component={VIP} />
        <Route path='/user/account/online' component={Online} />
        <Route path='/user/account/logs' component={Logs} />
        <Route path='/user/account' component={NotFound} />
      </Switch>
    </div>
  );
};

export default AccountMain;
