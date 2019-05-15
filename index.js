function defaultResponseReducer(response) {
    const request = response.request;
    const log = {
        timestamp: new Date().getTime(),
        request: {
            method: request.method,
            path: request.path,
            headers: response.config.headers || {},
        },
        response: {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers || {},
            data: response.data
        }
    };

    return log;
}

function logIt(response, adaptors, options) {
    const pArr = adaptors.map(adaptor => {
        const responseReducer = adaptor.responseReducer || defaultResponseReducer;
        const logJson = responseReducer(response);
        return Promise.resolve(adaptor.log(logJson))
    });
    return Promise.all(pArr).then(o => response);
}

function AdapterMiddlware(axiosInst, adaptors, options) {
    options = options || {};
    adaptors = adaptors || [];

    axiosInst.interceptors.response
        .use(function (response) {
            return logIt(response, adaptors, options).then(o => response);
        }, function (error) {
            return Promise.reject(error);
        });
}

module.exports = AdapterMiddlware;