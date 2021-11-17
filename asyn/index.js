const fs = require('fs');
const data = fs.appendFile('xyz.txt', '.I read in GIT', (err)=>{
    //
    // console.log(err);
    if(err) throw(err)
    console.log("Append success");
    
});
// console.log("hello");
// const data = fs.writeFile()