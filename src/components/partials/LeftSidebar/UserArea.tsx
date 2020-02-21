import React from 'react';
import { connect } from 'react-redux';

// Actions
import userLogout from 'actions/user/logout';
import AppState from 'redux/types/app';

// Types
import MEMB_INFO from 'redux/types/user/MEMB_INFO';

interface Props {
  user: MEMB_INFO | null;
  userLogout: Function;
}

const UserArea: React.FC<Props> = ({ user, userLogout }) => {
  return (
    <div>
      <div>welcome {user?.memb___id}</div>
      <div className='div'>
        <button onClick={() => userLogout()}>Logout</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user
});

export default connect(mapStateToProps, { userLogout })(UserArea);
