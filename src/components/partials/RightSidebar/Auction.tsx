import React from 'react';

import Item from 'components/reusables/particles/items/Item';
import Resource from 'components/reusables/particles/Resource';

import Name from '../Character/Name';
import Button from 'components/reusables/form/Button';
import { useSelector } from 'react-redux';
import AppState from '../../../redux/types/app';

interface Props {}

const Auction: React.FC<Props> = () => {
  const logged = useSelector((state: AppState) => state.user.account.verified);

  return (
    <div className='Auction'>
      <div className='timer'>
        Auction <span>34:55:55</span>
      </div>
      <div className='container'>
        <div className='bidders'>
          <div className='chars'>
            <div className='char'>
              <Name
                char={{
                  Name: 'ffdsdfsdff',
                  status: { ConnectStat: 1 },
                  account: { GameIDC: '1' },
                  guild_memb: { G_Name: '' }
                }}
                guild={false}
              />{' '}
              <Resource
                resource={{ group: 14, id: 13, level: 0, value: 59 }}
                size={30}
                style={{ margin: 0 }}
              />
            </div>
            <div className='char'>
              <Name
                char={{
                  Name: 'xxasaf',
                  status: { ConnectStat: 1 },
                  account: { GameIDC: '1' },
                  guild_memb: { G_Name: '' }
                }}
                guild={false}
              />{' '}
              <Resource
                resource={{ group: 14, id: 13, level: 0, value: 21 }}
                size={30}
                style={{ margin: 0 }}
              />
            </div>
            <div className='char'>
              <Name
                char={{
                  Name: 'asfasf',
                  status: { ConnectStat: 1 },
                  account: { GameIDC: '1' },
                  guild_memb: { G_Name: '' }
                }}
                guild={false}
              />{' '}
              <Resource
                resource={{ group: 14, id: 13, level: 0, value: 11 }}
                size={30}
                style={{ margin: 0 }}
              />
            </div>
          </div>
        </div>
        <div className='item'>
          <Item hex='2500DC2666A9000000C0000000000000' />
        </div>
      </div>
      {logged && (
        <div className='currency'>
          <div className='Input group'>
            <Resource
              resource={{ group: 14, id: 13, level: 0 }}
              size={20}
              style={{ margin: 0 }}
            />
            <input type='number' />
            <Button value='bid' style={{ width: 50 }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Auction;
