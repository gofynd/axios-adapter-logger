const flatten = require('flat');


function MongoDBPlug(client, options) {
    options = options || {};

    if(!client) {
        throw new Error('mongodb client is required');
    }

    return {
        log: function (logData){
            const promise = client.query('INSERT INTO -----');
            return promise;
        }
    };
}

module.exports = MongoDBPlug;