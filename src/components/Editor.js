import {useContext, useEffect} from 'react'
import SplitPane from "react-split-pane";
import './Editor.css'
import ItemEditor from './ItemEditor'
import {GlobalContext} from '../contexts/globalContext'
import createSchema from "../helpers/createSchema";
import Viewer from "./Viewer";

/**
 * Build Json Editor
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const Editor = (props) => {
  const {state, dispatch} = useContext(GlobalContext)

  useEffect(() => {
    const schema = createSchema(props.data)
    dispatch({type: 'ADD_SCHEMA', payload: {schema}})
  }, [])

  return state.schema && (
    <div className="Editor">
      {!state.currentItemId ? (
        <Viewer/>
      ) : (
        <SplitPane split="vertical" defaultSize={800} minSize={500}>
          <Viewer/>
          <ItemEditor/>
        </SplitPane>
      )}
    </div>
  )
}

export default Editor