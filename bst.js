class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(sortedArray);
    }

    buildTree(array) {
        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));

        return root;
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) return;

        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    insert(value) {
        const search = (node) => {
            if (value < node.data) {
                if (node.left === null) {
                    node.left = new Node(value);
                    return;
                }
                return search(node.left);
            } else if (value > node.data) {
                if (node.right === null) {
                    node.right = new Node(value);
                    return;
                }
                return search(node.right);
            }
        };

        if (this.root === null) {
            this.root = new Node(value);
        } else {
            search(this.root);
        }
    }

    deleteItem(value) {
        const removeNode = (node, value) => {
            if (node === null) return null;

            if (value === node.data) {
                if (node.left === null && node.right === null) {
                    return null;
                }
                if (node.left === null) {
                    return node.right;
                }
                if (node.right === null) {
                    return node.left;
                }

                let tempNode = node.right;
                while (tempNode.left !== null) {
                    tempNode = tempNode.left;
                }
                node.data = tempNode.data;
                node.right = removeNode(node.right, tempNode.data);
                return node;
            } else if (value < node.data) {
                node.left = removeNode(node.left, value);
                return node;
            } else {
                node.right = removeNode(node.right, value);
                return node;
            }
        };

        this.root = removeNode(this.root, value);
    }

    find(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.data) return current;
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }

    levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required.');
        }

        if (this.root === null) return;

        const q = [this.root];

        while (q.length > 0) {
            const node = q.shift();
            callback(node);

            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }

    inOrder(callback, node = this.root) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required.');
        }
        if (node === null) return;

        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
    }

    preOrder(callback, node = this.root) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required.');
        }
        if (node === null) return;

        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    }

    postOrder(callback, node = this.root) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required.');
        }
        if (node === null) return;

        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
    }

    height(node) {
        if (node === null) return -1;
        
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return 1 + Math.max(leftHeight, rightHeight);
    }

    depth(value, node = this.root, currentDepth = 0) {
        if (node === null) return null;
        if (node.data === value) return currentDepth;

        if (value < node.data) {
            return this.depth(value, node.left, currentDepth + 1);
        } else {
            return this.depth(value, node.right, currentDepth + 1);
        }
    }

    isBalanced(node = this.root) {
        if (node === null) return true;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) return false;

        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance() {
        const nodes = [];
        this.inOrder(node => nodes.push(node.data));
        this.root = this.buildTree(nodes);
    }
}

// this is linked to the driver script
function generateRandomArray(size, min, max) {
    const arr = [];
    while (arr.length < size) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        arr.push(num);
    }
    return arr;
}

// DRIVER SCRIPT; a small program/script just for running and testing the code
(function driver() {
    console.log("=== Binary Search Tree Test Driver ===\n");

    // 1. Generate random array of 15 numbers < 100
    const randomNumbers = generateRandomArray(15, 0, 99);
    console.log("Random numbers:", randomNumbers);

    // 2. Build the tree
    const tree = new Tree(randomNumbers);
    console.log("\nTree structure:");
    tree.prettyPrint();

    // 3. Check if balanced
    console.log("\nIs tree balanced?", tree.isBalanced());

    // 4. Print traversals
    const results = [];
    
    console.log("\nLevel order traversal:");
    tree.levelOrder(node => process.stdout.write(node.data + " "));
    console.log();

    console.log("\nPre order traversal:");
    tree.preOrder(node => process.stdout.write(node.data + " "));
    console.log();

    console.log("\nPost order traversal:");
    tree.postOrder(node => process.stdout.write(node.data + " "));
    console.log();

    console.log("\nIn order traversal:");
    tree.inOrder(node => process.stdout.write(node.data + " "));
    console.log();

    // 5. Unbalance the tree by adding several numbers > 100
    const bigNumbers = [101, 110, 120, 130, 140];
    bigNumbers.forEach(num => tree.insert(num));
    console.log("\nInserted numbers to unbalance:", bigNumbers);

    console.log("\nTree structure after insertions:");
    tree.prettyPrint();

    // 6. Confirm unbalanced
    console.log("\nIs tree balanced after insertions?", tree.isBalanced());

    // 7. Rebalance the tree
    tree.rebalance();
    console.log("\nTree rebalanced!");

    console.log("\nTree structure after rebalancing:");
    tree.prettyPrint();

    // 8. Confirm balanced again
    console.log("\nIs tree balanced after rebalance?", tree.isBalanced());

    // 9. Print traversals again
    console.log("\nLevel order traversal (after rebalance):");
    tree.levelOrder(node => process.stdout.write(node.data + " "));
    console.log();

    console.log("\nPre order traversal (after rebalance):");
    tree.preOrder(node => process.stdout.write(node.data + " "));
    console.log();

    console.log("\nPost order traversal (after rebalance):");
    tree.postOrder(node => process.stdout.write(node.data + " "));
    console.log();

    console.log("\nIn order traversal (after rebalance):");
    tree.inOrder(node => process.stdout.write(node.data + " "));
    console.log("\n");

    // Additional tests
    console.log("\n=== Additional Tests ===");
    
    // Test find method
    const testValue = randomNumbers[0];
    const foundNode = tree.find(testValue);
    console.log(`\nSearching for ${testValue}:`, foundNode ? `Found! Data: ${foundNode.data}` : "Not found");
    
    // Test height and depth
    console.log(`Height of tree: ${tree.height(tree.root)}`);
    console.log(`Depth of ${testValue}: ${tree.depth(testValue)}`);
    
    // Test deletion
    console.log(`\nDeleting ${testValue}...`);
    tree.deleteItem(testValue);
    console.log(`Searching for ${testValue} after deletion:`, tree.find(testValue) ? "Still found" : "Successfully deleted");
    
    console.log("\n=== Test Complete ===");
})();