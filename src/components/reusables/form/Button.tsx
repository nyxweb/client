import React, { CSSProperties } from 'react';

interface Props {
  value: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  looks?: 'basic' | 'default' | 'primary' | 'secondary' | undefined;
  loading?: boolean;
  onClick?: Function;
  style?: CSSProperties;
}

const Button: React.FC<Props> = ({
  type = 'button',
  value,
  looks,
  loading = false,
  onClick,
  style
}) => {
  return (
    <button
      className={`Button ${looks || 'basic'}`}
      type={type}
      disabled={loading}
      style={style}
      onClick={e => (onClick ? onClick(e) : {})}
    >
      {loading ? (
        <div className='loading'>
          <div className='container'>
            <div className='fill' />
          </div>
        </div>
      ) : (
        value
      )}
    </button>
  );
};

export default Button;
