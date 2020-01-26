import React, { useState } from 'react';

// Reusables
import { Input, Button } from 'components/reusables/form';

const Form: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='Form-Container'>
      <div className='title'>Admin Panel</div>
      <form className='Form'>
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
        <Button value='Login' looks='primary' />
      </form>
      <div className='copyright'>Nyx Admin Panel 2020</div>
    </div>
  );
};

export default Form;
