import React, { CSSProperties } from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid/v4';

interface Props {
  value: string;
  type?: 'button' | 'submit' | 'reset';
  looks?: 'blue' | 'green';
  loading?: boolean;
  onClick?: Function;
  style?: CSSProperties;
  tooltip?: string;
}

const Button: React.FC<Props> = ({
  type = 'button',
  value,
  looks = 'blue',
  loading = false,
  onClick,
  style,
  tooltip
}) => {
  const id = uuid();

  return (
    <>
      <button
        className={`Button ${looks}`}
        type={type}
        disabled={loading}
        style={style}
        onClick={e => (onClick ? onClick(e) : {})}
        data-tip={tooltip}
        data-for={id}
      >
        {loading ? (
          <div className='loading'>
            <div className='container'>
              <div className='fill' />
            </div>
          </div>
        ) : (
          <span dangerouslySetInnerHTML={{ __html: value }} />
        )}
      </button>
      {tooltip && (
        <ReactTooltip
          place='top'
          type='dark'
          effect='solid'
          offset={{ top: 10 }}
          html={true}
          id={id}
        />
      )}
    </>
  );
};

export default Button;
