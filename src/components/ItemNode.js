import './ItemNode.css'
import {GlobalContext} from '../contexts/globalContext'
import {useContext, useEffect, useRef} from 'react'

const ItemNode = (props) => {
  const {data} = props
  const {dispatch} = useContext(GlobalContext)
  const elRef = useRef()

  const onSelectValue = () => {
    dispatch({type: 'TOGGLE_ITEM', payload: {itemId: data.id}})
  }

  useEffect(() => {
    const el = elRef.current
    const rect = el.getBoundingClientRect()
    dispatch({type: 'SET_LINE_HEIGHT', payload: {lineNumber: data.lineNumber, height: rect.height}})
  }, [data.value])

  return (
    <div ref={elRef} data-level={data.level} className={`ItemNode ItemNode-${data.type}`}>
      <div className={`ItemNode-key`}>
        <span>"</span>
        <span>{data.name}</span>
        <span>"</span>
      </div>
      <span> : </span>
      <div className={`ItemNode-value`} onClick={onSelectValue}>
        {data.type === 'string' && '"'}
        <span>{data.value}</span>
        {data.type === 'string' && '"'}
      </div>
      {!data.lastNode && (
        <span>,</span>
      )}
    </div>
  )
}

export default ItemNode