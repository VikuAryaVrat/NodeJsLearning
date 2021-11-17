const os = require('os'); 
console.log(os.arch());
// const freeMem = os.freemem()
// console.log(`${freeMem / 1024 / 1024 / 1024}`);
const totalMem = os.totalmem()
console.log(`${totalMem / 1024 / 1024 / 1024}`);
console.log(os.hostname());
console.log(os.homedir());