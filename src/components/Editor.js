import './Editor.css'
import ArrayNode from './ArrayNode'
import ObjectNode from './ObjectNode'
import ItemNode from './ItemNode'
import ItemEditor from './ItemEditor'
import {useContext, useEffect} from 'react'
import {GlobalContext} from '../contexts/globalContext'

/**
 * Build Json Editor
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const Editor = (props) => {
  const {state, dispatch} = useContext(GlobalContext)

  const createSchema = (data, level = 0, lastNode = true, linesCount = 0) => {
    let node = {
      level,
      lastNode,
      id: Math.round(Math.random() * 10000)
    }

    if (Array.isArray(data)) {
      node = {
        ...node,
        type: 'Array',
        value: []
      }
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const isLastNode = i === data.length - 1
        const {node: n, linesCount: l} = createSchema(item, level + 1, isLastNode)
        node.value.push(n)
        linesCount += l
      }
      linesCount += 2
    } else if (typeof data === 'object') {
      node = {
        ...node,
        type: 'Object',
        value: []
      }
      const keys = Object.keys(data)
      for (let i = 0; i < keys.length; i++) {
        const item = data[keys[i]]
        const isLastNode = i === keys.length - 1
        const {node: n, linesCount: l} = createSchema(item, level + 1, isLastNode)
        node.value.push({
          name: keys[i],
          ...n
        })
        linesCount += l
      }
      linesCount += 2
    } else {
      node = {
        ...node,
        type: typeof data,
        value: data
      }
      linesCount++
    }

    return {node, linesCount}
  }

  const render = (data) => {
    if (data.type === 'Array') {
      return (
        <ArrayNode key={data.id} data={data}>
          {data.value.map(item => render(item))}
        </ArrayNode>
      )
    } else if (data.type === 'Object') {
      return (
        <ObjectNode key={data.id} data={data}>
          {data.value.map(item => render(item))}
        </ObjectNode>
      )
    } else {
      return <ItemNode key={data.uuid} data={data}/>
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
          {Array.from({length: state.schema.linesCount}, (v, k) => k).map(lineNumber => (
            <div key={lineNumber}>{lineNumber}</div>
          ))}
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