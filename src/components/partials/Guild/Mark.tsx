import React from 'react';
import { colorDecode } from 'helpers/guild';

interface Props {
  mark: any;
  size?: number;
}

const Mark: React.FC<Props> = ({ mark, size = 30 }) => {
  return (
    <div className='GuildMark' style={{ width: size, height: size }}>
      {new Buffer(mark, 'hex')
        .toString('hex')
        .split('')
        .map((symbol: string, i: number) => (
          <div
            key={i}
            style={{
              width: size / 8,
              height: size / 8,
              background: colorDecode(symbol)
            }}
            className='cell'
          />
        ))}
    </div>
  );
};

export default Mark;
