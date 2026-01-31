const http = require('http');

const filename = 'images-1769857352838-191264798.jpg';
const url = `http://localhost:5000/uploads/${filename}`;

console.log(`Fetching ${url}...`);

http.get(url, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Content-Type: ${res.headers['content-type']}`);
    console.log(`Content-Length: ${res.headers['content-length']}`);

    // consume response to free up memory
    res.resume();
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
