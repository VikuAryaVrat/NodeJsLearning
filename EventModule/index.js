const EventEmitter = require('events');
const event = new EventEmitter();

event.addListener('hello',() =>{
    console.log("Hello i am vikrant ");
})
event.addListener('hello',() =>{
    console.log("Hello i am Manish ");
})
event.addListener('hello',() =>{
    console.log("Hello i am Anu");
})

event.emit("hello");
