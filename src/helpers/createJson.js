import * as prettier from "prettier/standalone";

const createJson = (node) => {
  let json = null

  switch (node.type) {
    case 'Array': {
      json = []
      node.value.forEach(childNode => {
        json.push(createJson(childNode))
      })
      break;
    }
    case 'Object': {
      json = {}
      node.value.forEach(childNode => {
        json[childNode.name] = createJson(childNode)
      })
      break;
    }
    default: {
      json = node.value
    }
  }

  return json
}

export default function (schema) {
  const jsonObject = createJson(schema.node)
  return JSON.stringify(jsonObject, null, 2)
}