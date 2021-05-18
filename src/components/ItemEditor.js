import './ItemEditor.css'
import {useContext, useEffect, useState} from 'react'
import {GlobalContext} from '../contexts/globalContext'
import findNodeByID from "../helpers/findNodeByID";

const ItemEditor = (props) => {
  const {state, dispatch} = useContext(GlobalContext)
  const currentNode = findNodeByID(state.schema.node, state.currentItemId)

  const [localText, setLocalText] = useState(currentNode?.value)

  const onTextareaInput = (e) => {
    dispatch({type: 'SET_NODE_VALUE', payload: {id: currentNode.id, value: e.target.innerHTML}})
  }

  const applyStyle = style => e => {
    e.preventDefault()
    e.nativeEvent.preventDefault()
    document.execCommand(style, false)
  }

  const onTextareaKeyDown = e => {
    if (e.keyCode === 13) {
      return false;
    }
  };

  useEffect(() => {
    setLocalText(currentNode?.value)
  }, [currentNode?.id])

  return (
    <div className="ItemEditor-wrapper">
      <div className="ItemEditor">
        {!currentNode ? (
          <div>Aucun élément n'est sélectionné.</div>
        ) : (
          <>
            <header className="ItemEditor-header">
              <button className="ItemEditor-style" onMouseDown={applyStyle('italic')}>Italic</button>
              <button className="ItemEditor-style" onMouseDown={applyStyle('bold')}>Bold</button>
              <button className="ItemEditor-style" onMouseDown={applyStyle('underline')}>Underline</button>
            </header>
            <div
              className="ItemEditor-textarea"
              contentEditable={true}
              onInput={onTextareaInput}
              onKeyDown={onTextareaKeyDown}
              dangerouslySetInnerHTML={{__html: localText}}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default ItemEditor