import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';

// Partials
import Loader from 'components/partials/Loader';

// Actions
// import { getVIP, buyVIP } from 'actions/user/account';

// Types
import AppState from 'redux/types/app';

// Reusales
import Button from 'components/reusables/form/Button';

interface Props {}

const News: React.FC<Props> = () => {
  const { loading } = useSelector((state: AppState) => state.user.account);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getVIP());
  }, [dispatch]);

  return <div className='News'>{loading ? <Loader /> : <div>adder</div>}</div>;
};

export default News;
