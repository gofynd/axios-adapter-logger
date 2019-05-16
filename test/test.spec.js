const assert = require('assert');
const fs = require('fs');
const path = require('path');
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

    describe('File', function() {
        this.timeout(5000);

        before(function () {
            this.tmpPath = path.join(__dirname, 'tmp/test.ndjson');
        });

        after(function (done) {
            fs.unlink(this.tmpPath, (err) => {
                if(err) { return done(err); }
                done();
            });
        });

        it('GET Success', function() {
            const axiosInstance = axios.create();
            const options = {
                path: this.tmpPath
            };
            AdapterMiddlware(axiosInstance, [require('../adaptors/file')(options)]);

            return axiosInstance.get(TEST_URLS.VALID_GET_200);
        });

        it('GET system error', function() {
            const axiosInstance = axios.create();
            const options = {
                path: this.tmpPath
            };
            AdapterMiddlware(axiosInstance, [require('../adaptors/file')(options)]);

            return axiosInstance.get(TEST_URLS.INVALID_GET_NO_DOMAIN).catch(e => e);
        });

        it('GET 404', function() {
            const axiosInstance = axios.create();
            const options = {
                path: this.tmpPath
            };
            AdapterMiddlware(axiosInstance, [require('../adaptors/file')(options)]);

            return axiosInstance.get(TEST_URLS.VALID_GET_200).catch(e => e);
        });

    });

    describe('MongoDB', function() {
        this.timeout(5000);

        before(function (done) {
            const _this = this;
            const url = 'mongodb://localhost:27017';
            MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
                if(err) {
                    done(err);
                    return;
                }
                _this.client = client;
                _this.mongoOptions = {
                    'client': _this.client,
                    'database': "test_axios",
                    'collection': 'axios_logs'
                };
                done();
            });
        })

        after(function () {
            return this.client
                .db(this.mongoOptions.database)
                .collection(this.mongoOptions.collection)
                .drop()
                .then(d => {
                    this.client.close();
                    return d;
                });
        });

        it('GET Success', function() {
            const axiosInstance = axios.create();
            AdapterMiddlware(axiosInstance, [require('../adaptors/mongodb')(this.mongoOptions)]);

            return axiosInstance.get(TEST_URLS.VALID_GET_200);
        });

        it('GET system error', function() {
            const axiosInstance = axios.create();
            AdapterMiddlware(axiosInstance, [require('../adaptors/mongodb')(this.mongoOptions)]);

            return axiosInstance.get(TEST_URLS.INVALID_GET_NO_DOMAIN).catch(e => e);
        });

        it('GET 404', function() {
            const axiosInstance = axios.create();
            AdapterMiddlware(axiosInstance, [require('../adaptors/mongodb')(this.mongoOptions)]);

            return axiosInstance.get(TEST_URLS.VALID_GET_200).catch(e => e);
        });

    });

});