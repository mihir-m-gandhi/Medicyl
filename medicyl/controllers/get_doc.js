const ethCrypto=require('eth-crypto');
const fs=require("fs");
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");
const crypto = require("crypto");
const secret = "KVNwPVFLdv9HHg9MwEgt";

const createIdentity = require("./create_identity");


const acc_abi=require("../contracts/accounts").acc_abi;
const acc_address=require("../contracts/accounts").acc_address;



// const abi=require("../family_tree_details").abi;
// const address=require("../family_tree_details").address;
// const byteCode=require("../family_tree_details").bytecode;
// const createIdentity=require("./create_identity");

require("dotenv").config();


// const mongoose=require('mongoose');


// var userSchema = new mongoose.Schema({
//     username: String,
//     fullname: String,
//     contact: String,
//     dob: String,
//     age: String,
//     gender: String,
//     usertype: String,
//     height: String,
//     weight: String,
//     bloodgroup: String,
//     criticalinfo: String
// })


// var User = mongoose.model("User", userSchema);

var User = require('./user_model.js');

// mongoose.connect('mongodb://localhost/event-db');

module.exports = User;


module.exports=(app)=>{

    app.get("/get_doc",(req,res)=>{
        res.render("get_doc",{message:null});
        
    });


    
    app.post("/get_doc",async (req,res)=>{

        var fullname=req.body.yes;
        console.log(fullname);
        console.log(fullname);
        console.log("efednkjdnkjdnjdnjkjknnsd");

        return res.render("/get_doc",{fullname:"fullname"})

        
    });



}



