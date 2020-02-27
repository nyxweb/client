import React from 'react';

interface Props {
  value: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  looks?: 'basic' | 'default' | 'primary' | 'secondary' | undefined;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  type = 'button',
  value,
  looks,
  loading = false
}) => {
  return (
    <button
      className={`Button ${looks || 'basic'}`}
      type={type}
      disabled={loading}
    >
      {loading ? 'loading...' : value}
    </button>
  );
};

export default Button;
