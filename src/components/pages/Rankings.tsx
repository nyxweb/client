import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Partials
import Table from 'components/partials/MainContent/rankings/Table';
import Loader from 'components/partials/Loader';

// Actions
import { getCharacters, clearCharacters } from 'actions/rankings';

// Types
import AppState from 'redux/types/app';

interface Props {}

const Rankings: React.FC<Props> = () => {
  const [page, setPage] = useState(1);

  const rankings = useSelector((state: AppState) => state.rankings.characters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCharacters(page));

    return () => {
      dispatch(clearCharacters());
    };
  }, [page, dispatch]);

  return (
    <div className='Rankings'>
      {rankings.loading ? (
        <Loader />
      ) : (
        <Table characters={rankings.list!} page={page} setPage={setPage} />
      )}
    </div>
  );
};

export default Rankings;
