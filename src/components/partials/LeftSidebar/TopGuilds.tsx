import React from 'react';
import { Link } from 'react-router-dom';

// Partials
import ContentBlock from 'components/partials/LeftSidebar/ContentBlock';

import banner from 'assets/images/guild.png';

interface Props {}

const TopGuilds: React.FC<Props> = () => {
  return (
    <ContentBlock title='top 5 guilds' desc='our top 5 leading guilds'>
      <table className='TopGuilds'>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>membs</th>
            <th>resets</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <Link to='/guild/Stonoshkite'>Stonoshkite</Link>
            </td>
            <td>30</td>
            <td>43</td>
            <td>
              <img src={banner} alt='banner' />
            </td>
          </tr>
        </tbody>
      </table>
    </ContentBlock>
  );
};

export default TopGuilds;
