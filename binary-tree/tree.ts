export class Node {
  data: number
  leftChild: Node | null
  rightChild: Node | null
  constructor(
    number: number,
    left: Node | null = null,
    right: Node | null = null
  ) {
    this.data = number
    this.leftChild = left
    this.rightChild = right
  }
}

class tree {
  root: Node | null
  constructor(array: number[]) {
    this.root = this.buildTree({
      array: this._arraySortAndRemoveDuplicates(array)
    })
  }

  _arraySortAndRemoveDuplicates(array: number[]) {
    return Array.from(new Set(array.sort((a, b) => a - b)))
  }

  buildTree({
    array,
    startIndex = 0,
    endIndex = array.length - 1
  }: {
    array: number[]
    startIndex?: number
    endIndex?: number
  }): Node | null {
    if (startIndex > endIndex) return null
    let middleIndex = Math.floor((startIndex + endIndex) / 2)
    let root = new Node(
      array[middleIndex],
      this.buildTree({ array, startIndex, endIndex: middleIndex - 1 }),
      this.buildTree({ array, startIndex: middleIndex + 1, endIndex })
    )
    return root
  }

  insert({
    value,
    rootNode = this.root
  }: {
    value: number
    rootNode?: Node | null
  }) {
    if (!rootNode) return new Node(value)
    value < rootNode.data
      ? (rootNode.leftChild = this.insert({
          value,
          rootNode: rootNode.leftChild
        }))
      : (rootNode.rightChild = this.insert({
          value,
          rootNode: rootNode.rightChild
        }))
    return rootNode
  }

  delete({
    value,
    currentNode = this.root
  }: {
    value: number
    currentNode?: Node | null
  }) {
    if (!currentNode) return currentNode

    if (value < currentNode.data) {
      currentNode.leftChild = this.delete({
        value,
        currentNode: currentNode.leftChild
      })
    } else if (value > currentNode.data) {
      currentNode.rightChild = this.delete({
        value,
        currentNode: currentNode.rightChild
      })
    } else {
      if (!currentNode.leftChild) return currentNode.rightChild
      else if (!currentNode.rightChild) return currentNode.leftChild

      currentNode.data = this._minValue(currentNode.rightChild)
      currentNode.rightChild = this.delete({
        value: currentNode.data,
        currentNode: currentNode.rightChild
      })
    }
    return currentNode
  }

  _minValue(rootNode: Node) {
    let value = rootNode.data
    while (rootNode.leftChild) {
      value = rootNode.leftChild.data
      rootNode = rootNode.leftChild
    }
    return value
  }

  find({
    value,
    currentNode = this.root
  }: {
    value: number
    currentNode?: Node | null
  }): Node | null {
    if (!currentNode) return currentNode
    if (value === currentNode.data) return currentNode
    return value < currentNode.data
      ? this.find({ value, currentNode: currentNode.leftChild })
      : this.find({ value, currentNode: currentNode.rightChild })
  }

  levelOrder(callback?: Function) {
    let root = this.root,
      queue: Node[] = [],
      results: unknown[] = []
    if (!root) return results
    queue.push(root)

    while (queue.length > 0) {
      let size = queue.length,
        currentlevel: number[] = []
      for (let i = 0; i < size; i++) {
        let currentNode = queue.shift()
        if (currentNode?.data) {
          currentlevel.push(currentNode.data)
        }
        if (currentNode?.leftChild) {
          queue.push(currentNode.leftChild)
        }
        if (currentNode?.rightChild) {
          queue.push(currentNode.rightChild)
        }
      }
      results.push(currentlevel)
    }
    if (callback) {
      results.forEach((value) => callback(value))
    } else {
      return results
    }
  }

  preorder(callback?: Function) {
    let root = this.root,
      stack: Node[] = [],
      results: number[] = []
    if (!root) return results

    stack.push(root)
    while (stack.length) {
      let currnentNode = stack.pop()
      if (currnentNode?.rightChild) stack.push(currnentNode.rightChild)
      if (currnentNode?.leftChild) stack.push(currnentNode.leftChild)
      if (callback) callback(currnentNode)
      if (currnentNode?.data) results.push(currnentNode?.data)
    }
    if (!callback) return results
  }

  postorder(callback?: Function) {
    let root = this.root,
      stack: Node[] = [],
      results: number[] = []

    if (!root) return
    if (root.rightChild) stack.push(root.rightChild)
    if (root.leftChild) stack.push(root.leftChild)

    while (stack.length) {
      let currnentNode = stack.pop()
      if (currnentNode?.rightChild) stack.push(currnentNode.rightChild)
      if (currnentNode?.leftChild) stack.push(currnentNode.leftChild)
      if (callback) callback(currnentNode)
      if (currnentNode?.data) results.push(currnentNode?.data)
    }
    if (callback) callback(root.data)
    results.push(root.data)
    if (!callback) return results
  }

  inorder({
    root = this.root,
    callback,
    results = []
  }: {
    root?: Node | null
    callback?: Function
    results?: number[]
  }) {
    if (!root) return results
    this.inorder({ root: root.leftChild, callback, results })
    callback ? callback(root) : results.push(root.data)
    this.inorder({ root: root.rightChild, callback, results })
    if (!callback) return results
  }

  height(node = this.root): number {
    if (!node) return -1
    const leftHeight = this.height(node.leftChild),
      rightHeight = this.height(node.rightChild)
    return Math.max(leftHeight, rightHeight) + 1
  }

  depth(nodeValue: number) {
    let currentNode = this.root,
      counter = 0
    if (this.find({ value: nodeValue })?.data !== nodeValue) return null
    while (currentNode) {
      if (nodeValue < currentNode.data) {
        currentNode = currentNode.leftChild
        counter++
      } else if (nodeValue > currentNode.data) {
        currentNode = currentNode.rightChild
        counter++
      } else {
        return counter
      }
    }
  }

  isBalanced(root = this.root) {
    if (!root) return true
    return (
      Math.abs(this.height(root.leftChild) - this.height(root.rightChild)) < 2
    )
  }

  rebalance() {
    let newArray = this.inorder({})
    if (newArray) return (this.root = this.buildTree({ array: newArray }))
  }
}

const randomNumberArray = (length: number) => {
  const numberArray: number[] = []
  while (length > 0) {
    numberArray.push(Math.floor(Math.random() * 100))
    length--
  }
  return numberArray
}

const randomData = randomNumberArray(7)
console.log(randomData)

let dataTree = new tree(randomData)
console.log(dataTree.levelOrder())
console.log(dataTree.inorder({}))
console.log(dataTree.preorder())
console.log(dataTree.postorder())
console.log(dataTree.isBalanced())
dataTree.insert({ value: 101 })
dataTree.insert({ value: 111 })
dataTree.insert({ value: 123 })
dataTree.insert({ value: 109 })
dataTree.insert({ value: 167 })
console.log(dataTree.isBalanced())
dataTree.rebalance()
console.log(dataTree.isBalanced())
console.log(dataTree.levelOrder())
console.log(dataTree.inorder({}))
console.log(dataTree.preorder())
console.log(dataTree.postorder())
console.log(dataTree.isBalanced())
