import React, { useState, FormEvent } from 'react';

// Reusables
import { Input, Button } from 'components/reusables/form';

// Actions
import { Login } from 'redux/actions/admin';

const Form: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const adminLogin = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
  };

  return (
    <div className='Form-Container'>
      <div className='title'>Admin Panel</div>
      <form className='Form' onSubmit={adminLogin}>
        <Input
          type='text'
          placeholder='Username'
          value={username}
          change={setUsername}
        />
        <Input
          type='text'
          placeholder='Password'
          value={password}
          change={setPassword}
        />
        <Button value='Login' looks='secondary' loading={loading} />
      </form>
      <div className='copyright'>Nyx Admin Panel 2020</div>
    </div>
  );
};

export default Form;
