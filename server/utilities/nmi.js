"use strict";
exports.__esModule = true;
var xml2Json_1 = require("./xml2Json");
var https = require('https');
var querystring = require('querystring');
var security_key = 'Hry4tTg222YJPu92E742557459Ps9Dew';
var hostName = 'secure.nmi.com';
var path = '/api/query.php';
var actionType = 'sale';
var postData = querystring.stringify({
    'security_key': security_key,
    'action_type': actionType
});
var options = {
    hostname: hostName,
    path: path,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};
var req = https.request(options, function (response) {
    console.log("STATUS: " + response.statusCode);
    console.log("HEADERS: " + JSON.stringify(response.headers));
    response.on('data', function (chunk) { console.log("BODY: " + xml2Json_1.xmlToJson(chunk)); });
    response.on('end', function () {
        console.log('No more data in response.');
    });
});
req.on('error', function (e) { console.error("Problem with request: " + e.message); });
req.write(postData);
req.end();
