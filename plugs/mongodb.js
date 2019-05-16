function PostgresPlug(client, options) {
    options = options || {};

    if(!client) {
        throw new Error('mongodb client is required');
    }

    const db = client.db(options.database || 'test');
    const collection = db.collection(options.collection || 'axios_logs');

    return {
        log: function (logData){
            const promise = collection.insertOne(logData);
            return promise;
        }
    };
}

module.exports = PostgresPlug;