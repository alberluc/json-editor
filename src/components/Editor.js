import './Editor.css'
import ArrayNode from './ArrayNode'
import ObjectNode from './ObjectNode'
import ItemNode from './ItemNode'
import ItemEditor from './ItemEditor'
import {useContext, useEffect} from 'react'
import {GlobalContext} from '../contexts/globalContext'
import createSchema from "../helpers/createSchema";

/**
 * Build Json Editor
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const Editor = (props) => {
  const {state, dispatch} = useContext(GlobalContext)

  const render = (node) => {
    if (node.type === 'Array') {
      return (
        <ArrayNode key={node.id} data={node}>
          {node.value.map(childNode => render(childNode))}
        </ArrayNode>
      )
    } else if (node.type === 'Object') {
      return (
        <ObjectNode key={node.id} data={node}>
          {node.value.map(childNode => render(childNode))}
        </ObjectNode>
      )
    } else {
      return <ItemNode key={node.id} data={node}/>
    }
  }

  useEffect(() => {
    const schema = createSchema(props.data)
    dispatch({type: 'ADD_SCHEMA', payload: {schema}})
  }, [])

  return state.schema && (
    <div className="Editor">
      <div className="Editor-viewer">
        <div className="Editor-viewer-lines">
          {Array.from({length: state.schema.linesCount}).map((_, lineNumber) => {
            const height = state.linesHeight[lineNumber - 1]
            return (
              <div key={lineNumber} style={{height}}>{lineNumber}</div>
            );
          })}
        </div>
        <div className="Editor-viewer-data">
          {render(state.schema.node)}
        </div>
      </div>
      <ItemEditor/>
    </div>
  )
}

export default Editor