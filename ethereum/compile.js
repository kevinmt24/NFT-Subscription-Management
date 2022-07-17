const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);    //1. Delete the build folder.

//2. Read 'Campaign.sol from the contracts folder.
const mediumPath = path.resolve(__dirname, 'contracts','medium.sol');
const source = fs.readFileSync(mediumPath, 'utf8');
const output = solc.compile(source,1).contracts;

console.log(output);
fs.ensureDirSync(buildPath); //3. Creating build folder if not exist.


for(let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        output[contract]
    );
}


