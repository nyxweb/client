import React from 'react';
import { useSelector } from 'react-redux';

// Partials
import Download from 'components/partials/LeftSidebar/Download';
import Login from 'components/partials/LeftSidebar/Login';
import UserArea from 'components/partials/LeftSidebar/UserArea';
import Menu from 'components/partials/LeftSidebar/Menu';
import TopGuilds from 'components/partials/LeftSidebar/TopGuilds';

// Types
import AppState from 'redux/types/app';

interface Props {}

const LeftSidebar: React.FC<Props> = () => {
  const account = useSelector((state: AppState) => state.user.account.info);

  return (
    <aside className='LeftSidebar'>
      <Download />
      {account ? <UserArea /> : <Login />}
      <Menu />
      <TopGuilds />
    </aside>
  );
};

export default LeftSidebar;
