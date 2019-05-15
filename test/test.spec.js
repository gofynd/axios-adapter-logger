const assert = require('assert');
const axios = require('axios');

const AdapterMiddlware = require('../index');

describe('Test Adaptors', function() {

    describe('Console', function() {
        this.timeout(5000);

        it('GET Success', function() {
            const url = "https://postman-echo.com/get?foo1=bar1&foo2=bar2";

            const axiosInstance = axios.create();

            AdapterMiddlware(axiosInstance,
                [
                    {
                        log: function (logData) {
                            console.log(JSON.stringify(logData, null, 4))
                        }
                    }
                ]
            );

            return axiosInstance.get(url);
        });

        it('GET Fail', function() {
            const url = "https://postma-echo.com/get?foo1=bar1&foo2=bar2";

            const axiosInstance = axios.create();

            AdapterMiddlware(axiosInstance,
                [
                    {
                        log: function (logData) {
                            console.log(JSON.stringify(logData, null, 4))
                        }
                    }
                ]
            );

            return axiosInstance.get(url);
        });

    });

});