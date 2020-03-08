import React, { CSSProperties } from 'react';

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
      <img src={`/images/items/resources/` + name + '.gif'} alt='res' />
      {value !== false ? <span>{value}</span> : ''}
    </div>
  );
};

export default Resource;
