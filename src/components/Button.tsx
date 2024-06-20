import React from 'react';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button
      style={{
        margin: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
