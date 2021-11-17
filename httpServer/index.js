// create own web server
const http = require('http');

const server = http.createServer((req, res) =>{
//    console.log(req.url);
if(req.url == "/"){
        res.end("Hello from the Home Page");
}else if(req.url == "/about"){
    res.end("Hello from the about Page");
}else if(req.url == "/contact"){
    res.end("Hello from contact Page");
}else{
    res.writeHead(404, {'content-type': 'text/html'});
    res.end("<h1>404</h1>");
}
});

server.listen(3000, "127.0.0.1",()=>{
    console.log("listning to port number 3000");
});