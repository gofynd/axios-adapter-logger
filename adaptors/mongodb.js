function MongoDBAdapter(argument) {
    return {
        log: function (logData){
             console.log(JSON.stringify(logData, null, 4));
        }
    };
}

module.exports = MongoDBAdapter;