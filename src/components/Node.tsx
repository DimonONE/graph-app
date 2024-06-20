import React from 'react';
import Draggable from 'react-draggable';
import Dot from './Dot';
import { PositionType } from './Canvas';

type Props = {
  id: string;
  x: number;
  y: number;
  onMove: (id: string, x: number, y: number) => void;
  addPosition: (newPosition: PositionType) => void;
};

const Node: React.FC<Props> = ({ id, x, y, onMove, addPosition }) => {

  const handleDrag = (e: any, data: any) => {
    onMove(id, data.x, data.y);
  };

  const handleDotClick = (dotPosition: 'top' | 'bottom') => {
    addPosition({ id, position: dotPosition });
  };

  return (
    <Draggable
      handle=".node-drag-handle"
      defaultPosition={{ x, y }}
      grid={[20, 20]}
      bounds="parent"
      onStop={handleDrag}
    >
      <div
        style={{
          position: 'absolute',
          width: '100px',
          height: '40px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <div className="node-drag-handle">Node {id}</div>
        <Dot position="top" onClick={() => handleDotClick('top')} />
        <Dot position="bottom" onClick={() => handleDotClick('bottom')} />

      </div>
    </Draggable>
  );
};

export default Node;
