import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Partials
import Loader from 'components/partials/Loader';

// Actions
import { getNews } from 'actions/others';

// Types
import AppState from 'redux/types/app';
import { CLEAR_NEWS } from 'redux/types/actions';
import _nyxNews from 'redux/types/others/_nyxNews';
import Moment from 'react-moment';

interface Props {}

const News: React.FC<Props> = () => {
  const { loading, many } = useSelector((state: AppState) => state.others.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());

    return () => {
      dispatch({
        type: CLEAR_NEWS
      });
    };
  }, [dispatch]);

  return (
    <div className='News'>
      {loading ? (
        <Loader />
      ) : !many || !many.length ? (
        'no news'
      ) : (
        many.map((news, i) => <Article key={i} news={news} />)
      )}
    </div>
  );
};

interface IArticle {
  news: _nyxNews;
}

const Article: React.FC<IArticle> = ({ news }) => {
  return (
    <article className='body'>
      <h1 className='title'>{news.title}</h1>
      <article
        className='content'
        dangerouslySetInnerHTML={{ __html: news.content }}
      ></article>
      <div className='author'>
        posted by <span className='name'>{news.author}</span> ...
        <Moment unix fromNow>
          {news.timestamp}
        </Moment>
      </div>
    </article>
  );
};

export default News;
