import ReactFlow, { Controls, ReactFlowProvider } from 'reactflow';
import './index.css'
import 'reactflow/dist/style.css';
import Topbar from './Components/Topbar'
import Sidebar from './Components/Sidebar.jsx'
import UpdateNode from './Components/UpdateNode.jsx'
import Notification from './Components/Notification.jsx'
import useApp from './hooks/useApp.js';

const App = () => {
  const { 
    update,
    saveFlow,
    nodeTypes,
    nodes, 
    onNodesChange,
    edges,
    onEdgesChange,
    setReactFlowInstance,
    nodeSelected,
    changeNode,
    errorMessage,
    messageColor,
    reactFlowWrapper,
    onConnect, 
    onDragOver, 
    onDrop, 
    setNodeSelected, 
    setNodes
  } = useApp();

  return (
    <section className="app-flow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <div className="top-bar">
            <Notification
              errorMessage={errorMessage}
              messageColor={messageColor}
            />
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            proOptions={{ hideAttribution: true }}
            onNodeClick={update}
            nodeTypes={nodeTypes}
          >
            <Controls />
          </ReactFlow>
        </div>
        {nodeSelected ? (
          <div className="right-bar">
            <Topbar saveFlow={saveFlow} />

            <UpdateNode
              selectedNode={changeNode}
              setNodeSelected={setNodeSelected}
              setNodes={setNodes}
            />
          </div>
        ) : (
          <div className="right-bar">
            <Topbar saveFlow={saveFlow} />

            <Sidebar />
          </div>
        )}
      </ReactFlowProvider>
    </section>
  )
}

export default App