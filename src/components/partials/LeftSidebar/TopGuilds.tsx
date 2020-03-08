import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Partials
import ContentBlock from 'components/partials/LeftSidebar/ContentBlock';
import GuildMark from 'components/partials/Guild/Mark';
import Loader from 'components/reusables/ReactLoader';

// Actions
import getTop5Guilds from 'actions/rankings/getTop5Guilds';

// Types
import AppState from 'redux/types/app';

interface Props {}

const TopGuilds: React.FC<Props> = () => {
  const guilds = useSelector((state: AppState) => state.rankings.top5guilds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTop5Guilds());
  }, [dispatch]);

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
          {!guilds.list || guilds.loading ? (
            <tr>
              <td colSpan={4}>
                <Loader />
              </td>
            </tr>
          ) : guilds.list.length ? (
            guilds.list.map((guild, i: number) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <Link to={`/guild/${guild.G_Name}`}>{guild.G_Name}</Link>
                </td>
                <td>{guild.TotalMembers}</td>
                <td>{guild.TotalResets}</td>
                <td>
                  <GuildMark mark={guild.G_Mark} size={20} />
                </td>
              </tr>
            ))
          ) : (
            'No data'
          )}
        </tbody>
      </table>
    </ContentBlock>
  );
};

export default TopGuilds;
