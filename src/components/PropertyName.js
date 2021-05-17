function PropertyName(props) {
  return (
    <>
      <div className={`ItemNode-key`}>
        <span>"</span>
        <span>{props.name}</span>
        <span>"</span>
      </div>
      <span> : </span>
    </>
  )
}

export default PropertyName