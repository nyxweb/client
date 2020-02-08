import React from 'react';
import { Link } from 'react-router-dom';

// Partials
import GuildMark from 'components/partials/Guild/Mark';

// Helpers
import { charClass } from 'helpers/characters/class';

// Types
import Character from 'types/Character';

interface Props {
  rank: number;
  char: Character;
}

const TableRow: React.FC<Props> = ({ rank, char }) => {
  const status =
    !char.status ||
    char.status.ConnectStat !== 1 ||
    char.account.GameIDC !== char.Name
      ? 'offline'
      : 'online';

  return (
    <tr>
      <td>{rank}.</td>
      <td>
        <div className='guild-name'>
          <span className='guild'>
            [&nbsp;
            {char.guild_memb ? (
              <Link to={`/guild/${char.guild_memb.G_Name}`}>
                {char.guild_memb.G_Name}
              </Link>
            ) : (
              'No Guild'
            )}
            &nbsp;]
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
        {char.guild_memb ? (
          <GuildMark mark={char.guild_memb.guild.G_Mark} size={25} />
        ) : (
          'woops'
        )}
      </td>
    </tr>
  );
};

export default TableRow;
