import React, { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from 'actions/user/account';
import Button from 'components/reusables/form/Button';
import AppState from 'redux/types/app';

interface Props {}

const Password: React.FC<Props> = () => {
  const [form, setForm] = useState({
    password: '',
    newPassword: '',
    newRePassword: ''
  });
  const dispatch = useDispatch();
  const loading = useSelector((state: AppState) => state.user.account.loading);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(changePassword(form));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className='Password'>
      <form className='FormContainer' onSubmit={onSubmit}>
        <div className='row'>
          <div className='title'>Current Password</div>
          <input
            className='field'
            type='text'
            name='password'
            placeholder='letters and digits only'
            value={form.password}
            onChange={onChange}
          />
        </div>
        <div className='row'>
          <div className='title'>New Password</div>
          <input
            className='field'
            type='text'
            name='newPassword'
            placeholder='letters and digits only'
            value={form.newPassword}
            onChange={onChange}
          />
        </div>
        <div className='row'>
          <div className='title'>Repeat Password</div>
          <input
            className='field'
            type='text'
            name='newRePassword'
            placeholder='repeat password'
            value={form.newRePassword}
            onChange={onChange}
          />
        </div>
        <div className='row center'>
          <Button value='Submit' type='submit' loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default Password;
