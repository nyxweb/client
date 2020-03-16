import React from 'react';
import { useSelector } from 'react-redux';

// Reusablesn
import Resource from 'components/reusables/particles/Resource';

// Types
import AppState from 'redux/types/app';
import IResource from 'redux/types/reusables/Resource';

export interface DragItem {
  x: number;
  y: number;
  slot: number;
  dragging: boolean;
  from: 'warehouse' | 'storage';
  to: 'warehouse' | 'storage';
}

interface Props {}

const Resources: React.FC<Props> = () => {
  const account = useSelector((state: AppState) => state.user.account.info);

  return (
    <div className='Resources'>
      {account &&
        JSON.parse(account.resources.list).map((r: IResource, i: number) => (
          <div className='block' key={i}>
            <Resource
              resource={r}
              size={40}
              style={{ fontSize: 15, float: 'none', margin: 0 }}
            />
          </div>
        ))}
    </div>
  );
};

export default Resources;
