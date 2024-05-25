import { ReactComponent as WhatsappIcon} from '../assets/whatsapp-icon.svg'
import { ReactComponent as ChatIcon } from '../assets/chat-icon.svg'
import { Handle, Position } from 'reactflow';

// custom node so that we can add nodes with header & custom node styling
const NewNode = ({ data }) => {
  return (
    <div style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', borderRadius: '8px'}}>
      <section
        style={{
          backgroundColor: '#b2f0e3',
          fontWeight: 'bold',
          color: '#484848',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 12px',
          width: 248,
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      >
        <section style={{display: 'flex',  alignItems: 'center', gap:'8px'}}>
        <ChatIcon />

        {data.heading}
        </section>

        <WhatsappIcon />
      </section>
      <div
        style={{
          padding: '4px 12px 8px',
        //   backgroundColor: '#fff'
        }}
      >
        <div
          style={{
            color: '#484848',
          }}
        >
          {data.label}
        </div>
      </div>

      <Handle type="source" position={Position.Right} id="source" />

      <Handle type="target" position={Position.Left} id="target" />
    </div>
  )
}

export default NewNode