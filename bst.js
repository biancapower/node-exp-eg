"use strict";
/*
 * Binary search tree data structure
 *
 * public methods:
 *
 *   insert(k, v)  inserts key k with value v if not already there
 *   lookup(k)     returns value associated with key k
 *                 or null if not found
 *   range(k1, k2) returns an array of all values between k1 and k2 ## hash tables cannot do
 *                 returns [] if no results
 *                 (inclusive of k1 and k2)
 *   remove(k)     removes key k and associated value
 */

class BST {

    constructor() {
        this.root = null;
    }

    insert(key, value) {
        const newNode = {
            left: null,
            right: null,
            key: key,
            value: value,
        };

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let parentNode = null;
        let currentNode = this.root;
        //currentNode.key has some sort of key
        while (currentNode != null) {

            parentNode = currentNode;
            if (key < currentNode.key) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        if (key < parentNode.key) {
            parentNode.left = newNode;
        } else {
            parentNode.right = newNode;
        }
    }

    lookup(key) {
        if (this.root === null) {
            return null;
        } else {
            let currentNode = this.root;
            while (currentNode !== null) {
                if (key === currentNode.key) {
                    return currentNode.value;
                } else if (key < currentNode.key) {
                    currentNode = currentNode.left;
                } else {
                    currentNode = currentNode.right;
                }

            }
            return null;
        }
    }

    range(k1, k2) {

        // given a node, return an array of all values
        // of this node and descendants whose keys are between k1 and k2
        // (sorted by key)
        function queryHelper(node, k1, k2) {
            if (node === null) {
                return [];
            }
            const leftList = queryHelper(node.left, k1, k2);
            const rightList = queryHelper(node.right, k1, k2);

            let newArray = leftList;
            if (node.key >= k1 && node.key <= k2) {
                newArray.push(node.value);
            }
            newArray = newArray.concat(rightList);

            return newArray;
        };

        return queryHelper(this.root, k1, k2);

    }

}


module.exports = BST;
