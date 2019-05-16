function ConsolePlug() {
    return {
        log: function (logData){
             console.log(JSON.stringify(logData));
        }
    };
}

module.exports = ConsolePlug;