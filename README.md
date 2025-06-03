# Binary Search Tree

A JavaScript implementation of a Binary Search Tree with traversal methods, balancing, and tree operations.

## Features

- Build balanced BST from array (removes duplicates automatically)
- Insert, delete, and search operations
- Four traversal methods: level-order, in-order, pre-order, post-order
- Tree balancing and rebalancing
- Height/depth calculations and balance checking
- Visual tree display

## Quick Start

```javascript
// Create tree from array
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5]);

// Basic operations
tree.insert(15);
tree.deleteItem(4);
const found = tree.find(7); // returns node or null

// Traversals (all require callback function)
tree.inOrder(node => console.log(node.data));    // sorted output
tree.levelOrder(node => console.log(node.data)); // breadth-first
tree.preOrder(node => console.log(node.data));
tree.postOrder(node => console.log(node.data));

// Tree info
console.log(tree.isBalanced());        // true/false
console.log(tree.height(tree.root));   // tree height
console.log(tree.depth(7));            // depth of value 7

// Rebalance if needed
tree.rebalance();

// Visualize tree
tree.prettyPrint();
```

## Running the Demo

```bash
node bst.js
```

The included driver script demonstrates all functionality with random data, showing:
- Tree creation and balancing
- All traversal methods
- Intentional unbalancing and rebalancing
- Search and deletion operations

## Methods

| Method | Description |
|--------|-------------|
| `insert(value)` | Add value to tree |
| `deleteItem(value)` | Remove value from tree |
| `find(value)` | Search for value, returns node or null |
| `inOrder(callback)` | Traverse in sorted order |
| `levelOrder(callback)` | Traverse level by level |
| `preOrder(callback)` | Traverse root → left → right |
| `postOrder(callback)` | Traverse left → right → root |
| `height(node)` | Get height of node/subtree |
| `depth(value)` | Get depth of value in tree |
| `isBalanced()` | Check if tree is balanced |
| `rebalance()` | Rebalance entire tree |
| `prettyPrint()` | Display tree structure |

## Example Output

```
Tree structure:
│   ┌── 23
└── 8
    │   ┌── 7
    └── 4
        │   └── 3
        └── 1

In-order traversal: 1 3 4 7 8 23
Is balanced: true
```

Built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.