import React, { useRef } from 'react';
import Button from './form/Button';

interface Props {
  modal?: {
    title: string;
    accept: string;
    decline: string;
  };

  onAccept?: () => void;
  onDecline: () => void;
  open: boolean;
}

const Modal: React.FC<Props> = ({
  modal,
  onAccept,
  onDecline,
  open,
  children
}) => {
  const modalRef = useRef(null);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onDecline();
    }
  };

  return (
    <div
      className={`Modal ${open ? 'open' : 'closed'}`}
      onClick={handleClickOutside}
      ref={modalRef}
    >
      <div className='dialogBox'>
        {children && !modal ? (
          children
        ) : (
          <>
            <div className='dialog-title'>{modal?.title}</div>
            <div className='buttons'>
              <Button
                value={modal?.accept || 'Accept'}
                className='btn-accept'
                looks='green'
                onClick={onAccept}
              />
              <Button
                value={modal?.decline || 'Decline'}
                className='btn-decline'
                onClick={onDecline}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
