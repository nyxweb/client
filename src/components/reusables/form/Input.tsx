import React, { useState } from 'react';

// Interfaces
import { Input as Props } from 'interfaces/components/reusables/Form';

const Input: React.FC<Props> = ({ type, placeholder, value, change }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`Input ${value.length || focused ? 'focused' : ''}`}>
      <div className='label'>{placeholder}</div>
      <input
        type={type}
        value={value}
        onChange={e => change(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <div className='underline'>
        <div className='fill'></div>
      </div>
    </div>
  );
};

export default Input;
