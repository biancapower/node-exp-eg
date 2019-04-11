const child_process = require('child_process')


//            list reports sorted by time
//                                  replace double spaces with single
//                                                    take field 5
const cmd1 = "ls -lt reports*.log | sed 's/  */ /g' | cut -d ' ' -f 5 | head -n 1";
//                                  find 4 groups of chars followed by spaces (using {4}), and replace line with the next group
const cmd2 = "ls -lt reports*.log | sed 's/\\([^ ]* *\\)\\{4\\}\\([^ ]*\\).*/\\2/' | cut -d ' ' -f 5 | head -n 1";
//                                  find 4 groups of chars followed by spaces (manually), and replace line with the next group
const cmd3 = "ls -lt reports*.log | sed 's/[^ ]* *[^ ]* *[^ ]* *[^ ]* *\\([^ ]*\\).*/\\1/' | cut -d ' ' -f 5 | head -n 1";



module.exports = function () {
    const child = child_process.exec(cmd1,
        (error, stdout, stderr) => {
             /*if (error) { // what could possibly go wrong????
                 console.error(`exec error: ${error}`);
                 return;
             }*/
             console.log(`File size: ${stdout}`);
             //console.log(`stderr: ${stderr}`);
         });
}