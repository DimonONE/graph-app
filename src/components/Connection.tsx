import React from 'react';
import { NodeType } from '../App';

type Props = {
  fromId: string;
  toId: string;
  fromPosition: 'top' | 'bottom';
  toPosition: 'top' | 'bottom';
  nodes: NodeType[];
};

const Connection: React.FC<Props> = ({ fromId, toId, fromPosition, toPosition, nodes }) => {
  const fromNode = nodes.find(node => node.id === fromId);
  const toNode = nodes.find(node => node.id === toId);

  if (!fromNode || !toNode) {
    return null;
  }

  const x1 = fromNode.x + 50;
  const y1 = fromPosition === 'top' ? fromNode.y : fromNode.y + 45;
  const x2 = toNode.x + 50;
  const y2 = toPosition === 'top' ? toNode.y : toNode.y + 45;

  const offsetY = fromPosition === toPosition ? 20 : 0;

  return (
    <svg style={{ position: 'absolute', zIndex: 10, top: 0, left: 0 }} width="100%" height="100%">
      <line x1={x1} y1={y1} x2={x2} y2={y2 - offsetY} style={{ stroke: 'black', strokeWidth: 2 }} />
    </svg>
  );
};

export default Connection;