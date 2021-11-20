const add = (a,b) =>{
       return a+b;
}

const sub = (a,b) =>{
    return a-b;
}

const mul = (a,b) =>{
    return a*b;
}
// const abc = "Hello How are you";
// this make public add fun to use in next file
// module.exports.add = add;
// module.exports.sub = sub;
// module.exports.mul = mul;
module.exports = {add, sub , mul};