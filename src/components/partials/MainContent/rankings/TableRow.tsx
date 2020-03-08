import React from 'react';

// Partials
import GuildMark from 'components/partials/Guild/Mark';
import CharacterName from 'components/partials/Character/Name';

// Helpers
import { cclass } from 'helpers/characters';

// Types
import Character from 'redux/types/rankings/Character';

interface Props {
  rank: number;
  char: Character;
}

const TableRow: React.FC<Props> = ({ rank, char }) => {
  return (
    <tr>
      <td>{rank}.</td>
      <td>
        <CharacterName char={char} />
      </td>
      <td>{cclass.charClass(char.Class)}</td>
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
          '-'
        )}
      </td>
    </tr>
  );
};

export default TableRow;
