const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected succesfully")).catch((err) => console.log(err));


const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: Number,
    review: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Fruit = mongoose.model("Fruit", fruitSchema);

    const ReadFun = async () => {
        try { 
        const result = await Fruit.find({name : "Apple"});
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

ReadFun();