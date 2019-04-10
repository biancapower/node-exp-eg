// setup
const source   = document.getElementById("entry-template").innerHTML;
const template = Handlebars.compile(source);

const context = {
    logs: logList,
};

for (let i = 0; i < logList.length; i++) {
    const datetime = new Date(logList[i].timestamp * 1000).toLocaleString();
    logList[i].datetime = datetime;
}


const bTree = new BST();

function addArrayToBtree(firstIndex, lastIndex) {

    if (lastIndex < firstIndex) {
        return;
    }

    const medianIndex = Math.floor((firstIndex + lastIndex) / 2);

    bTree.insert(logList[medianIndex].timestamp, logList[medianIndex]);

    // add left sub-array to btree
    addArrayToBtree(firstIndex, medianIndex - 1);

    // now add the right sub-array to the tree
    addArrayToBtree(medianIndex + 1, lastIndex);

}


addArrayToBtree(0, logList.length - 1);


function timeRange() {
    const fromDate = new Date();
    let [hours, minutes, seconds] = document.getElementById('fromtime').value.split(':');

    fromDate.setHours(hours, minutes, seconds, 0);
    const fromTimestamp = fromDate.getTime() / 1000;


    const toDate = new Date();
    [hours, minutes, seconds] = document.getElementById('totime').value.split(':');
    toDate.setHours(hours, minutes, seconds, 0);

    const toTimestamp = toDate.getTime() / 1000;
    console.log(toTimestamp);

}


document.getElementById("display").innerHTML = template(context);