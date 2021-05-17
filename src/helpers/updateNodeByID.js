/**
 * Update node data by its identifier
 * @param node
 * @param id
 * @param data
 * @returns {(*)|*}
 */
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

/**
 * Update a node in schema and return the updated version
 * @param schema
 * @param id
 * @param data
 * @returns {*}
 */
export default function (schema, id, data) {
  schema.node = updateNodeByID(schema.node, id, data)
  return schema
}
