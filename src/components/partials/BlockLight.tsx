import React from 'react';

interface Props {
  title: string;
  desc: string;
}

const BlockLight: React.FC<Props> = ({ children, title, desc }) => {
  return (
    <div className='BlockLight'>
      <div className='title'>
        <div className='text'>
          <span>{title}</span>
          {desc}
        </div>
        <div className='image'></div>
      </div>
      <div className='content'>{children}</div>
    </div>
  );
};

export default BlockLight;
