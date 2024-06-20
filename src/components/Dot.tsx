import React from 'react';

type Props = {
  position: 'top' | 'bottom';
  onClick?: () => void;
};

const Dot: React.FC<Props> = ({ position, onClick }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '10px',
        height: '10px',
        backgroundColor: 'black',
        borderRadius: '50%',
        top: position === 'top' ? '-5px' : 'calc(100% - 5px)',
        left: '50%',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
      }}
      onClick={onClick}
    />
  );
};

export default Dot;
