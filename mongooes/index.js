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

    const creatFun = async () => {
        try {
        const fruit = new Fruit({
            name: "Grapes",
            rating: 9,
            review: "Great"
        });
        const fruit1 = new Fruit({
            name: "Orange",
            rating: 9,
            review: "Nice"
        });
        const fruit2 = new Fruit({
            name: "lamon",
            rating: 7,
            review: "Citrius"
        });

        const result = await Fruit.insertMany([fruit,fruit1,fruit2]);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

creatFun();