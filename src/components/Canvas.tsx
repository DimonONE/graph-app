import React, { useState } from "react";
import Node from "./Node";
import { NodeType } from "../App";
import ConnectionsGraph from "./ConnectionsGraph";

interface Props {
  nodes: NodeType[];
  setNodes: React.Dispatch<React.SetStateAction<NodeType[]>>;
  handleCreateConnection: (fromId: string, toId: string, fromPosition: 'top' | 'bottom', toPosition: 'top' | 'bottom') => void
}

export interface PositionType {
  id: string;
  position: "top" | "bottom";
}

const Canvas: React.FC<Props> = ({
  nodes,
  handleCreateConnection,
  setNodes,
}) => {
  const [, setPositions] = useState<PositionType[]>();

  const handleNodeMove = (id: string, x: number, y: number) => {
    const updatedNodes = nodes.map((node) =>
      node.id === id ? { ...node, x, y } : node
    );
    setNodes(updatedNodes);
  };

  const addPosition = (newPosition: PositionType) => {
    setPositions((prevPositions) => {
      if (!prevPositions || prevPositions.length === 0) {
        return [newPosition];
      }

      const existingPosition = prevPositions.find(
        (position) => position.id === newPosition.id
      );
      if (existingPosition) {
        return prevPositions;
      }

      const updatedPositions = [...prevPositions, newPosition];
      if (updatedPositions.length === 2) {
        handleCreateConnection(
          updatedPositions[0].id,
          updatedPositions[1].id,
          updatedPositions[0].position,
          updatedPositions[1].position
        );
        return [];
      }

      return updatedPositions;
    });
  };

  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        height: "600px",
        border: "1px solid #ccc",
        margin: "20px",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      {nodes.map((node) => (
        <Node
          key={node.id}
          id={node.id}
          x={node.x}
          y={node.y}
          onMove={handleNodeMove}
          addPosition={addPosition}
        />
      ))}
      <ConnectionsGraph nodes={nodes} />
    </div>
  );
};

export default Canvas;
