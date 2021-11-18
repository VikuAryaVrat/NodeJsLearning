const path = require('path');
console.log(path.dirname('E:/nodejs/pathModule/index.js'));
console.log(path.extname('E:/nodejs/pathModule/index.js'));
console.log(path.basename('E:/nodejs/pathModule/index.js'));
console.log(path.parse('E:/nodejs/pathModule/index.js'));
const xyz = path.parse('E:/nodejs/pathModule/index.js');
console.log(xyz.name);
console.log(xyz.root);