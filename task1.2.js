const fs = require("fs");
const path = require('path');
const csvtojsonV2 = require("csvtojson");

function convertToJSON() {
    const readableStream = fs.createReadStream(path.join(__dirname, './sourceData.csv'));
    const writableStream = fs.createWriteStream(path.join(__dirname, './outPut.txt'));

    readableStream
        .pipe(csvtojsonV2().on('error', (err) => console.log(err)))
        .pipe(writableStream);
}

convertToJSON();