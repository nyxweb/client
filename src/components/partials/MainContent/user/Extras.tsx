import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import NotFound from 'components/pages/NotFound';

// Partials
import Market from 'components/partials/MainContent/user/extra/Market';
import Auction from 'components/partials/MainContent/user/extra/Auction';
import Storage from 'components/partials/MainContent/user/extra/Storage';
import Resources from 'components/partials/MainContent/user/extra/Resources';
import Quests from 'components/partials/MainContent/user/extra/Quests';

interface Props {}

const Extras: React.FC<Props> = () => {
  return (
    <div className='Extras'>
      <Switch>
        <Route path='/user/extra/market' component={Market} />
        <Route path='/user/extra/auction' component={Auction} />
        <Route path='/user/extra/storage' component={Storage} />
        <Route path='/user/extra/resources' component={Resources} />
        <Route path='/user/extra/quests' component={Quests} />
        <Route path='/user/extra' component={NotFound} />
      </Switch>
    </div>
  );
};

export default Extras;
