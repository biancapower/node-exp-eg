"use strict";
/*
 * Queue data structure (FIFO - first in first out)
 *
 * public methods:
 *
 *   add(i)    adds item i to the end queue
 *   remove()  removes an item from the front of the queue
 *             and returns it
 *             - if there are no items in the queue,
 *               return undefined
 *   toArray() returns an array of the items starting with the first
 *   length()  returns current list length
 */

class Queue {

    constructor() {
        this.qLength = 0;
        this.first = null;
        this.last = null;
    }

    add(value) {

        this.qLength++;

        // imagine our queue is currently   FIRST -> A -> B -> C -> LAST

        // create a new item; the "old" last item is before this one
        const newItem = {
            //before: LAST,
            before: this.last,
            after: null,
            value: value,
        };


        if (this.last === null) { // if the list is empty, the new item is the first
            this.first = newItem;

        } else { // otherwise the new item occurs after the "old" last item

            // LAST is old last item
            // newItem is new last item
            // LAST.after = something...
            // the real name of LAST is this.last

            this.last.after = newItem;
        }

        // the actual last item is now the new item
        this.last = newItem;
    }

    remove() {
        const firstItem = this.first;

        if (firstItem === null) {
            return undefined;
        }

        // make this.first point to second item

        this.first = firstItem.after;
        if (this.first === null) {
            this.last = null;
        }

        this.qLength--;

        return firstItem.value;
    }

    toArray() {

        const result = [];

        let thisItem = this.first;
        while (thisItem !== null) {
            result.push(thisItem.value);
            thisItem = thisItem.after;
        }
        
        return result;
    }

    length() {
        return this.qLength;
    }
}


module.exports = Queue;

