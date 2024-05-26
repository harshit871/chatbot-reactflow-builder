import { useState, useEffect } from 'react';
import { ReactComponent as ArrowBackIcon } from '../assets/arrow-back.svg';

const UpdateNode = ({
  selectedNode,
  setNodeSelected,
  setNodes,
}) => {
  const [nodeName, setNodeName] = useState(selectedNode.data['label']); // State to manage the node's label
  let id = selectedNode.id; // Store the selected node's ID

  useEffect(() => {
    setNodeName(selectedNode.data['label']); // Update the node name when the selected node changes
  }, [id]);

  // Update the node's data when the nodeName or selectedNode changes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          // Create a new object to notify React Flow about the change
          node.data = {
            ...node.data,
            label: nodeName, // Update the label of the node
          };
        }
        return node;
      })
    );
  }, [selectedNode, nodeName, setNodes]);

  // Handle the click event for the save changes button, switching back to the main sidebar
  const mainSidebar = () => {
    setNodeSelected(false); // Deselect the current node
  };

  return (
    <>
      <div className="update">
        <div className="back">
          <ArrowBackIcon onClick={mainSidebar} /> {/* Back icon to return to the main sidebar */}
          <h2 style={{ paddingLeft: 50, margin: 0 }}>Message</h2> {/* Heading for the sidebar */}
        </div>
      </div>
      <div style={{ width: `100%`, height: 2 }}></div> {/* Spacer for separation */}

      <div className="update">
        <h3>Text:</h3>

        <textarea
          rows="4"
          cols="25"
          value={nodeName} // Bind the textarea value to nodeName
          onChange={(evt) => {
            setNodeName(evt.target.value); // Update nodeName state on change
          }}
          style={{ marginBottom: 15, borderRadius: 5 }} // Style the textarea
        />
      </div>
      <div style={{ width: `100%`, height: 2 }}></div> {/* Spacer for separation */}
    </>
  );
};

export default UpdateNode;
