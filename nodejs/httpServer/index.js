// create own web server
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const data1 = fs.readFileSync(`E:/nodejs/httpServer/userapi/userApi.json`, "utf-8");
    const d = JSON.parse(data1);

    //    console.log(req.url);
    if (req.url == "/") {
        res.end("Hello from the Home Page");
    } else if (req.url == "/about") {
        res.end("Hello from the about Page");
    } else if (req.url == "/contact") {
        res.end("Hello from contact Page");
    } else if (req.url == "/userapi") {
        res.writeHead(200, { "content-type": "application/json"});
        res.end(d[3].fruit); 
    } else {
        res.writeHead(404, { 'content-type': 'text/html' });
        res.end("<h1>404</h1>");
    }
});

server.listen(3000, "127.0.0.1", () => {
    console.log("listning to port number 3000");
});