import React from 'react';

// Partials
import Status from 'components/partials/RightSidebar/Status';

interface Props {}

const RightSidebar: React.FC<Props> = () => {
  return (
    <aside className='RightSidebar'>
      <Status />
    </aside>
  );
};

export default RightSidebar;
