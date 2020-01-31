import React from 'react';

// Partials
import Download from 'components/partials/LeftSidebar/Download';
import Menu from 'components/partials/LeftSidebar/Menu';

interface Props {}

const LeftSidebar: React.FC<Props> = () => {
  return (
    <aside className='LeftSidebar'>
      <Download />
      <Menu />
    </aside>
  );
};

export default LeftSidebar;
