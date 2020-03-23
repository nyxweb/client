import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Reusales
import Button from 'components/reusables/form/Button';

// Actions
import { postNews } from 'actions/others';

interface INews {
  title: string;
  content: string;
  author: string;
}

interface Props {}

const News: React.FC<Props> = () => {
  const [news, setNews] = useState<INews>({
    title: '',
    content: '',
    author: ''
  });

  const dispatch = useDispatch();

  return (
    <div className='AdminNews'>
      <div className='title'>
        <input
          type='text'
          value={news.title}
          placeholder='Title'
          className='news-title'
          onChange={e => setNews({ ...news, title: e.target.value })}
        />
        <input
          type='text'
          value={news.author}
          placeholder='Author'
          className='news-author'
          onChange={e => setNews({ ...news, author: e.target.value })}
        />
        <Button
          looks='green'
          value='post'
          className='news-post'
          onClick={() => dispatch(postNews(news))}
        />
      </div>
      <div className='content'>
        <CKEditor
          editor={ClassicEditor}
          data={news.content}
          // onInit={(editor: any) => {
          //   // You can store the "editor" and use when it is needed.
          //   console.log('Editor is ready to use!', editor);
          // }}
          onChange={(event: any, editor: any) => {
            setNews({
              ...news,
              content: editor.getData()
            });
          }}
          // onBlur={(event, editor) => {
          //   console.log('Blur.', editor);
          // }}
          // onFocus={(event, editor) => {
          //   console.log('Focus.', editor);
          // }}
        />
      </div>
    </div>
  );
};

export default News;
