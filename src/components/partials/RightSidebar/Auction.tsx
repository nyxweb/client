import React from 'react';
import { useSelector } from 'react-redux';

// Partials
import ContentBlock from 'components/partials/RightSidebar/ContentBlock';
import Item from 'components/reusables/particles/items/Item';
import Resource from 'components/reusables/particles/Resource';
import Button from 'components/reusables/form/Button';
import Name from '../Character/Name';

// Types
import AppState from 'redux/types/app';

interface Props {}

const Auction: React.FC<Props> = () => {
  const logged = useSelector((state: AppState) => state.user.account.verified);

  return (
    <ContentBlock title='latest auction' desc='ends in 01:34:55 hours'>
      <div className='Auction'>
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
    </ContentBlock>
  );
};

export default Auction;
