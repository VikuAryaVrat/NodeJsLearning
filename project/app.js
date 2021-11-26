const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 8000;

const static_path = path.join(__dirname, "./public");
const partials_path = path.join(__dirname, "/views/partials");

app.set('view engine', 'hbs');
hbs.registerPartials(partials_path);

// console.log(static_path);
app.use(express.static(static_path));

app.get("/", (req,res) =>{
    res.render('index');
});
            
app.get("/about", (req,res) =>{
    res.render('about');;
});

app.get("/weather", (req,res) =>{
    res.render('weather')
})


app.get("*", (req,res) =>{
    res.render('404page', {
        errorMsg : "Opps! page not found, Click Here to go back"
    })
});


app.listen(port, () => {
    console.log(`listening to the port no at ${port}`);
})