type NodeData = string | number | null;

class listNode {
  data: NodeData;
  nextNode: listNode | null;
  constructor({
    value,
    next = null,
  }: {
    value: NodeData;
    next?: listNode | null;
  }) {
    this.data = value;
    this.nextNode = next;
  }
}

class LinkedList {
  head: listNode | null;
  size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  get tail() {
    let currentNode: listNode;
    if (!this.head) return null;

    currentNode = this.head;

    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
    }
    return currentNode.data;
  }

  prepend({ value }: { value: NodeData }) {
    this.head = new listNode({ value, next: this.head });
    this.size++;
  }

  append({ value }: { value: NodeData }) {
    let currentNode: listNode;
    if (!this.head) {
      this.head = new listNode({ value });
      this.size++;
    } else {
      currentNode = this.head;
      while (currentNode.nextNode) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = new listNode({ value });
      this.size++;
    }
  }

  atIndex({ index }: { index: number }) {
    let currentNode = this.head,
      counter = 0;
    if (index < 0 || index > this.size - 1) return null;
    while (currentNode) {
      if (counter === index) {
        return currentNode?.data;
      }
      currentNode = currentNode.nextNode;
      counter++;
    }
  }

  pop() {
    let currentNode: listNode,
      counter: number = this.size - 2;
    if (!this.head) return;

    currentNode = this.head;
    while (currentNode.nextNode && counter > 0) {
      currentNode = currentNode.nextNode;
      counter--;
    }
    currentNode.nextNode = null;
    this.size--;
  }

  contains({ value }: { value: NodeData }) {
    let currentNode = this.head;
    if (!currentNode) return;
    while (currentNode) {
      if (currentNode.data === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  find({ value }: { value: NodeData }) {
    let index = 0,
      currentNode = this.head;
    if (!currentNode) return null;
    while (currentNode) {
      if (currentNode.data === value) {
        return index;
      }
      currentNode = currentNode.nextNode;
      index++;
    }
  }

  toString() {
    let listString = '',
      currentNode = this.head;
    if (!currentNode) return 'null';
    while (currentNode) {
      listString += `(${currentNode.data}) -> `;
      currentNode = currentNode.nextNode;
    }
    listString += 'null';
    return listString;
  }
}

const list = new LinkedList();

list.append({ value: 100 });
list.append({ value: 200 });
list.append({ value: 300 });
list.append({ value: 400 });
list.prepend({ value: 50 });
console.log(list.toString());
console.log(list.atIndex({ index: 2 }));
