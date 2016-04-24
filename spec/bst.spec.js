var assert = require('assert');

var BST = require('../bst');

describe('Binary Search Tree', function() {
    var bst;
    before(function() {
	bst = new BST();
    });

    it('should add and get correctly', function() {
	var key = 'f';
	var val = 'f'
	bst.add(key, val);
	assert.equal(bst.get(key), val);
    });

    it('should find the correct floor', function() {
	var g = 'g';
	var k = 'k';
	bst.add(g, g);
	bst.add(k, k);
	assert.equal(bst.floor('i'), 'g');
    });

    it('should find the correct ceiling', function() {
	assert.equal(bst.floor('f'), 'f');
    });

    it('should find the correct rank', function() {
	assert.equal(bst.rank('f'), 1);
	assert.equal(bst.rank('g'), 2);
    });

    it('should find the correct selection', function() {
	assert.equal(bst.select(1), 'g');
	assert.equal(bst.select(2), 'k');
	assert.equal(bst.select(3), null);
    });

    
    it('should delete the min (and only min) and adjust bst size', function() {
	bst.delete_min();
	assert.equal(bst.get('f'), null);
	assert.equal(bst.get('g'), 'g');
	assert.equal(bst.size(), 2);
    });

    it('should delete the max (and only max) and adjust bst size', function() {
	bst.delete_max();
	assert.equal(bst.get('k'), null);
	assert.equal(bst.get('g'), 'g');
	assert.equal(bst.size(), 1);
    });

    it('should delete a key from the bst', function() {
	console.log(bst);
	bst.delete('l');
	console.log(bst);
	assert.equal(bst.get('l'), null);
    });
});
