// TODO every time you run git add, a tree is created with the mode of access of each file, its path, and its blob hash.

class TreeNode {
    constructor(name) {
        this.name = name;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }

    findChild(name) {
        return this.children.find(child => child.name === name);
    }

    removeChild(name) {
        const index = this.children.findIndex(child => child.name === name);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    display(indent = 0) {
        console.log(' '.repeat(indent) + this.name);
        for (const child of this.children) {
            child.display(indent + 2);
        }
    }
}

// Usage example:

const root = new TreeNode('root');
const dir1 = new TreeNode('dir1');
const dir2 = new TreeNode('dir2');
const file1 = new TreeNode('file1.txt');
const file2 = new TreeNode('file2.txt');

root.addChild(dir1);
root.addChild(dir2);
dir1.addChild(file1);
dir2.addChild(file2);

root.display();
