import {createContext, useReducer} from 'react'

const initialState = {
  currentItemId: null,
  schema: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SCHEMA': {
      return {
        ...state,
        schema: action.payload.schema
      }
    }
    case 'TOGGLE_ITEM': {
      if (state.currentItemId === action.payload.itemId) {
        return {
          ...state,
          currentItemId: null
        }
      } else {
        return {
          ...state,
          currentItemId: action.payload.itemId
        }
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