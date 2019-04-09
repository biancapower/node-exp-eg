import { blockStatement } from "@babel/types";

// setup
const source   = document.getElementById("entry-template").innerHTML;
const template = Handlebars.compile(source);

const context = {
    logs: logList,
};


const bTree = new BST();

function addToBtree(array, first, last) {
    const medianIndex = Math.floor((first + last) / 2);

    bTree.insert(array[medianIndex].timestamp, array[medianIndex]);

    
}

addToBtree(logList, 0, logList.length - 1);


document.getElementById("display").innerHTML += template(context);