import React from 'react';

interface Props {
  title: string;
  desc: string;
}

const ContentBlock: React.FC<Props> = ({ children, title, desc }) => {
  return (
    <div className='ContentBlock'>
      <div className='title'>
        <div className='image' />
        <div className='text'>
          <span>{title}</span>
          {desc}
        </div>
      </div>
      <div className='content'>{children}</div>
    </div>
  );
};

export default ContentBlock;
