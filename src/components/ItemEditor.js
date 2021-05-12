import './ItemEditor.css'
import {useContext} from 'react'
import {GlobalContext} from '../contexts/globalContext'

const ItemEditor = (props) => {
  const {state} = useContext(GlobalContext)
  const currentNode = !!state.currentItemId ? state.nodes[state.currentItemId] : null

  const onTextAreaChange = (e) => {

  }

  return !!currentNode && (
    <div className="ItemEditor">
      <textarea className="ItemEditor-textarea" value={currentNode.value} onChange={onTextAreaChange}/>
    </div>
  )
}

export default ItemEditor