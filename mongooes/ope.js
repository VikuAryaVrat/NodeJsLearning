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
        // const result = await Fruit.find({rating : {$lt:7}}).select({name:1});
        // UpdateQuery
        // const result = await Fruit.updateOne({_id:"619cda65e061180167c3b403"},{$set:{name:"KelaGang"}});
        // Delete document
        const result = await Fruit.deleteOne({_id:"619cde14e5d25f518915d600"});
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

ReadFun();