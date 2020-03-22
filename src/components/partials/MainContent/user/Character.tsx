import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import NotFound from 'components/pages/NotFound';

// Partials
import Reset from './char/Reset';
import Stats from './char/Stats';
import Name from './char/Name';
import Class from './char/Class';

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
