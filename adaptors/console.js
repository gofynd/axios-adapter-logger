function ConsoleAdapter(argument) {
    return {
        log: function (logData){
             console.log(JSON.stringify(logData));
        }
    };
}

module.exports = ConsoleAdapter;