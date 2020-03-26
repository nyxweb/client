import React from 'react';

// Icons
import { ReactComponent as PrevIcon } from 'assets/icons/arrow-left.svg';
import { ReactComponent as NextIcon } from 'assets/icons/arrow-right.svg';

interface Props {
  page: number;
  perPage: number;
  totalItems: number;
  setPage: (page: number) => void;
  setPerPage?: (perPage: number) => void;
}

const Pagination: React.FC<Props> = ({
  page,
  perPage,
  setPage,
  setPerPage,
  totalItems
}) => {
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page * perPage < totalItems) {
      setPage(page + 1);
    }
  };

  return (
    <div className='Pagination'>
      <span>
        {setPerPage && (
          <>
            <span>Per page </span>
            <select
              defaultValue={perPage}
              onChange={e => setPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </>
        )}
      </span>
      <div className='controls'>
        {page * perPage - perPage}-
        {totalItems < page * perPage ? totalItems : page * perPage} of{' '}
        {totalItems.toLocaleString() + ' '}
        <PrevIcon
          className={`icon prev${page > 1 ? ' active' : ''}`}
          onClick={prevPage}
        />{' '}
        <NextIcon
          className={`icon next${page * perPage < totalItems ? ' active' : ''}`}
          onClick={nextPage}
        />
      </div>
    </div>
  );
};

export default Pagination;
