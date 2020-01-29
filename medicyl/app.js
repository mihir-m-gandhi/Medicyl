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
const add_doctor=require("./controllers/add_doctor");
const profile=require("./controllers/profile");
const upfile=require("./controllers/uploadMultipleFile");

// Contract variables
const acc_abi=require("./contracts/accounts").acc_abi;
const acc_address=require("./contracts/accounts").acc_address;

//Mongo connection
mongoose.connect('mongodb://medicyl:medicyl123@ds123444.mlab.com:23444/medicyl', {useNewUrlParser: true},
function(error){
    if (error){
        console.log("Error in connecting database: ",error);
    }else{
        console.log("Connected to the database");
    }
});







// Start
const app=express();

app.set('view engine','ejs');

app.use(session({
    key:"user_sid",
    secret:"mihirpriyamvishalmihirkrutiali",
    resave:false,
    saveUninitialized: false,
}));

app.use(express.static('./public'));
app.use(bparser.urlencoded({extended:true}));
app.use(bparser.json());

app.get('/',(req,res)=>{
    res.render("index",{message:null});
});

app.listen(3000,()=>{
    console.log("listening to PORT 3000");
});

// Register Apps

signup(app);
dashboards(app);
add_record(app);
add_doctor(app);
profile(app);
upfile(app);