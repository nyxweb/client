import React from 'react';

// Partials
import Download from 'components/partials/LeftSidebar/Download';
import Login from 'components/partials/LeftSidebar/Login';
import Menu from 'components/partials/LeftSidebar/Menu';
import TopGuilds from 'components/partials/LeftSidebar/TopGuilds';

interface Props {}

const LeftSidebar: React.FC<Props> = () => {
  return (
    <aside className='LeftSidebar'>
      <Download />
      <Login />
      <Menu />
      <TopGuilds />
    </aside>
  );
};

export default LeftSidebar;
