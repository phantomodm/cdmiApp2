import {xmlToJson} from './xml2Json';

const https = require('https');
const querystring = require('querystring');
const security_key = 'Hry4tTg222YJPu92E742557459Ps9Dew';
const hostName = 'secure.nmi.com';
const path = '/api/query.php';
const actionType = 'sale';

const postData = querystring.stringify({
  'security_key': security_key,
  'action_type': actionType
});

const options = {
  hostname: hostName,
  path,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (response) => {
  console.log(`STATUS: ${response.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
  response.on('data', (chunk) => {console.log(`BODY: ${chunk}`)});
  response.on('end', () => {
    console.log('No more data in response.')
  });
});

req.on('error', (e) => {console.error(`Problem with request: ${e.message}`)})
req.write(postData);
req.end();
