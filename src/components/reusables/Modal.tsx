import React from 'react';
import Button from './form/Button';

interface Props {
  modal: {
    title: string;
    accept?: string;
    decline?: string;
    open: boolean;
  };

  onAccept: () => void;
  onDecline: () => void;
}

const Modal: React.FC<Props> = ({
  modal: { title, accept = 'Accept', decline = 'Decline', open },
  onAccept,
  onDecline
}) => {
  return (
    <div className={`Modal ${open ? 'open' : 'closed'}`}>
      <div className='dialogBox'>
        <div className='title'>{title}</div>
        <div className='buttons'>
          <Button
            value={accept}
            className='btn-accept'
            looks='green'
            onClick={onAccept}
          />
          <Button value={decline} className='btn-decline' onClick={onDecline} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
