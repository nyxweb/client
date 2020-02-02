import React from 'react';
import { connect } from 'react-redux';

// Actions
import userLogout from 'redux/actions/user/logout';
import AppState from 'redux/types/app';

interface Props {
  username: null | string;
  userLogout: Function;
}

const UserArea: React.FC<Props> = ({ username, userLogout }) => {
  return (
    <div>
      <div>welcome {username}</div>
      <div className='div'>
        <button onClick={() => userLogout()}>Logout</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  username: state.login.username
});

export default connect(mapStateToProps, { userLogout })(UserArea);
