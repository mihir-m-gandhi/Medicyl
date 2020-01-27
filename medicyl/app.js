// Add libraries here
const express=require("express");
const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");
const bparser=require("body-parser");
const session=require("express-session");
const mongoStore=require("connect-mongo")(session);
const mongoose=require('mongoose');

// Add routes here
const signup=require("./controllers/signups");
const dashboards=require("./controllers/dashboards");
const add_record=require("./controllers/add_record");

//Mongo connection
mongoose.connect('mongodb://admin:Priyam123@ds123444.mlab.com:23444/medicyl', {useNewUrlParser: true});

// Start
const app=express();



app.set('view engine','ejs');

app.use(express.static('./public'));

app.get('/',(req,res)=>{
    res.render("index",{message:null});
});




app.listen(3000,()=>{
    console.log("listening to PORT 3000");
});



signup(app);
dashboards(app);
add_record(app);