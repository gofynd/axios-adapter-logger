const fs = require('fs');
const flatten = require('flat');

const FormatHandler = {
    'ndjson': function ndjson(logData, opts) {
        return JSON.stringify(logData);
    }
};

function FileAdapter(options) {
    options = options || {};
    const pPath = options.path || '';
    const format = options.format || 'ndjson';

    if(!pPath) {
        throw new Error('path is mandatory for FileAdapter');
    }

    return {
        log: function (logData){
            return new Promise(function (resolve, reject) {
                const wStr = FormatHandler[format](logData) + '\n';
                fs.appendFile(pPath, wStr, { flag: 'a+' }, function (err) {
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

module.exports = FileAdapter;