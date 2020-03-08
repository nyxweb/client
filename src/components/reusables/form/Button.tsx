import React from 'react';

// Interfaces
import { Button as Props } from 'interfaces/components/reusables/Form';

const Button: React.FC<Props> = ({ type, value, looks, loading = false }) => {
  return (
    <button className={`Button ${looks || 'basic'}`} type={type || undefined}>
      {value}
    </button>
  );
};

export default Button;
