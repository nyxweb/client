import React from 'react';
import { connect } from 'react-redux';

// Partials
import Download from 'components/partials/LeftSidebar/Download';
import Login from 'components/partials/LeftSidebar/Login';
import UserArea from 'components/partials/LeftSidebar/UserArea';
import Menu from 'components/partials/LeftSidebar/Menu';
import TopGuilds from 'components/partials/LeftSidebar/TopGuilds';

// Types
import AppState from 'redux/types/app';

interface Props {
  username: null | string;
}

const LeftSidebar: React.FC<Props> = ({ username }) => {
  return (
    <aside className='LeftSidebar'>
      <Download />
      {username ? <UserArea /> : <Login />}
      <Menu />
      <TopGuilds />
    </aside>
  );
};

const mapStateToProps = (state: AppState) => ({
  username: state.login.username
});

export default connect(mapStateToProps)(LeftSidebar);
