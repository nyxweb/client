import React from 'react';

// Interfaces
import { Button as Props } from 'interfaces/components/reusables/Form';

const Button: React.FC<Props> = ({ type, value, looks }) => {
  return (
    <button className={`Button ${looks || 'basic'}`} type={type || undefined}>
      {value}
    </button>
  );
};

export default Button;
