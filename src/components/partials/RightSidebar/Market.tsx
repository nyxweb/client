import React from 'react';

// Partials
import ContentBlock from 'components/partials/RightSidebar/ContentBlock';
import Resource from 'components/reusables/particles/Resource';

const items = require.context('../../../assets/images/items', true);

interface Props {}

const Market: React.FC<Props> = () => {
  return (
    <ContentBlock title='market items' desc='latest items on the market'>
      <div className='MarketItems'>
        <div className='Item'>
          <div className='price'>
            <Resource name='chaos' value={5} margin='7px 7px 7px 0' />
            <Resource name='bless' value={2} margin='7px 7px 7px 0' />
            <Resource name='soul' value={1} margin='7px 7px 7px 0' />
          </div>
          <div className='image'>
            <img src={items('./0/0.gif')} alt='kris' />
          </div>
        </div>
        <div className='Item'>
          <div className='price'>
            <Resource name='creation' value={5} margin='7px 7px 7px 0' />
            <Resource name='bless' value={22} margin='7px 7px 7px 0' />
          </div>
          <div className='image'>
            <img src={items('./3/6.gif')} alt='kris' />
          </div>
        </div>
        <div className='Item'>
          <div className='price'>
            <Resource name='bok2' value={5} margin='7px 7px 7px 0' />
            <Resource name='bok3' value={11} margin='7px 7px 7px 0' />
            <Resource name='stone' value={52} margin='7px 7px 7px 0' />
            <Resource name='guardian' value={211} margin='7px 7px 7px 0' />
            <Resource name='life' value={211} margin='7px 7px 7px 0' />
          </div>
          <div className='image'>
            <img src={items('./11/3.gif')} alt='kris' />
          </div>
        </div>
      </div>
    </ContentBlock>
  );
};

export default Market;
