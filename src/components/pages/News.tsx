import React from 'react';

interface Props {}

const News: React.FC<Props> = () => {
  return (
    <div className='News'>
      <Article />
    </div>
  );
};

const Article: React.FC = () => {
  return (
    <article className='body'>
      <h1 className='title'>Today we launch our new server</h1>
      <article className='content'>
        <p>This is a paragraph blabla</p>
        <p>This is a paragraph blabla</p>
        <p>This is a paragraph blabla</p>
        <p>This is a paragraph blabla</p>
        <p>This is a paragraph blabla</p>
        <p>This is a paragraph blabla</p>
      </article>
      <div className='author'>
        posted by <span className='name'>Dea7h</span> on{' '}
        <span className='time'>2020/01/31 17:53</span>
      </div>
    </article>
  );
};

export default News;
