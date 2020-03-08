import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Partials
import ContentBlock from 'components/partials/LeftSidebar/ContentBlock';
import GuildMark from 'components/partials/Guild/Mark';

// Actions
import getTop5Guilds from 'redux/actions/rankings/getTop5Guilds';

// Types
import AppState from 'redux/types/app';
import Guild from 'redux/types/rankings/Guild';

interface Props {
  guilds: Guild[];
  getTop5Guilds: Function;
}

const TopGuilds: React.FC<Props> = ({ guilds, getTop5Guilds }) => {
  useEffect(() => {
    getTop5Guilds();
  }, [getTop5Guilds]);

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
          {!guilds ? (
            <tr>
              <td colSpan={4} style={{ textAlign: 'left' }}>
                Loading...
              </td>
            </tr>
          ) : (
            guilds.map((guild: Guild, i: number) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <Link to={`/guild/${guild.G_Name}`}>{guild.G_Name}</Link>
                </td>
                <td>{guild.guild_memb.length}</td>
                <td>43</td>
                <td>
                  <GuildMark mark={guild.G_Mark} size={20} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </ContentBlock>
  );
};

const mapStateToProps = (state: AppState) => ({
  guilds: state.rankings.top5guilds
});

export default connect(mapStateToProps, { getTop5Guilds })(TopGuilds);
