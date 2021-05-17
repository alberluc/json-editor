const updateNodeByID = (node, id, data) => {
  if (node.id === id) {
    return {
      ...node,
      ...data
    }
  }
  else {
    if (typeof node.value !== 'object') {
      return node
    }
    node.value = node.value.map(childNode => updateNodeByID(childNode, id, data))
  }

  return node
}

export default function (schema, id, data) {
  schema.node = updateNodeByID(schema.node, id, data)
  return schema
}
