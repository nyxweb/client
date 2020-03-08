import React, { CSSProperties } from 'react';

import Loader from 'react-loader-spinner';

interface Props {
  size?: number;
  align?: CSSProperties['textAlign'];
  margin?: CSSProperties['margin'];
  type?:
    | 'Triangle'
    | 'Audio'
    | 'BallTriangle'
    | 'Bars'
    | 'Circles'
    | 'Grid'
    | 'Hearts'
    | 'Oval'
    | 'Puff'
    | 'Rings'
    | 'TailSpin'
    | 'ThreeDots'
    | 'Watch'
    | 'RevolvingDot'
    | 'Plane'
    | 'MutatingDots'
    | 'None'
    | 'NotSpecified'
    | undefined;
  color?: string;
}

const ReactLoader: React.FC<Props> = ({
  size = 50,
  align = 'center',
  margin = 0,
  type = 'Triangle',
  color = '#00BFFF'
}) => {
  const style: CSSProperties = {
    textAlign: align || 'center',
    margin: margin
  };

  return (
    <div className='ReactLoader' style={style}>
      <Loader type={type} color={color} height={size} width={size} />
    </div>
  );
};

export default ReactLoader;
