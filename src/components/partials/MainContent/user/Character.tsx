import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import NotFound from 'components/pages/NotFound';

// Partials
import Reset from 'components/partials/MainContent/user/char/Reset';
import Stats from 'components/partials/MainContent/user/char/Stats';
import Name from 'components/partials/MainContent/user/char/Name';
import Class from 'components/partials/MainContent/user/char/Class';

interface Props {}

const Character: React.FC<Props> = () => {
  return (
    <div className='UserCharacter'>
      <Switch>
        <Route path='/user/char/reset' component={Reset} />
        <Route path='/user/char/stats' component={Stats} />
        <Route path='/user/char/name' component={Name} />
        <Route path='/user/char/class' component={Class} />
        <Route path='/user/char' component={NotFound} />
      </Switch>
    </div>
  );
};

export default Character;
