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
import MEMB_INFO from 'redux/types/user/MEMB_INFO';

interface Props {
  user: MEMB_INFO;
}

const LeftSidebar: React.FC<Props> = ({ user }) => {
  return (
    <aside className='LeftSidebar'>
      <Download />
      {user.memb___id ? <UserArea /> : <Login />}
      <Menu />
      <TopGuilds />
    </aside>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user
});

export default connect(mapStateToProps)(LeftSidebar);
