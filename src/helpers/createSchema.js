/**
 * Parse a json object to create a schema with nodes entities
 * @param data Original json object
 * @param level Level of node in tree
 * @param lastNode Is the last node or not ?
 * @param linesCount Line number associated to the node
 * @returns {{node: ({level: number, lastNode: boolean, id: number, lineNumber: number, type: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"), value}|{level: number, lastNode: boolean, id: number, type: string, value: *[]}|{level: number, lastNode: boolean, id: number, type: string, value: *[]}), linesCount: number}}
 */
const createSchema = (data, level = 0, lastNode = true, linesCount = [0]) => {
  let node = {
    level,
    lastNode,
    id: Math.round(Math.random() * 10000)
  }

  if (Array.isArray(data)) {
    linesCount[0] += 1
    node = {
      ...node,
      type: 'Array',
      value: []
    }
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      const isLastNode = i === data.length - 1
      const {node: n} = createSchema(item, level + 1, isLastNode, linesCount)
      node.value.push(n)
    }
    linesCount[0] += 1
  } else if (typeof data === 'object') {
    linesCount[0] += 1
    node = {
      ...node,
      type: 'Object',
      value: []
    }
    const keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      const item = data[keys[i]]
      const isLastNode = i === keys.length - 1
      const {node: n} = createSchema(item, level + 1, isLastNode, linesCount)
      node.value.push({
        name: keys[i],
        ...n
      })
    }
    linesCount[0] += 1
  } else {
    linesCount[0]++
    node = {
      ...node,
      lineNumber: linesCount[0],
      type: typeof data,
      value: data
    }
  }

  return {node, linesCount: linesCount[0]}
}

export default createSchema