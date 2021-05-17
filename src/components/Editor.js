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

  const createSchema = (data, level = 0, lastNode = true, linesCount = [0]) => {
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
        const {node: n} = createSchema(item, level + 1, isLastNode, linesCount)
        node.value.push(n)
      }
      linesCount[0] += 2
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
        const {node: n} = createSchema(item, level + 1, isLastNode, linesCount)
        node.value.push({
          name: keys[i],
          ...n
        })
      }
      linesCount[0] += 2
    } else {
      linesCount[0]++
      node = {
        ...node,
        lineNumber: linesCount[0],
        type: typeof data,
        value: data
      }
    }

    return {node, linesCount: linesCount[0]}
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
          {Array.from({length: state.schema.linesCount}, (v, k) => k).map(lineNumber => {
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