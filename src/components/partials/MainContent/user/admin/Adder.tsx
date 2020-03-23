import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Partials
import Loader from 'components/partials/Loader';

// Actions
// import { getVIP, buyVIP } from 'actions/user/account';

// Types
import AppState from 'redux/types/app';

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
