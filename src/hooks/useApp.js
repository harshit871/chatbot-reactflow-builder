import { useState, useRef, useCallback, useMemo } from 'react'
import { addEdge, useNodesState, useEdgesState } from 'reactflow'
import NewNode from '../Components/newNode';

let id = 1; // Initial ID for nodes

function useApp() {
    // State hooks to manage nodes, edges, and various other states
    const [nodes, setNodes, onNodesChange] = useNodesState([]); // Nodes state and handlers
    const [edges, setEdges, onEdgesChange] = useEdgesState([]); // Edges state and handlers
    const [reactFlowInstance, setReactFlowInstance] = useState(null); // Instance of the React Flow
    const [nodeSelected, setNodeSelected] = useState(false); // Flag to check if a node is selected
    const [changeNode, setChangeNode] = useState(null); // State to store the currently selected node
    const [errorMessage, setErrorMessage] = useState(null); // Message to display errors
    const [messageColor, setMessageColor] = useState(null); // Color indicator for messages
    const [targetHandles, setTargetHandles] = useState([]); // Track target handles for new edges
    const reactFlowWrapper = useRef(null); // Reference to the React Flow wrapper
    
    // Update state when a node is selected by the user
    const update = useCallback((event, node) => {
        setChangeNode(node); // Update the selected node
        setNodeSelected(true); // Set the node selected flag to true
    }, []);
  
    // Track source and target handles to limit connections
    let sourceHandles = [];
    let targetHandle = [];
    
    // Handle new edge creation between nodes
    const onConnect = useCallback(
      (params) => {
        // Prevent multiple connections from the same source handle
        if (sourceHandles.includes(params.source)) return;
        sourceHandles = sourceHandles.concat(params.source); // Add the source handle to the list
  
        // Add an edge with an arrowhead
        setEdges((eds) => addEdge({ ...params, markerEnd: { type: 'arrowclosed' } }, eds));
  
        // Track connected target handles
        if (targetHandle.includes(params.target)) return;
        targetHandle = targetHandle.concat(params.target); // Add the target handle to the list
        setTargetHandles(targetHandle); // Update the state with the new target handles
      },
      [setEdges]
    );
  
    // Enable dragging over the flow area
    const onDragOver = useCallback((event) => {
      event.preventDefault(); // Prevent default behavior
      event.dataTransfer.dropEffect = 'move'; // Set the drop effect to 'move'
    }, []);
  
    // Handle dropping of new nodes onto the flow area
    const onDrop = useCallback(
      (event) => {
        event.preventDefault(); // Prevent default behavior
  
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect(); // Get the bounds of the React Flow wrapper
        const type = event.dataTransfer.getData('application/reactflow'); // Get the type of the dropped element
  
        // Verify the dropped element
        if (typeof type === 'undefined' || !type) {
          return; // If the type is invalid, do nothing
        }
  
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        }); // Calculate the position of the new node
  
        // Create a new node
        const newerNode = {
          id: `node_${id}`, // Assign a unique ID
          type: 'node', // Define the type of the node
          position, // Set the position of the node
          data: { heading: 'Send Message', label: `test message ${id}` }, // Set the data for the node
        };

        id++; // Increment the ID for the next node
        setNodes((nds) => nds.concat(newerNode)); // Add the new node to the state
      },
      [reactFlowInstance, setNodes]
    );
  
    // Define custom node types for the flow
    const nodeTypes = useMemo(
      () => ({
        node: NewNode, // Use the NewNode component for nodes of type 'node'
      }),
      []
    );
  
    // Save the node flow and validate connections
    const saveFlow = () => {
      const totalNodes = reactFlowInstance.getNodes().length; // Get the total number of nodes
  
      // Validate that all nodes except one have target handles connected
      if (targetHandles.length !== totalNodes - 1) {
        setErrorMessage('Cannot save Flow'); // Set error message if validation fails
        setMessageColor('redMessage'); // Set message color to red
        setTimeout(() => {
          setErrorMessage(null); // Clear the error message after 5 seconds
        }, 5000);
      } else {
        setErrorMessage('Saved Flow'); // Set success message if validation passes
        setMessageColor('greenMessage'); // Set message color to green
        setTimeout(() => {
          setErrorMessage(null); // Clear the success message after 5 seconds
        }, 5000);
      }
    };

    return {
        update, // Function to update the selected node
        saveFlow, // Function to save the node flow
        nodeTypes, // Custom node types
        nodes, // Nodes state
        onNodesChange, // Nodes change handler
        edges, // Edges state
        onEdgesChange, // Edges change handler
        setReactFlowInstance, // Function to set the React Flow instance
        nodeSelected, // Flag indicating if a node is selected
        changeNode, // The currently selected node
        errorMessage, // The error message
        messageColor, // The color of the message
        reactFlowWrapper, // Reference to the React Flow wrapper
        onConnect, // Function to handle new connections
        onDragOver, // Function to handle dragging over the flow area
        onDrop, // Function to handle dropping new nodes
        setNodeSelected, // Function to set the node selected flag
        setNodes // Function to set the nodes state
    };
}

export default useApp;
