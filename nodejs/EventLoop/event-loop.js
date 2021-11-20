const fs = require('fs');

// setTimeout(() => console.log("Timer 1"), 0);
// setImmediate(() => console.log("Immediate 1 finished"));


    const xyz = fs.readFile("text.txt",(err, d)=>{
        console.log(d.toString());
        // console.log(err);
        if(err) throw err;
      

    });
    
//     setTimeout(() => console.log("Finished in 2"));
//     setTimeout(() => console.log("Finished in 3"), );
//     setImmediate(() => console.log("Finished"));

// console.log("Hello");

