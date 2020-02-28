import React from 'react';

interface Props {
  input: {
    name: string;
  };

  button: {
    name: string;
  };
}

const InputGroup: React.FC<Props> = ({ input, button }) => {
  return (
    <div className='Input group'>
      <input type='number' />
      <button>{button.name}</button>
    </div>
  );
};

export default InputGroup;
