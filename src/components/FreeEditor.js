import React, {useContext, useEffect, useState} from "react"
import "./FreeEditor.css"
import {GlobalContext} from "../contexts/globalContext";
import createJson from "../helpers/createJson";
import createSchema from "../helpers/createSchema";

const FreeEditor = () => {
  const {state, dispatch} = useContext(GlobalContext)
  const [localJson, setLocalJson] = useState(null)

  const onTextareaChange = (e) => {
    setLocalJson(e.target.value)
  }

  const onTextareaBlur = (e) => {
    const json = JSON.parse(e.target.value)
    const schema = createSchema(json)
    dispatch({type: 'ADD_SCHEMA', payload: {schema}})
  }

  useEffect(() => {
    const json = createJson(state.schema)
    setLocalJson(json)
  }, [state.schema])

  return (
    <textarea className="FreeEditor" value={localJson} onBlur={onTextareaBlur} onChange={onTextareaChange}/>
  )
}

export default FreeEditor