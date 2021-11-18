const fs = require('fs');
const http = require('http');

const server = http.createServer();

server.on("request",(req,res) =>{
    // fs.readFile('abc.txt',(err, data) =>{
    //     if(err) 
    //         return console.log(err);
    //         res.end(data.toString());
        
    // });
    // Create a readable stream.
    const rstream = fs.createReadStream("abc.txt");
    // rstream.pipe(res);
    rstream.on("data",(dat)=>{
        res.write(dat);
    });
    rstream.on("end",()=>{
        res.end();
    })
    rstream.on("error",(err)=>{
        res.end("file not found");
    });


});

server.listen(3000, "127.0.0.1", () => {
    console.log("listning to port number 3000");
});
