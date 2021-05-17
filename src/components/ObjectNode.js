import PropertyName from "./PropertyName";

const ObjectNode = (props) => {
  const {data, children} = props
  return (
    <div data-level={data.level} data-type={data.type}>
      {data.name && <PropertyName name={data.name}/>}
      <span>{"{"}</span>
      <div>
        {children}
      </div>
      <span>{"}"}</span>
      {!data.lastNode && (
        <span>,</span>
      )}
    </div>
  )
}

export default ObjectNode