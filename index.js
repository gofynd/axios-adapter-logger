function defaultResponseReducer(response) {
    const request = response.request;
    const log = {
        timestamp: new Date().getTime(),
        request: {
            method: request.method,
            path: request.path,
            headers: response.config.headers || {},
        },
        status: 'success',
        response: {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers || {},
            data: response.data
        }
    };

    return log;
}

function defaultErrorReducer(error) {
    const response = error.response || {};
    const request = response.request || {};

    const log = {
        timestamp: new Date().getTime(),
        
        request: {
            method: request.method,
            path: request.path,
            url: error.config.url || {},
            headers: error.config.headers || {},
        },
        status: 'failed',
        response: {
            errorcode: error.code,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers || {},
            data: response.data
        }
    };
    return log;
}

function logSuccess(response, adaptors, options) {
    const pArr = adaptors.map(adaptor => {
        const responseReducer = adaptor.responseReducer || defaultResponseReducer;
        const logJson = responseReducer(response);
        return Promise.resolve(adaptor.log(logJson))
    });
    return Promise.all(pArr);
}

function logError(error, adaptors, options) {
    const pArr = adaptors.map(adaptor => {
        const responseReducer = adaptor.responseReducer || defaultResponseReducer;
        const logJson = defaultErrorReducer(error);
        return Promise.resolve(adaptor.log(logJson))
    });
    return Promise.all(pArr);
}

function AxiosdapterMiddlware(axiosInst, adaptors, options) {
    options = options || {};
    adaptors = adaptors || [];

    axiosInst.interceptors.response
        .use(function (response) {
            return logSuccess(response, adaptors, options).then(o => response);
        }, function (error) {
            return logError(error, adaptors, options).then(o => Promise.reject(error));
        });
}

AxiosdapterMiddlware.defaultResponseReducer = defaultResponseReducer;
module.exports = AxiosdapterMiddlware;

