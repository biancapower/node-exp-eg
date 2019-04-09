const express = require('express');
const bodyParser = require('body-parser');
// simplifies file paths
    // core module, so doesn't need to be npm installed
const path = require('path');

const app = express();

const Queue = require('./queue');

 // process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

/* BODY PARSER MIDDLEWARE */
// handle parsing json content
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/csp-report'}));
// handle parsing urlencoded content [extended explained here: https://www.npmjs.com/package/body-parser#extended]
app.use(bodyParser.urlencoded({extended: false}));

/* STATIC FOLDER MIDDLEWARE */
// set static path
    // `__dirname` is the directory in which the currently executing script resides
        // using this with path.join is safer than the option that doesn't
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data.js', (req, res) => {
    const object = [{id:1}, {id: 5}];

    res.send(`var logList = ${JSON.stringify(object)};`);
});


let unique = 1;

function createLog(report) {
    let id = unique;
    unique++;

    const violatedDirective = report["violated-directive"];

    //id, date, severity

    let severity = 'unknown';
    if (violatedDirective == 'style-src') {
        severity = "moderate";
    } else if (violatedDirective == 'script-src') {
        severity = "high";
    }

    const newLog = {
        id:         id,
        severity:   severity,
        reportType: violatedDirective,
        timestamp:  Math.floor(new Date().getTime() / 1000)
    };

    return newLog;

}

// A cache storing the most recent 1000 events
const logCache = new Queue();

// adds a log object to the queue, oldest logs are removed and saved to file
// after queue size exceeds 1000
function queueLog(log) {

    logCache.add(log);
    while (logCache.length() > 1000) {
        const oldestLog = logCache.remove();
        console.error('Saving old logs to a file not implemented yet!!');
    }

}

// route
// handles post requests to any url
app.post('/*', (req, res) => {

    // this is sent by the browser formatted as a standard CSP report
    // see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP#Violation_report_syntax
    // you can also violate CSP in your browser and watch the network dev tools

    // OR ... console.log(req.body);

    const report = req.body["csp-report"];

    const log = createLog(report);

    queueLog(log);


    res.end();
});

