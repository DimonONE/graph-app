import React from "react";
import { NodeType } from "../App";
import Connection from "./Connection";

type Props = {
  nodes: NodeType[];
};

const ConnectionsGraph: React.FC<Props> = ({ nodes }) => {
  const getConnectionPosition = (
    fromNode: NodeType,
    toNode: NodeType
  ): { fromPosition: "top" | "bottom"; toPosition: "top" | "bottom" } => {
    if (fromNode.topConnections.includes(toNode.id)) {
      return { fromPosition: "top", toPosition: "bottom" };
    } else if (fromNode.bottomConnections.includes(toNode.id)) {
      return { fromPosition: "bottom", toPosition: "top" };
    } else {
      return { fromPosition: "top", toPosition: "top" };
    }
  };

  return (
    <svg
      style={{ position: "absolute", zIndex: 1, top: 0, left: 0 }}
      width="100%"
      height="100%"
    >
      {nodes.map((fromNode) =>
        fromNode.topConnections.map((toId) => {
          const toNode = nodes.find((node) => node.id === toId);
          if (toNode) {
            const { fromPosition, toPosition } = getConnectionPosition(
              fromNode,
              toNode
            );
            return (
              <Connection
                key={`${fromNode.id}-${toNode.id}`}
                fromId={fromNode.id}
                toId={toNode.id}
                fromPosition={fromPosition}
                toPosition={toPosition}
                nodes={nodes}
              />
            );
          }
          return null;
        })
      )}
    </svg>
  );
};

export default ConnectionsGraph;
