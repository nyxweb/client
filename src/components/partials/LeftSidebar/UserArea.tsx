import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import { logout } from 'actions/user';

// Types
import AppState from 'redux/types/app';
import UserState from 'redux/types/user/User';

interface Resource {
  name: string;
  value: number | string;
}

interface Props {
  user: UserState;
  logout: () => void;
}

const UserArea: React.FC<Props> = ({ user, logout }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [menu, setMenu] = useState('');

  useEffect(() => {
    if (user.resources) {
      const result: Resource[] = [];
      for (const key in user.resources) {
        if (!['account', 'storage', 'zen', 'credits'].includes(key)) {
          result.push({ name: key, value: user.resources[key] });
        }
      }

      setResources(result);
    }
  }, [user.resources]);

  return (
    <div className='UserArea'>
      <div className='welcome'>
        <span className='highlight online'>{user.memb___id}</span>
        <button onClick={logout}>Logout</button>
      </div>
      {resources && (
        <div className='resources'>
          {resources.map((res: Resource, i: number) => (
            <div key={i} className={`res ${res.name}`}>
              <span>{res.value}</span>
            </div>
          ))}
        </div>
      )}
      <div className='menu'>
        <div className='section'>
          <div className='title' onClick={() => setMenu('account')}>
            Account
          </div>
          <div className={`content ${menu === 'account' ? 'open' : 'closed'}`}>
            <Link to='/user/account'>Account Info</Link>
            <Link to='/user/account/password'>Change Password</Link>
            <Link to='/user/account/vip'>VIP Status</Link>
            <Link to='/user/account/online'>Online Time</Link>
            <Link to='/user/account/logs'>Logs</Link>
          </div>
        </div>
        <div className='section'>
          <div className='title' onClick={() => setMenu('char')}>
            Character
          </div>
          <div className={`content ${menu === 'char' ? 'open' : 'closed'}`}>
            <Link to='/user/char/reset'>Reset</Link>
            <Link to='/user/char/stats'>Add Stats</Link>
            <Link to='/user/char/name'>Change Name</Link>
            <Link to='/user/char/class'>Change Class</Link>
          </div>
        </div>
        <div className='section'>
          <div className='title' onClick={() => setMenu('extra')}>
            Extra Features
          </div>
          <div className={`content ${menu === 'extra' ? 'open' : 'closed'}`}>
            <Link to='/user/extra/market'>Market</Link>
            <Link to='/user/extra/auction'>Auction</Link>
            <Link to='/user/extra/storage'>Storage</Link>
            <Link to='/user/extra/resources'>Resources</Link>
            <Link to='/user/extra/quests'>Quests</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user
});

export default connect(mapStateToProps, { logout })(UserArea);
