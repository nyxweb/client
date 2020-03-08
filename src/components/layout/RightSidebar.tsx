import React from 'react';

// Partials
import Status from 'components/partials/RightSidebar/Status';
import EventTimers from 'components/partials/RightSidebar/EventTimers';

interface Props {}

const RightSidebar: React.FC<Props> = () => {
  return (
    <aside className='RightSidebar'>
      <Status />
      <EventTimers />
    </aside>
  );
};

export default RightSidebar;
