const fs = require("fs");
const path = require('path');
const readline = require('readline');

const csvtojsonV2 = require("csvtojson");

function convertToJSON() {
    const readableStream = fs.createReadStream(path.join(__dirname, './sourceData.csv'));
    const writableStream = fs.createWriteStream(path.join(__dirname, './outPut.txt'));
    const convertedStream = readableStream.pipe(csvtojsonV2().on('error', (err) => console.log(err)));
    
    const rl = readline.createInterface({ input: convertedStream, output: writableStream, terminal: false });
    rl.on('line', (line) => {
        writableStream.write(line + '\n');
    });
    rl.on('error', (error) => console.log(error.message));
}

convertToJSON();