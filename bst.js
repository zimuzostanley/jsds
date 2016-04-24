/**
 * Author: <zimuzostanley@gmail.com>
 * Binary Search Tree implementation of a Symbol Table
 * Including ordered operations
*/


/**
 * Node in a BST
 * @constructor
*/
var Node = function(key, value) {
    this.key = key;
    this.value = value;
    
    this.left = null;
    this.right = null;
    this.count = 1;
};

/**
 * Binary Search Tree
 * @constructor
*/
var BST = function() {
    this.root = null;
};

BST.prototype.get = function(key) {
    var node = this.root;
    while(node) {
	if (key < node.key) {
	    node = node.left;
	}
	else if (key > node.key) {
	    node = node.right;
	}
	else {
	    return node.value;
	}
    }
    return null;
}

/**
 * Add/Put element in BST
 * @param{object} key - immutable object (No check for immutability yet)
 * @param{object} value
*/
BST.prototype.add = function(key, value) {
    this.root = this._add(this.root, key, value);
}

/**
 * Add/Put element in subtree rooted at a Node
 * @param{object} node
 * @param{object} key - immutable
 * @param{object} value
*/
BST.prototype._add = function(node, key, value) {
    if (node === null) {
	node = new Node(key, value);
	return node;
    }

    if (key > node.key) {
	node.right = this._add(node.right, key, value);
    }
    else if (key < node.key) {
	node.left = this._add(node.left, key, value);
    }
    else {
	node.value = value;
    }
    node.count = 1 + (node.left ? node.left.count : 0) + (node.right ? node.right.count : 0);
    return node;
};

/**
 * Number of elements in BST
*/
BST.prototype.size = function() {
    return this._size(this.root);
};

/**
 * Number of elements in subtree rooted at a node
 * @param{object} node
*/
BST.prototype._size = function(node) {
    if (node) {
	return  1 + (node.left ? node.left.count : 0) + (node.right ? node.right.count : 0);;
    }
    return 0;
};

/**
 * Greatest element in BST less than or equal to a key
 * @param{object} key
 */
BST.prototype.floor = function(key) {
    return this._floor(this.root, key);
};


/**
 * Greatest element in subtree rooted at a node less than or equal to a key
 * @param{object} node
 * @param{object} key
*/
BST.prototype._floor = function(node, key) {
    if (!node) {
	return null;
    }
    var rk = node.key;
    
    if (key === rk) {
	return node.value;
    }
    else if (key < rk) {
	return this._floor(node.left, key);
    }
    else {
	var t = this._floor(node.right, key);
	if (t) {
	    return t;
	}
	return node.value;
    }
};


/**
 * Smallest element in BST greater than or equal to a key
 * @param{object} key
 */
BST.prototype.ceiling = function(key) {
    return this._ceiling(this.root, key);
};


/**
 * Smallest element in subtree rooted at a node greater than or equal to a key
 * @param{object} node
 * @param{object} key
 */
BST.prototype._ceiling = function(node, key) {
    if (!node) {
	return null;
    }
    var rk = node.key;
    
    if (key === rk) {
	return node.value;
    }
    else if (key > rk) {
	return this._ceiling(node.right, key);
    }
    else {
	var t = this._ceiling(node.left, key);
	if (t) {
	    return t;
	}
	return node.value;
    }
};

/**
 * Find the ordered position of a key in the BST
 * @param{object} key
*/
BST.prototype.rank = function(key) {
    return this._rank(this.root, key);
};

/**
 * Find the ordered position of a key in a subtree rooted at a node
 * @param{object} node
 * @param{object} key
 */
BST.prototype._rank = function(node, key) {
    if (!node) {
	return 0;
    }

    if (key === node.key) {
	return 1 + (node.left ? node.left.count : 0);
    }
    else if (key < node.key) {
	return this._rank(node.left, key);
    }
    else {
	return 1 + (node.left ? node.left.count : 0) + this._rank(node.right, key);
    }
};

/**
 * Find the key greater than n keys in the BST
 * @param{int} index
 */
BST.prototype.select = function(index) {
    return this._select(this.root, index);
};


/**
 * Find the key greater than n keys from the subtree rooted at node
 * @param{object} node
 * @param{int} index
 */
BST.prototype._select = function(node, index) {
    if ((!node.left && index === 0) || (node.left && node.left.count === index)) {
	return node.key;
    }
    else if (node.left && node.left.count > index) {
	return this._select(node.left, index);
    }
    else if (node.right && node.right.count > index - (node.left ? node.left.count : 0) - 1){
	//console.log(node.right);
	//console.log(index);
	return this._select(node.right, index - (node.left ? node.left.count : 0) - 1);
    }
    else {
	return null;
    }
};

/**
 * Deletes the min node in a subtree rooted at node
 * @param{object} key
 */
BST.prototype.delete_min = function() {
    this.root = this._delete_min(this.root);
};


/**
 * Deletes the min node in a subtree rooted at node
 * @param{object} node
 */
BST.prototype._delete_min = function(node) {

    if (node.left === null) {
	return node.right;
    }
    node.left = this._delete_min(node.left);
    node.count = this._size(node.left) + this._size(node.right) + 1;
    return node;
};

/**
 * Deletes the max node in BST
 * @param{object} key
 */
BST.prototype.delete_max = function() {
    this.root = this._delete_max(this.root);
};


/**
 * Deletes the max node in a subtree rooted at node
 * @param{object} node
 */
BST.prototype._delete_max = function(node) {
    if (node.right === null) {
	return node.left;
    }
    node.right = this._delete_max(node.right);
    node.count = this._size(node.left) + this._size(node.right) + 1;
    return node;
};

/**
 * Delete key from BST
 * @param{object}
*/
BST.prototype.delete = function(key) {
    this.root = this._delete(this.root, key);
    if (this.root) {
	this.root.count = this._size(this.root);	
    }
};

/**
 * Delete key from subtree rooted at node
 * @param{object}
 */
BST.prototype._delete = function(node, key) {
    if (!node) {
	return node;
    }
    
    if (node.key > key) {
	node.left = this._delete(node.left, key);
	node = this._size(node);
    }
    else if (node.key < key) {
	node.right = this._delete(node.right, key);
	node = this._size(node);
    }
    else {
	var min = this._find_min(node.right);

	if (!min) {
	    return node.left;
	}
	else {
	    this._delete_min(node.right);
	    return min;
	}	
    }
};

/**
 * Find min in BST
*/
BST.prototype.find_min = function() {
    this._find_min(this.root);
};

/**
 * Find min in subtree rooted at node
*/
BST.prototype._find_min = function(node) {
    var min = node;

    while(min && min.left) {
	min = min.left;
    }
    return min;
};

module.exports = BST;
