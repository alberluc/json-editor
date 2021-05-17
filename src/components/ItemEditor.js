import './ItemEditor.css'
import {useContext} from 'react'
import {GlobalContext} from '../contexts/globalContext'
import findNodeByID from "../helpers/findNodeByID";

const ItemEditor = (props) => {
  const {state, dispatch} = useContext(GlobalContext)

  const currentNode = findNodeByID(state.schema.node, state.currentItemId)

  const onTextAreaChange = (e) => {
    dispatch({type: 'SET_NODE_VALUE', payload: {id: currentNode.id, value: e.target.value}})
  }

  return !!currentNode && (
    <div className="ItemEditor">
      <textarea className="ItemEditor-textarea" value={currentNode.value} onChange={onTextAreaChange}/>
    </div>
  )
}

export default ItemEditor