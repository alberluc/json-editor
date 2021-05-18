import './EditorMode.css'
import {useContext} from "react";
import {GlobalContext} from "../contexts/globalContext";

const EditorMode = () => {
  const {state, dispatch} = useContext(GlobalContext)

  const onModeClick = mode => () => {
    dispatch({type: 'SELECT_MODE', payload: {mode}})
  }

  return (
    <div className="EditorMode">
      <span className="EditorMode-title">Mode :</span>
      <div className="EditorMode-mode-wrapper">
        <button className="EditorMode-mode" data-selected={state.mode === 'EDITOR'} onClick={onModeClick('EDITOR')}>
          <span>Editeur</span>
        </button>
        <button className="EditorMode-mode" data-selected={state.mode === 'FREE'} onClick={onModeClick('FREE')}>
          <span>Libre</span>
        </button>
      </div>
    </div>
  )
}

export default EditorMode