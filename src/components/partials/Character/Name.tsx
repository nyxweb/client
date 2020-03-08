import React from 'react';
import { Link } from 'react-router-dom';

// Types
import Character from 'redux/types/rankings/Character';

interface Props {
  char: Character;
  guild?: boolean;
}

const Name: React.FC<Props> = ({ char, guild = true }) => {
  const status =
    !char.status ||
    !char.account ||
    char.status.ConnectStat !== 1 ||
    char.account.GameIDC !== char.Name
      ? 'offline'
      : 'online';

  return (
    <div className='CharacterName'>
      {guild && (
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
      )}
      <span className={`name ${status}`}>
        <Link to={`/char/${char.Name}`}>{char.Name}</Link>
      </span>
    </div>
  );
};

export default Name;
