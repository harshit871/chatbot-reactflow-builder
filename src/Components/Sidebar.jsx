import { ReactComponent as MsgIcon } from '../assets/msg-icon.svg'
import onDragStart from '../utils/onDragStart';

function Sidebar() {

  return (
      <aside>
        <section
          className="app-node"
          onDragStart={(event) => onDragStart(event, 'default')}
          draggable
        >
         <MsgIcon />
          Message
        </section>
      </aside>
  )
}

export default Sidebar;