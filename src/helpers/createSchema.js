const createSchema = (data, level = 0, lastNode = true, linesCount = [0]) => {
  let node = {
    level,
    lastNode,
    id: Math.round(Math.random() * 10000)
  }

  if (Array.isArray(data)) {
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
    linesCount[0] += 2
  } else if (typeof data === 'object') {
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
    linesCount[0] += 2
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