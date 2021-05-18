import {createContext, useReducer} from 'react'
import updateNodeByID from "../helpers/updateNodeByID";

const initialState = {
  currentItemId: null,
  schema: null,
  linesHeight: {},
  mode: 'EDITOR'
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SCHEMA': {
      return {
        ...state,
        schema: action.payload.schema
      }
    }
    case 'SET_CURRENT_ITEM': {
      return {
        ...state,
        currentItemId: action.payload.itemId
      }
    }
    case 'SET_LINE_HEIGHT': {
      return {
        ...state,
        linesHeight: {...state.linesHeight, [action.payload.lineNumber]: action.payload.height}
      }
    }
    case 'SET_NODE_VALUE': {
      const schema = updateNodeByID(state.schema, action.payload.id, {
        value: action.payload.value
      })
      return {
        ...state,
        schema
      }
    }
    case 'SELECT_MODE': {
      return {
        ...state,
        mode: action.payload.mode
      }
    }
    default: {
      throw new Error(`Unknown action [${action.type}]`)
    }
  }
}

export const GlobalContext = createContext(null)

export const GlobalContextProvide = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalContext.Provider>
  )
}