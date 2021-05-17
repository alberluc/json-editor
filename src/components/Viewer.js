import './Viewer.css'
import ArrayNode from "./ArrayNode";
import ObjectNode from "./ObjectNode";
import ItemNode from "./ItemNode";
import {useContext} from "react";
import {GlobalContext} from "../contexts/globalContext";

function Viewer() {
  const {state} = useContext(GlobalContext)

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

  return (
    <div className="Viewer-wrapper">
      <div className="Viewer">
        <div className="Viewer-lines">
          {Array.from({length: state.schema.linesCount}).map((_, lineNumber) => {
            lineNumber += 1
            const height = state.linesHeight[lineNumber]
            return (
              <div key={lineNumber} style={{height}}>{lineNumber}</div>
            );
          })}
        </div>
        <div className="Viewer-data">
          {render(state.schema.node)}
        </div>
      </div>
    </div>
  )
}

export default Viewer