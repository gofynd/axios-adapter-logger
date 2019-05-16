# Axios Adaptors Logger
### [IN DEVELOPERMENT PHASE]

[![npm version](https://badge.fury.io/js/axios-adapter-logger.svg)](https://badge.fury.io/js/axios-adapter-logger)
[![Build Status](https://travis-ci.org/gofynd/axios-adapter-logger.svg?branch=master)](https://travis-ci.org/gofynd/axios-adapter-logger)

Axios middleware to log request meta into file, databases or queues. this uses [axios interceptors](https://github.com/axios/axios#interceptors) mechanism to get the request information and then normalize it to simple json and then stores in the specified stores. these stores are called plugs. many of the plugs are provided out-of-box or developers can also create thier own or raise PR to this repo too.

## Features
  - ease of use
  - out-of-box plugs

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/). Node.js 0.10 or higher is required.

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install --save axios-adapter-logger
```

## Available Plugs

Below are out-box-avaible plugs:

* [Console](#console)
* [File](#file)
* [MongoDB](#mongodb)
* [Postgres](#postgres)
* ~~Mongoose [todo]~~

### Console


```js
const axios = require('axios');
const AxiosAdapterLogger = require('axios-adapter-logger');
const axiosInstance = axios.create();
AxiosAdapterLogger(axiosInstance, [
    require('../adaptors/console')()
]);

axiosInstance.get('https://postman-echo.com/get?foo1=bar1&foo2=bar2')
```

### File

```js
const axios = require('axios');
const AxiosAdapterLogger = require('axios-adapter-logger');
const axiosInstance = axios.create();
const filePath = "tmp/request.log";
const options = {
    format: 'ndjson' // possible options: ndjson or csv
};
AxiosAdapterLogger(axiosInstance, [
    require('axios-adapter-logger/adaptors/file')(filePath, options)
]);

axiosInstance.get('https://postman-echo.com/get?foo1=bar1&foo2=bar2')
```

### MongoDB

```js
const MongoClient = require('mongodb').MongoClient;
const axios = require('axios');
const AxiosAdapterLogger = require('axios-adapter-logger');
const axiosInstance = axios.create();

MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    if(err) {
        throw err;
        return;
    }
    console.log('Database connected');

    AxiosAdapterLogger(axiosInstance, [
        require('axios-adapter-logger/adaptors/mongodb')(client, 'test_database', 'test_req_logs_coll')
    ]);

    axiosInstance.get('https://postman-echo.com/get?foo1=bar1&foo2=bar2');

});

```

### Postgres [TODO]


```js
const { Client } = require('pg')
const axios = require('axios');
const AxiosAdapterLogger = require('axios-adapter-logger');
const axiosInstance = axios.create();

const client = new Client();

AxiosAdapterLogger(axiosInstance, [
    require('axios-adapter-logger/adaptors/postgres')(client, 'test-table')
]);

axiosInstance.get('https://postman-echo.com/get?foo1=bar1&foo2=bar2');

```


## Development
Want to contribute? Great!, Just raise a PR.


## Running and testing locally

clone this repo and install npm dependencies, then run following command:

```sh
$ npm test
```

## Todos

 - Add plugs - Memory, Streams, Mongoose, BigQuery, RedShift etc..


## People

Maintainer - [Jigar Dafda](https://github.com/jigardafda)

## License
----

MIT License

Copyright (c) 2019 Fynd

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

