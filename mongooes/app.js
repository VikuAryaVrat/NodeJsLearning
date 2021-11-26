const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => console.log("Connected succesfully")).catch((err) => console.log(err));


const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: [3, "Minimum 3 letter"],
        maxlength: [30, "Max Length is 30"]
    },
    rating: {
        type: Number,
        // validate(value){
        //     if(value < 0){
        //         throw new Error("Rating not in negative");
        //     }
        validate: {
            validator: function (v) {
                return v.length < 0
            },
            message: "Rating not in negative"
            // }
        }
    },
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
            name: "YellowApple",
            rating: -9.5,
            review: "sour"
        })

        const result = await fruit.save();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

creatFun();