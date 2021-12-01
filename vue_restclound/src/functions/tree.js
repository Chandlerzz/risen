import assert from 'assert'
export const list2tree = (list, rootLabel) => {
  assert(list)
  const root = {
    name: rootLabel,
    id: 0,
    parentId:-1

  }
  list.push(root)


  // 递归方法
  const getNode = (id) => {
    const node = []
    for (let item of list) {
      if (item.parentId === id) {
        item.children = getNode(item.id)
        node.push(item)
      }
    }
    if (node.length === 0) {
      return null
    } else {
      return node
    }
  }
  // 使用根节点
  return getNode(root.parentId)
}

export const tree2list = (tree) => {
  assert(tree)
  let list = []
  if (tree instanceof Array) {
    for (let item of tree) {
      list.push(item);
      if (item.children)
        list = list.concat(tree2list(item.children))
    }
  } else {
    list.push(tree);
    if (tree.children)
      list = list.concat(tree2list(tree.children))
  }
  return list
}
