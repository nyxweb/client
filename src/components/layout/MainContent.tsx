import React from 'react';

// Partials
import TopPlayers from 'components/partials/MainContent/TopPlayers';

// Router
import Router from 'components/pages/Router';
import { useSelector } from 'react-redux';
import AppState from 'redux/types/app';

interface Props {}

const MainContent: React.FC<Props> = () => {
  const hof = useSelector((state: AppState) => state.rankings.hof);

  return (
    <main className='MainContent'>
      {hof.loading || hof.list ? <TopPlayers /> : ''}
      <Router />
    </main>
  );
};

export default MainContent;
