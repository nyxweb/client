import React, { CSSProperties } from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid/v4';

// Types
import IResource from 'redux/types/reusables/Resource';
import { useSelector } from 'react-redux';
import AppState from '../../../redux/types/app';

interface Props {
  resource: IResource;
  size?: number;
  style?: CSSProperties;
  title?: string;
}

const Resource: React.FC<Props> = ({
  resource,
  size = 30,
  style = { margin: '5px 0 0 5px' },
  title
}) => {
  const { itemsList } = useSelector((state: AppState) => state.config);
  const itemData =
    itemsList &&
    itemsList[resource.group] &&
    itemsList[resource.group].items[resource.id]
      ? itemsList[resource.group].items[resource.id]
      : false;

  const id = uuid();

  const itemName =
    itemData.levels && itemData.levels[resource.level]
      ? itemData.levels[resource.level]
      : itemData.name + `${resource.level > 0 ? ' +' + resource.level : ''}`;

  return (
    itemData && (
      <>
        <div
          className='Resource'
          style={{ width: size, height: size, ...style }}
          data-tip
          data-for={id}
        >
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
        <ReactTooltip effect='solid' place='top' offset={{ top: 10 }} id={id}>
          {title} {itemName}
        </ReactTooltip>
      </>
    )
  );
};

export default Resource;
