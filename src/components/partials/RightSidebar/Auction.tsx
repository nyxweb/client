import React from 'react';

import Item from 'components/reusables/particles/items/Item';
import Resource from 'components/reusables/particles/Resource';

import Name from '../Character/Name';
import Button from 'components/reusables/form/Button';

interface Props {}

const Auction: React.FC<Props> = () => {
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
              <Resource name='bless' value={1234} margin={0} />
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
              <Resource name='bless' value={323} margin={0} />
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
              <Resource name='bless' value={211} margin={0} />
            </div>
          </div>
        </div>
        <div className='item'>
          <Item hex='2500DC2666A9000000C0000000000000' />
        </div>
      </div>
      <div className='currency'>
        <div className='Input group'>
          <Resource name='bless' value={false} margin={0} size={20} />
          <input type='number' />
          <Button value='bid' />
        </div>
      </div>
    </div>
  );
};

export default Auction;
