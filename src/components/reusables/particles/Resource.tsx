import React, { CSSProperties } from 'react';

// Types
// import IResource from 'redux/types/reusables/Resource';

const items = require.context('../../../assets/images/items', true);

interface IResource {
  name: string;
  value: number | false;
  size?: number;
  margin?: string | number;
  style?: CSSProperties;
}

const Resource: React.FC<IResource> = ({
  name,
  value = 0,
  size = 30,
  margin = '5px 0 0 5px',
  style
}) => {
  const resourceStyle: CSSProperties = {
    width: size,
    height: size,
    margin,
    ...style
  };

  return (
    <div className={`Resource ${name}`} style={resourceStyle}>
      <img src={items(`./resources/` + name + '.gif')} alt='res' />
      {value !== false ? <span>{value}</span> : ''}
    </div>
  );
};

export default Resource;
