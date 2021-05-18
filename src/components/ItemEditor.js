import './ItemEditor.css'
import {useContext} from 'react'
import {GlobalContext} from '../contexts/globalContext'
import findNodeByID from "../helpers/findNodeByID";

const ItemEditor = (props) => {
  const {state, dispatch} = useContext(GlobalContext)

  const currentNode = findNodeByID(state.schema.node, state.currentItemId)

  const brToNl = str => str.replace(/<br\s*\/?>/mg, "\n")
  const nlToBr = str => str.replace(/(?:\r\n|\r|\n)/g, '<br>')

  const onTextAreaChange = (e) => {
    if (!e.target) return
    const value = nlToBr(e.target.value)
    dispatch({type: 'SET_NODE_VALUE', payload: {id: currentNode.id, value}})
  }

  return (
    <div className="ItemEditor-wrapper">
      <div className="ItemEditor">
        {!!currentNode ? (
          <textarea className="ItemEditor-textarea" value={brToNl(currentNode.value)} onChange={onTextAreaChange}/>
        ) : (
          <div>Aucun élément n'est sélectionné.</div>
        )}
      </div>
    </div>
  )
}

export default ItemEditor