import React, { useState } from "react";
import "./Rakeanimation.css";

function Rakeanimation() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [usedNodeIds, setUsedNodeIds] = useState([]);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const [addNodeInput, setAddNodeInput] = useState("");
  const [addEdgeInput, setAddEdgeInput] = useState("");
  const [removeNodeInput, setRemoveNodeInput] = useState("");
  const [removeNodeButtonClicked, setRemoveNodeButtonClicked] = useState(false);
  const [traversalPath, setTraversalPath] = useState("");
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const MIN_NODE_DISTANCE = 100; // Adjust this value as needed

  const validatePath = (path) => {
    const pathArray = path.split("-");
    return pathArray.every((point) => nodes.some((node) => node.id === point));
  };

  const pathExists = (source, target, visited = []) => {
    if (source === target) return true;
    visited.push(source);

    for (const edge of edges) {
      if (
        (edge.source === source && edge.target === target) ||
        (edge.source === target && edge.target === source)
      ) {
        return true;
      }
      if (edge.source === source && !visited.includes(edge.target)) {
        if (pathExists(edge.target, target, [...visited])) return true;
      }
      if (edge.source === target && !visited.includes(edge.target)) {
        if (pathExists(edge.target, source, [...visited])) return true;
      }
    }

    return false;
  };

  const animateTraversal = (path, onComplete) => {
    if (validatePath(path)) {
      const pathArray = path.split("-");
      const sourceNode = pathArray[0];
      const targetNode = pathArray[pathArray.length - 1];

      // Check if a path exists between each pair of consecutive nodes
      for (let i = 0; i < pathArray.length - 1; i++) {
        const source = pathArray[i];
        const target = pathArray[i + 1];
        if (!pathExists(source, target)) {
          alert(`Path does not exist between ${source} and ${target}.`);
          return;
        }
      }

      const animate = (index) => {
        if (index < pathArray.length - 1) {
          const sourceNode = pathArray[index];
          const targetNode = pathArray[index + 1];
          const sourceIndex = nodes.findIndex((node) => node.id === sourceNode);
          const targetIndex = nodes.findIndex((node) => node.id === targetNode);
          const duration = 2000;
          const deltaX = nodes[targetIndex].x - nodes[sourceIndex].x;
          const deltaY = nodes[targetIndex].y - nodes[sourceIndex].y;

          setPointerPosition({
            x: nodes[sourceIndex].x,
            y: nodes[sourceIndex].y,
          });

          // Apply the 'active' class to the currently visited node
          const updatedNodes = [...nodes];
          updatedNodes[sourceIndex] = {
            ...updatedNodes[sourceIndex],
            isActive: true,
          };
          setNodes(updatedNodes);

          const startTime = Date.now();
          const animationFrame = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / duration);

            setPointerPosition({
              x: nodes[sourceIndex].x + progress * deltaX,
              y: nodes[sourceIndex].y + progress * deltaY,
            });

            if (progress < 1) {
              requestAnimationFrame(animationFrame);
            } else {
              // Remove the 'active' class when the animation is complete
              // only if the node is not in the visitedNodes array
              if (!visitedNodes.includes(updatedNodes[sourceIndex].id)) {
                updatedNodes[sourceIndex] = {
                  ...updatedNodes[sourceIndex],
                  isActive: false,
                };
                setNodes(updatedNodes);
              }
              animate(index + 1);
            }
          };

          requestAnimationFrame(animationFrame);
        } else {
          setVisitedNodes(pathArray);
          onComplete(); // Call the onComplete callback when animation is complete
        }
      };
      animate(0);
    } else {
      alert("Invalid path. Please check the provided path.");
    }
  };

  const handleStartSimulation = () => {
    const pathsArray = traversalPath.split(",").map((path) => path.trim());
    const isValid = pathsArray.every((path) => validatePath(path));
    if (isValid) {
      setVisitedNodes([]);
      const animateNextPath = (index) => {
        if (index < pathsArray.length) {
          animateTraversal(pathsArray[index], () => {
            animateNextPath(index + 1);
          });
        }
      };
      animateNextPath(0);
    } else {
      alert("Invalid path(s). Please check the provided path(s).");
    }
  };

  const handleAddNode = () => {
    if (addNodeInput) {
      // Calculate a random position for the new node while ensuring it's at least MIN_NODE_DISTANCE away from any existing node
      let newX, newY;
      let isOverlapping = false;

      do {
        newX =
          Math.random() * (600 - 2 * MIN_NODE_DISTANCE) + MIN_NODE_DISTANCE;
        newY =
          Math.random() * (400 - 2 * MIN_NODE_DISTANCE) + MIN_NODE_DISTANCE;

        // Check if the new position conflicts with any existing edges
        isOverlapping = edges.some((edge) => {
          const sourceNode = nodes.find((node) => node.id === edge.source);
          const targetNode = nodes.find((node) => node.id === edge.target);

          const edgeLength = Math.sqrt(
            (targetNode.x - sourceNode.x) ** 2 +
              (targetNode.y - sourceNode.y) ** 2
          );

          const distanceToEdge = Math.abs(
            (targetNode.y - sourceNode.y) * newX -
              (targetNode.x - sourceNode.x) * newY +
              targetNode.x * sourceNode.y -
              targetNode.y * sourceNode.x
          );

          return distanceToEdge / edgeLength < MIN_NODE_DISTANCE;
        });
      } while (
        nodes.some(
          (node) =>
            Math.sqrt((node.x - newX) ** 2 + (node.y - newY) ** 2) <
            MIN_NODE_DISTANCE
        ) ||
        isOverlapping
      );

      const newNodeId = addNodeInput.toUpperCase(); // Use the input value as the node ID

      // Check if the node ID is already used
      if (usedNodeIds.includes(newNodeId)) {
        alert("Node with the same name already exists.");
        return;
      }

      const newNode = { id: newNodeId, x: newX, y: newY };
      setNodes([...nodes, newNode]);
      setUsedNodeIds([...usedNodeIds, newNodeId]);
      setAddNodeInput("");
    }
  };

  const handleAddEdge = () => {
    const edgesArray = addEdgeInput.split(",").map((edge) => edge.trim());
    const isValid = edgesArray.every((edge) => {
      const pathArray = edge.split("-").map((node) => node.trim());
      return (
        pathArray.length === 2 &&
        pathArray.every((node) => nodes.some((n) => n.id === node))
      );
    });

    if (isValid) {
      const newEdges = edgesArray.map((edge) => {
        const pathArray = edge.split("-").map((node) => node.trim());
        return { source: pathArray[0], target: pathArray[1] };
      });

      // Check if the edges already exist
      const existingEdges = newEdges.filter(
        (newEdge) =>
          !edges.some(
            (edge) =>
              (edge.source === newEdge.source &&
                edge.target === newEdge.target) ||
              (edge.source === newEdge.target && edge.target === newEdge.source)
          )
      );

      if (existingEdges.length > 0) {
        setEdges([...edges, ...existingEdges]);
        setAddEdgeInput("");
      } else {
        alert("Edges already exist.");
      }
    } else {
      alert(
        'Invalid input. Please provide valid edge(s) in the format "A-B, C-D".'
      );
    }
  };

  const handleRemoveNodeByName = () => {
    if (removeNodeInput) {
      const nodeNameToRemove = removeNodeInput.toUpperCase();

      // Check if the node exists
      if (nodes.some((node) => node.id === nodeNameToRemove)) {
        // Remove the node from nodes state
        const updatedNodes = nodes.filter(
          (node) => node.id !== nodeNameToRemove
        );
        setNodes(updatedNodes);

        // Remove the node ID from usedNodeIds
        const updatedUsedNodeIds = usedNodeIds.filter(
          (id) => id !== nodeNameToRemove
        );
        setUsedNodeIds(updatedUsedNodeIds);

        // Remove edges associated with the removed node from edges state
        const updatedEdges = edges.filter(
          (edge) =>
            edge.source !== nodeNameToRemove && edge.target !== nodeNameToRemove
        );
        setEdges(updatedEdges);

        setRemoveNodeButtonClicked(true);

        // Clear the remove node input field
        setRemoveNodeInput("");
      } else {
        alert("Node does not exist.");
      }
    }
  };

  // Display an alert if there are no nodes and the Remove Node button has been clicked
  if (nodes.length === 0 && removeNodeButtonClicked) {
    alert("No nodes exist.");
  }

  return (
    <div className="animation-container">
      <div className="inputs-container">
        <input
          type="text"
          placeholder="Add Node (e.g., Node)"
          value={addNodeInput}
          onChange={(e) => setAddNodeInput(e.target.value)}
        />
        <button onClick={handleAddNode}>Add Node</button>
      </div>
      <div className="inputs-container">
        <input
          type="text"
          placeholder="Add Edge (e.g., A-B)"
          value={addEdgeInput}
          onChange={(e) => setAddEdgeInput(e.target.value)}
        />
        <button onClick={handleAddEdge}>Add Edge</button>
      </div>
      <div className="inputs-container">
        <input
          type="text"
          placeholder="Remove Node (e.g., Node)"
          value={removeNodeInput}
          onChange={(e) => setRemoveNodeInput(e.target.value)}
        />
        <button onClick={handleRemoveNodeByName}>Remove Node</button>
      </div>

      <div className="inputs-container">
        <input
          type="text"
          placeholder="Enter path (e.g., A-B)"
          value={traversalPath}
          onChange={(e) => setTraversalPath(e.target.value)}
        />
        <button onClick={handleStartSimulation}>Start Simulation</button>
      </div>
      {nodes.length > 0 && edges.length > 0 && (
        <div className="graphh">
          {edges.map((edge, index) => (
            <svg key={index}>
              <line
                x1={nodes.find((node) => node.id === edge.source).x}
                y1={nodes.find((node) => node.id === edge.source).y}
                x2={nodes.find((node) => node.id === edge.target).x}
                y2={nodes.find((node) => node.id === edge.target).y}
                stroke="#ccc"
                strokeWidth="2"
              />
            </svg>
          ))}

          {nodes.map((node) => (
            <div
              key={node.id}
              className={`nodee ${
                visitedNodes.includes(node.id) ? "visited" : ""
              } ${node.isActive ? "active" : ""}`}
              style={{ left: node.x, top: node.y }}
            >
              {node.id}
            </div>
          ))}

          <div
            className="pointerr"
            style={{ left: pointerPosition.x, top: pointerPosition.y }}
          ></div>
        </div>
      )}
      {!validatePath(traversalPath) && (
        <div className="error-message">
          Invalid input. Please check the provided input.
        </div>
      )}
    </div>
  );
}

export default Rakeanimation;
