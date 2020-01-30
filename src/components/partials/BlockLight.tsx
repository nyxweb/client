import React from 'react';

interface Props {}

const BlockLight: React.FC<Props> = () => {
  return (
    <div className='BlockLight'>
      <div className='title'>
        <div className='text'>
          <span>Menu de links</span>
          links de acceso rapido
        </div>
        <div className='image'></div>
      </div>
      <div className='content'>stuff</div>
    </div>
  );
};

export default BlockLight;
