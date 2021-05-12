import './ItemNode.css'
import {GlobalContext} from '../contexts/globalContext'
import {useContext} from 'react'

const ItemNode = (props) => {
  const {data} = props
  const {dispatch} = useContext(GlobalContext)

  const onSelectValue = () => {
    dispatch({type: 'TOGGLE_ITEM', payload: {itemId: data.id}})
  }

  return (
    <div data-level={data.level} className={`Item-node Item-node-${data.type}`}>
      <div className={`Item-node-key`}>
        <span>"</span>
        <span>{data.name}</span>
        <span>"</span>
      </div>
      <span> : </span>
      <div className={`Item-node-value`} onClick={onSelectValue}>
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