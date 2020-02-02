import React from 'react';

interface Props {}

const Register: React.FC<Props> = () => {
  return (
    <div className='Register'>
      <div className='row'>
        <div className='title'>Username</div>
        <input
          className='field'
          type='text'
          name='username'
          placeholder='letters and digits only'
        />
      </div>
      <div className='row' style={{ paddingBottom: 0 }}>
        <div className='title'>Password</div>
        <input
          className='field'
          type='password'
          name='password'
          placeholder='letters and digits only'
        />
      </div>
      <div className='row'>
        <div className='title'>Repeat Password</div>
        <input
          className='field'
          type='password'
          name='repassword'
          placeholder='repeat password'
        />
      </div>
      <div className='row' style={{ paddingBottom: 0 }}>
        <div className='title'>E-Mail Address</div>
        <input
          className='field'
          type='text'
          name='email'
          placeholder='valid e-mail address'
        />
      </div>
      <div className='row center'>
        <button>Register</button>
      </div>
    </div>
  );
};

export default Register;
