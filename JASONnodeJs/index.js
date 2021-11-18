
const fs = require('fs');
const About = {
    name : "Vikrant",
    age : 22,
    Deg : "intern"
}
// console.log(About.age);
// convert to jason
// const data = JSON.stringify(About);
// console.log(data);
// convert to js Object file
// const objData = JSON.parse(data);
// console.log(objData);


const dataJason = JSON.stringify(About);
// fs.writeFile("test.json", dataJason,(err) =>{
//     console.log("Done ");
// })
fs.readFile("test.json","utf-8", (err,dataJason1)=>{
    const orgdata =JSON.parse(dataJason1)
    console.log(dataJason1);
    console.log(orgdata);
})