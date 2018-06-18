const bluebird = require('bluebird');
// We use bluebird to make a copy of fs
// that has all its normal methods, and
// {methodName}Async method versions that return
// promises as well; ie, you will have a copy
// of fs with fs.stat(path, callback) and
// fs.statAsync(path), which returns a promise
// thus allowing us to await it.

const fs = bluebird.promisifyAll(require('fs'));
const fs_ori = require('fs');


async function getFileAsString(path) {
    if (typeof(path) != 'string') {
        throw 'You must provide a path';
    }
    return await fs.readFileAsync(path,'utf-8').catch((error)=>{
        throw error;
    });
}

async function getFileAsJSON (path) {
    if (typeof(path) != 'string') {
        throw 'You must provide a path';
    }
    return await fs.readFileAsync(path,'utf-8').then((text)=>{
        try {
            return JSON.parse(text);
        } catch (err) {
            throw err;
        }
    },(err)=> {
        throw err;
    });
}


async function saveStringToFile(path, text) {
    if (typeof(path) != 'string') {
        throw 'You must provide a path';
    }
    if (typeof(text) != 'string') {
        throw 'You must provide the text with string type';
    }
    return await fs.writeFileAsync(path,text,'utf-8').then(()=> {
        return true;
    }, (err) => {
        throw err;
    });
}

async function saveJSONToFile (path, obj) {
    if (typeof(path) != 'string') {
        throw 'You must provide a path';
    }
    if (typeof(obj) != 'object') {
        throw 'You must provide the JSON';
    }
    let text;
    try {
        text = JSON.stringify(obj);
    } catch (err) {
        throw err;
    }
    return await fs.writeFileAsync(path, text, 'utf-8').then(()=>{
        return true;
    },(err)=> {
        throw err;
    });
}

module.exports = {
    getFileAsJSON,
    getFileAsString,
    saveJSONToFile,
    saveStringToFile
};

