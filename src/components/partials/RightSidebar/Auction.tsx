import React from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid/v4';

const items = require.context('../../../assets/images/items', true);

interface Props {}

const Auction: React.FC<Props> = () => {
  const id = uuid();

  return (
    <div className='Auction'>
      <div className='item'>
        <img
          src={items('./12/4.gif')}
          alt='item'
          data-tip='<div align=center style="padding-left: 6px; padding-right:6px;font-family:arial;font-size: 10px;"><span style="font-weight:bold;font-size: 11px;"><span style=color:#8CB0EA>Aquagold Crossbow </span><br><br></span></font> 200 durability <br><font color=#9aadd5>This weapon has a special skill</font> <br><font color=#9aadd5><br><font color=red>Can be equipped by Elf</font><br><br>Luck (success rate of Jewel of Soul +25%)<br>Luck (critical damage rate +5%)<br><font color=#9aadd5>Additional dmg +4</font></font> </div>'
          data-for={id}
        />
      </div>
      <ReactTooltip
        place='left'
        effect='solid'
        html={true}
        offset={{ left: 10 }}
        id={id}
      />
    </div>
  );
};

export default Auction;
