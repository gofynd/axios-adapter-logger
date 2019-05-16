const assert = require('assert');
const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;

const AdapterMiddlware = require('../index');

const TEST_URLS = {
    VALID_GET_200: "https://postman-echo.com/get?foo1=bar1&foo2=bar2",
    INVALID_GET_NO_DOMAIN: "https://domain-doesnt-exist-123.com/get?foo1=bar1&foo2=bar2"
};

describe('Test Adaptors', function() {

    describe('Console', function() {
        this.timeout(5000);

        it('GET Success', function() {
            const axiosInstance = axios.create();
            AdapterMiddlware(axiosInstance, [require('../adaptors/console')()]);

            return axiosInstance.get(TEST_URLS.VALID_GET_200);
        });

        it('GET system error', function() {
            const axiosInstance = axios.create();
            AdapterMiddlware(axiosInstance, [require('../adaptors/console')()]);

            return axiosInstance.get(TEST_URLS.INVALID_GET_NO_DOMAIN).catch(e => e);
        });

        it('GET 404', function() {
            const axiosInstance = axios.create();
            AdapterMiddlware(axiosInstance, [require('../adaptors/console')()]);

            return axiosInstance.get(TEST_URLS.VALID_GET_200).catch(e => e);
        });

    });

    describe('MongoDB', function() {
        this.timeout(5000);

        before(function (done) {
            const dbName = "test_axios";
            const url = 'mongodb://localhost:27017';
            const _this = this;
            MongoClient.connect(url, function(err, client) {
                if(err) {
                    done(err);
                    return;
                }
                console.log("Connected successfully to server");
                const db = client.db(dbName);
                _this.client = client;
                _this.db = db;
                done();
            });
        })

        after(function () {
            this.client.close();
        });

        it('GET Success', function() {
            const axiosInstance = axios.create();
            const options = {};
            AdapterMiddlware(axiosInstance, [require('../adaptors/mongodb')(options)]);

            return axiosInstance.get(TEST_URLS.VALID_GET_200);
        });

        it('GET system error', function() {
            const axiosInstance = axios.create();
            const options = {};
            AdapterMiddlware(axiosInstance, [require('../adaptors/mongodb')(options)]);

            return axiosInstance.get(TEST_URLS.INVALID_GET_NO_DOMAIN).catch(e => e);
        });

        it('GET 404', function() {
            const axiosInstance = axios.create();
            const options = {};
            AdapterMiddlware(axiosInstance, [require('../adaptors/mongodb')(options)]);

            return axiosInstance.get(TEST_URLS.VALID_GET_200).catch(e => e);
        });

    });

});