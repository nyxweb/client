import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

// Actions
import getCharacters from 'actions/rankings/getCharacters';

// Helpers
import { charClass } from 'helpers/characters/class';

// Partials
import GuildMark from 'components/partials/Guild/Mark';

interface Props {}

const Rankings: React.FC<Props> = () => {
  const [characters, setCharacters] = useState();

  useEffect(() => {
    const fetchCharacters = async () => {
      setCharacters(await getCharacters());
    };

    fetchCharacters();
  }, []);

  return (
    <div className='Rankings'>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>[guild] name</th>
            <th>class</th>
            <th>level</th>
            <th>hof</th>
            <th>pk</th>
            <th>quest</th>
            <th>mark</th>
          </tr>
        </thead>
        <tbody>
          {!characters ? (
            <tr>
              <td colSpan={8}>
                <Loader
                  type='Triangle'
                  color='#00BFFF'
                  height={50}
                  width={50}
                />
              </td>
            </tr>
          ) : characters.error ? (
            <tr>
              <td colSpan={5}>{characters.error}</td>
            </tr>
          ) : (
            characters.map((char: any, i: number) => (
              <Character key={i} rank={i + 1} char={char} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

interface CharProps {
  rank: number;
  char: any;
}

const Character: React.FC<CharProps> = ({ rank, char }) => {
  const status =
    char.status.ConnectStat === 1 && char.account.GameIDC === char.Name
      ? 'online'
      : 'offline';

  return (
    <tr>
      <td>{rank}.</td>
      <td>
        <div className='guild-name'>
          <span className='guild'>
            [{' '}
            <Link to={`/guild/${char.guild.G_Name}`}>{char.guild.G_Name}</Link>{' '}
            ]
          </span>
          <span className={`name ${status}`}>
            <Link to={`/char/${char.Name}`}>{char.Name}</Link>
          </span>
        </div>
      </td>
      <td>{charClass(char.Class)}</td>
      <td>
        {char.cLevel}
        <sup>{char.Resets}</sup>
      </td>
      <td>{char.HOFWins}</td>
      <td>{char.PkCount}</td>
      <td>{char.QuestNumber}</td>
      <td>
        <GuildMark mark={char.guild.guild.G_Mark} size={25} />
      </td>
    </tr>
  );
};

export default Rankings;
