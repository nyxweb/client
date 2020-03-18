import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { match, Link } from 'react-router-dom';

// Partials
import Name from 'components/partials/Character/Name';
import Mark from 'components/partials/Guild/Mark';
import Loader from 'components/partials/Loader';

// Actions
import { getGuild, clearGuild } from 'actions/rankings';

// Helpers
import { cclass, rankings } from 'helpers/characters';

// Types
import AppState from 'redux/types/app';
import Character from 'redux/types/rankings/Character';
import IGuild from 'redux/types/rankings/Guild';

interface Props {
  match: match<{ name: string }>;
}

const Guild: React.FC<Props> = ({
  match: {
    params: { name }
  }
}) => {
  const [master, setMaster] = useState<Character>();
  const [resetPoints, setResetPoints] = useState(0);
  const [alliance, setAlliance] = useState<IGuild[]>();

  const { loading, data: guild } = useSelector(
    (state: AppState) => state.rankings.guild
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGuild(name));

    return () => {
      dispatch(clearGuild());
    };
  }, [dispatch, name]);

  useEffect(() => {
    if (guild) {
      let rPoints = 0;
      guild.members.forEach(m => {
        rPoints += m.character.Resets;
      });

      const allys = guild.alliance.filter(
        g => g.G_Name !== guild.G_Name && g.G_Union !== 0
      );

      setMaster(guild.members.find(m => m.Name === guild.G_Master)?.character);
      setResetPoints(rPoints);
      setAlliance(allys);
    }
  }, [guild]);

  return (
    <div className='Guild'>
      {loading ? (
        <Loader />
      ) : !guild ? (
        `This guild doesn't exist`
      ) : (
        <>
          <table className='guild-info'>
            <tbody>
              <tr>
                <td colSpan={2} style={{ color: '#eeeeee' }}>
                  {guild.G_Name}
                </td>
              </tr>
              <tr>
                <td className='image'>
                  <Mark mark={guild.G_Mark} size={100} />
                </td>
                <td className='info'>
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ width: '50%' }}>Guild Master</td>
                        <td>
                          {master && <Name char={master} guild={false} />}
                        </td>
                      </tr>
                      <tr>
                        <td>Alliance</td>
                        <td>
                          {alliance && alliance.length
                            ? alliance.map((g, i) => {
                                return (
                                  <span key={i}>
                                    <Link to={`/guild/${g.G_Name}`}>
                                      {g.G_Name}
                                    </Link>
                                    {i + 1 !== alliance.length ? ', ' : ''}
                                  </span>
                                );
                              })
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Reset Points</td>
                        <td>{resetPoints}</td>
                      </tr>
                      <tr>
                        <td>Guild Score</td>
                        <td>{guild.G_Score}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='equipment'>
            <div className='title'>Members ( {guild.members.length} )</div>
            <div className='container'>
              <table className='Table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>
                      level <sup>res</sup>
                    </th>
                    <th>class</th>
                    <th>position</th>
                  </tr>
                </thead>
                <tbody>
                  {guild.members
                    .sort((a, b) => b.character.Resets - a.character.Resets)
                    .sort((a, b) => b.G_Status - a.G_Status)
                    .map((m, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <Name char={m.character} guild={false} />
                        </td>
                        <td>
                          {m.character.cLevel} <sup>{m.character.Resets}</sup>
                        </td>
                        <td>{cclass.charClass(m.character.Class)}</td>
                        <td
                          dangerouslySetInnerHTML={{
                            __html: rankings.guildPosition(m.G_Status)
                          }}
                        ></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Guild;
