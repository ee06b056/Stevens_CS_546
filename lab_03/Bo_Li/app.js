const fileData = require('./fileData');
const textMetrics = require('./textMetrics');
const fs = require('fs');

async function main() {
    let paths = ['chapter1','chapter2','chapter3'];

    for (let path of paths) {
        let txt_path = path + '.txt';
        let debug_path = path + '.debug.txt';
        let json_path = path + '.result.json';
        if (fs.existsSync(json_path)) {
            try{
                let json = await fileData.getFileAsJSON(json_path);
                console.log('The ' + json_path + ' file already exist: ');
                console.log(json);
            } catch (err) {
                console.log(err)
            }
        } else {
            try{
                let raw_text = await fileData.getFileAsString(txt_path);
                let debug_text = textMetrics.simplify(raw_text);
                fileData.saveStringToFile(debug_path,debug_text);
                let json_text = textMetrics.createMetrics(debug_text);
                fileData.saveJSONToFile(json_path,json_text);
                console.log(json_text);
            } catch (err) {
                console.log(err);
            }
        }
    }
}

main();