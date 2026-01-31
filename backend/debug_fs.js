const fs = require('fs');
const path = require('path');

console.log("Current working directory:", process.cwd());
const uploadDir = 'uploads';

if (fs.existsSync(uploadDir)) {
    console.log(`Directory '${uploadDir}' exists.`);
    const files = fs.readdirSync(uploadDir);
    console.log(`Found ${files.length} files.`);
    console.log("First 5 files:", files.slice(0, 5));
} else {
    console.log(`Directory '${uploadDir}' DOES NOT exist.`);
    console.log("Contents of current dir:", fs.readdirSync('.'));
}
