import './ItemNode.css'
import {GlobalContext} from '../contexts/globalContext'
import {useContext, useEffect, useRef} from 'react'
import PropertyName from "./PropertyName";

const ItemNode = (props) => {
  const {data} = props
  const {dispatch, state} = useContext(GlobalContext)
  const elRef = useRef()

  const onSelectValue = () => {
    dispatch({type: 'SET_CURRENT_ITEM', payload: {itemId: data.id}})
  }

  useEffect(() => {
    const el = elRef.current
    const rect = el.getBoundingClientRect()
    dispatch({type: 'SET_LINE_HEIGHT', payload: {lineNumber: data.lineNumber, height: rect.height}})
  }, [data.value])

  return (
    <div ref={elRef} data-level={data.level} data-selected={data.id === state.currentItemId} className={`ItemNode ItemNode-${data.type}`}>
      {data.name && <PropertyName name={data.name}/>}
      <div className={`ItemNode-value`} onClick={onSelectValue}>
        {data.type === 'string' && '"'}
        <span>{data.value}</span>
        {data.type === 'string' && '"'}
        {!data.lastNode && (
          <span className="ItemNode-separator">,</span>
        )}
      </div>
    </div>
  )
}

export default ItemNode