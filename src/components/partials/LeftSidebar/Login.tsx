import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Login: React.FC<Props> = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const typer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <div className='Login'>
      <div className='title'>
        <span>User Area</span>
        <Link to='/register'>Register</Link>
      </div>
      <form className='fields' onSubmit={submitHandler}>
        <input
          type='text'
          className='user'
          placeholder='Username'
          name='username'
          value={form.username}
          onChange={typer}
        />
        <input
          type='password'
          className='pass'
          placeholder='Password'
          name='password'
          value={form.password}
          onChange={typer}
        />
        <button>login</button>
      </form>
      <Link to='/forgot-password'>Recover your lost Password!</Link>
    </div>
  );
};

export default Login;
