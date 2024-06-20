import React, { useState } from "react";
import Canvas from "./components/Canvas";
import Button from "./components/Button";

export interface NodeType {
  id: string;
  name: string;
  x: number;
  y: number;
  topConnections: string[];
  bottomConnections: string[];
}

export interface ConnectionType {
  fromId: string;
  toId: string;
  position: "top" | "bottom";
}

const App: React.FC = () => {
  const [nodes, setNodes] = useState<NodeType[]>([]);

  const handleCreateNode = () => {
    if (nodes.length >= 10) {
      alert("Максимальное количество узлов достигнуто (10).");
      return;
    }
    const newNode = {
      id: `node-${nodes.length + 1}`,
      name: `Node ${nodes.length + 1}`,
      x: Math.random() * 400,
      y: Math.random() * 400,
      topConnections: [],
      bottomConnections: [],
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const handleExport = () => {
    const graphStructure = {
      nodes,
    };
    console.log(JSON.stringify(graphStructure, null, 2));
  };

  const handleCreateConnection = (
    fromId: string,
    toId: string,
    fromPosition: 'top' | 'bottom',
    toPosition: 'top' | 'bottom'
  ) => {
    const hasMaxConnections = (nodeId: string, position: 'top' | 'bottom') => {
      const node = nodes.find(node => node.id === nodeId);
      if (!node) return false;
      
      const connections = position === 'top' ? node.topConnections : node.bottomConnections;
      return connections.length >= 3;
    };
  
    if (hasMaxConnections(fromId, fromPosition)) {
      alert(`Узел ${fromId} уже имеет максимальное количество соединений в позиции ${fromPosition}`);
      return;
    }
    if (hasMaxConnections(toId, toPosition)) {
      alert(`Узел ${toId} уже имеет максимальное количество соединений в позиции ${toPosition}`);
      return;
    }
  
    setNodes(prevNodes => {
      return prevNodes.map(node => {
        if (node.id === fromId) {
          const connectionsKey = fromPosition === 'top' ? 'topConnections' : 'bottomConnections';
          const currentConnections = node[connectionsKey];
  
          if (currentConnections.includes(toId)) {
            return node;
          }
  
          if (currentConnections.length >= 3) {
            alert(`Нельзя добавить больше 3 соединений (${fromPosition === 'top' ? 'верхних' : 'нижних'})`);
            return node;
          }
  
          return {
            ...node,
            [connectionsKey]: [...currentConnections, toId],
          };
        } else if (node.id === toId) {
          const connectionsKey = toPosition === 'top' ? 'topConnections' : 'bottomConnections';
          const currentConnections = node[connectionsKey];
  
          if (currentConnections.includes(fromId)) {
            return node;
          }
  
          if (currentConnections.length >= 3) {
            alert(`Нельзя добавить больше 3 соединений (${toPosition === 'top' ? 'верхних' : 'нижних'})`);
            return node;
          }
  
          return {
            ...node,
            [connectionsKey]: [...currentConnections, fromId],
          };
        }
  
        return node;
      });
    });
  };

  return (
    <div>
      <Canvas
        nodes={nodes}
        setNodes={setNodes}
        handleCreateConnection={handleCreateConnection}
      />
      <Button onClick={handleCreateNode}>Create Node</Button>
      <Button onClick={handleExport}>Export</Button>
    </div>
  );
};

export default App;
