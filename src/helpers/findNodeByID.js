/**
 * Find and return a node by its identifier
 * @param node
 * @param id
 * @returns {null|*}
 */
const findNodeByID = (node, id) => {
  if (node.id === id) return node
  else {
    if (typeof node.value !== 'object') {
      return null
    }
    let found = null
    node.value.forEach(childNode => {
      const node = findNodeByID(childNode, id)
      if (node) found = node
    })
    return found
  }
}

export default findNodeByID
