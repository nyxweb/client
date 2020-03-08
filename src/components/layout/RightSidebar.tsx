import React from 'react';

// Partials
import Status from 'components/partials/RightSidebar/Status';
import EventTimers from 'components/partials/RightSidebar/EventTimers';
import Auction from 'components/partials/RightSidebar/Auction';
import Market from 'components/partials/RightSidebar/Market';

interface Props {}

const RightSidebar: React.FC<Props> = () => {
  return (
    <aside className='RightSidebar'>
      <Status />
      <Auction />
      <Market />
      <EventTimers />
    </aside>
  );
};

export default RightSidebar;
