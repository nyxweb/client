import React, { CSSProperties } from 'react';

// Types
import IResource from 'redux/types/reusables/Resource';
import { useSelector } from 'react-redux';
import AppState from '../../../redux/types/app';

interface Props {
  resource: IResource;
  size?: number;
  style?: CSSProperties;
}

const Resource: React.FC<Props> = ({
  resource,
  size = 30,
  style = { margin: '5px 0 0 5px' }
}) => {
  const { itemsList } = useSelector((state: AppState) => state.config);
  const itemData =
    itemsList &&
    itemsList[resource.group] &&
    itemsList[resource.group].items[resource.id]
      ? itemsList[resource.group].items[resource.id]
      : false;

  return (
    itemData && (
      <div className='Resource' style={{ width: size, height: size, ...style }}>
        <img
          src={`/images/items/${resource.group}/${resource.id}${
            itemData.levels && itemData.levels[resource.level]
              ? '-' + resource.level
              : ''
          }.gif`}
          alt='res'
        />
        {resource.value || resource.value === 0 ? (
          <span>{resource.value}</span>
        ) : (
          ''
        )}
      </div>
    )
  );
};

export default Resource;
