import React, { useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Reusables
import Button from 'components/reusables/form/Button';

// Actions
import { login } from 'actions/user';
import Loader from 'components/partials/Loader';
import AppState from '../../../redux/types/app';

interface Props {}

const Login: React.FC<Props & RouteComponentProps> = ({ history }) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const loginLoader = useSelector((state: AppState) => state.user.loginLoader);
  const dispatch = useDispatch();

  const typer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(form, history));
  };

  return (
    <div className='Login'>
      {loginLoader ? (
        <Loader />
      ) : (
        <>
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
            <Button type='submit' value='login' />
          </form>
          <Link to='/forgot-password'>Recover your lost Password!</Link>
        </>
      )}
    </div>
  );
};

export default withRouter(Login);
