const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'images/');
//passsing directoryPath and callback function
var jsonstr = fs.readFileSync('archive.json');
var obj = JSON.parse(jsonstr);
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        console.log(file);
        obj['meme'].push({"title":file,"path":file});
    });
    jsonstr = JSON.stringify(obj);
fs.writeFileSync('archive.json',jsonstr)
});


//obj['meme'].push({"title":"tallu le bg","path":"tallu.png"});

//console.log(jsonstr)