import React from 'react';

// Partials
import Download from 'components/partials/LeftSidebar/Download';
import BlockLight from 'components/partials/BlockLight';

interface Props {}

const LeftSidebar: React.FC<Props> = () => {
  return (
    <aside className='LeftSidebar'>
      <Download />
      <BlockLight />
      <BlockLight />
      <BlockLight />
    </aside>
  );
};

export default LeftSidebar;
