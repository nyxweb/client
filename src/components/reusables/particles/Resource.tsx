import React, { CSSProperties } from 'react';

// Types
import IResource from 'redux/types/reusables/Resource';

const items = require.context('../../../assets/images/items', true);

const Resource: React.FC<IResource> = ({
  name,
  value = 0,
  size = 30,
  margin = '5px 0 0 5px'
}) => {
  const style: CSSProperties = { width: size, height: size, margin };

  return (
    <div className={`Resource ${name}`} style={style}>
      <img src={items(`./resources/` + name + '.gif')} alt='res' />
      <span>{value}</span>
    </div>
  );
};

export default Resource;
