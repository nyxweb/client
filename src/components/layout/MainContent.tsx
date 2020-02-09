import React from 'react';

// Partials
import TopPlayers from 'components/partials/MainContent/TopPlayers';

// Router
import Router from 'components/pages/Router';

interface Props {}

const MainContent: React.FC<Props> = () => {
  return (
    <main className='MainContent'>
      <TopPlayers />
      <Router />
    </main>
  );
};

export default MainContent;
