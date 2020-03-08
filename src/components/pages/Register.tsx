import React, { useState } from 'react';

// Actions
import { register } from 'actions/user';

interface Props {
  register: Function;
}

const Register: React.FC<Props> = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    repassword: '',
    email: ''
  });

  const typer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register(form);
  };

  return (
    <div className='Register'>
      <form className='FormContainer' onSubmit={submitHandler}>
        <div className='row'>
          <div className='title'>Username</div>
          <input
            className='field'
            type='text'
            name='username'
            placeholder='letters and digits only'
            value={form.username}
            onChange={typer}
          />
        </div>
        <div className='row' style={{ paddingBottom: 0 }}>
          <div className='title'>Password</div>
          <input
            className='field'
            type='password'
            name='password'
            placeholder='letters and digits only'
            value={form.password}
            onChange={typer}
          />
        </div>
        <div className='row'>
          <div className='title'>Repeat Password</div>
          <input
            className='field'
            type='password'
            name='repassword'
            placeholder='repeat password'
            value={form.repassword}
            onChange={typer}
          />
        </div>
        <div className='row' style={{ paddingBottom: 0 }}>
          <div className='title'>E-Mail Address</div>
          <input
            className='field'
            type='text'
            name='email'
            placeholder='valid e-mail address'
            value={form.email}
            onChange={typer}
          />
        </div>
        <div className='row center'>
          <button>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
