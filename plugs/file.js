const fs = require('fs');
const flatten = require('flat');

const FormatHandler = {
    'ndjson': function ndjson(logData, opts) {
        return JSON.stringify(logData);
    }
};

function FilePlug(filePath, options) {
    options = options || {};
    const format = options.format || 'ndjson';

    if(!filePath) {
        throw new Error('path is mandatory for FileAdapter');
    }

    return {
        log: function (logData){
            return new Promise(function (resolve, reject) {
                const wStr = FormatHandler[format](logData) + '\n';
                fs.appendFile(filePath, wStr, { flag: 'a+' }, function (err) {
                    if(err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
        }
    }
}

module.exports = FilePlug;