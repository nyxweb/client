import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Reusables
import Resource from 'components/reusables/particles/Resource';

// Actions
import { logout } from 'actions/user';

// Types
import AppState from 'redux/types/app';
import IResource from 'redux/types/reusables/Resource';

interface Props {}

const UserArea: React.FC<Props> = () => {
  const [resources, setResources] = useState<IResource[]>([]);
  const [menu, setMenu] = useState('');
  const dispatch = useDispatch();

  const account = useSelector((state: AppState) => state.user.account.info);

  useEffect(() => {
    setResources(JSON.parse(account!.resources.list));
  }, [account!.resources]);

  const doLogout = () => dispatch(logout());

  return (
    <div className='UserArea'>
      <div className='welcome'>
        <span
          className={`highlight ${
            account!.status?.ConnectStat === 1 ? 'online' : 'offline'
          }`}
        >
          {account!.memb___id}
        </span>
        <button onClick={doLogout}>Logout</button>
      </div>
      <div className='resources'>
        {resources.map((res: IResource, i: number) => (
          <Resource key={i} name={res.name} value={res.value} />
        ))}
      </div>
      <div className='menu'>
        <div className='section'>
          <div className='title' onClick={() => setMenu('account')}>
            Account
          </div>
          <div className={`content ${menu === 'account' ? 'open' : 'closed'}`}>
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

export default UserArea;
