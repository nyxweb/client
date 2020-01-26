import React from 'react';

// Assets
import SoulMaster from 'assets/images/sm.png';

// Components
import Form from './login/Form';

const Login: React.FC = () => {
  return (
    <div className='Login'>
      <div></div>
      <Form />
      <div className='logo'>
        <img src={SoulMaster} alt='muonline' />
      </div>
    </div>
  );
};

export default Login;
