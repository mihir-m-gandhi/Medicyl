const ethCrypto=require('eth-crypto');
const fs=require("fs");
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");

const createIdentity = require("./create_identity");




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

var mongoose = require('mongoose');
var User = require('./user_model.js');

// mongoose.connect('mongodb://localhost/event-db');

module.exports = User;


module.exports=(app)=>{

    app.get("/signup",(req,res)=>{
        res.render("signup",{message:null});
        
    });


    
    app.post("/signup",(req,res)=>{

        var full_name=req.body.full_name;
        var username=req.body.uname;
        var dob=req.body.dob;
        var gender=req.body.gender;
        var pass=req.body.password;
        var cnf_pass=req.body.cnf_password;
        var contact=req.body.contact;
        var u_type="patient";
        

        var today = new Date();

        var birthDate = new Date(dob);

        var age = today.getFullYear() - birthDate.getFullYear();
        console.log(age);

        var identity = createIdentity();
        console.log(identity);

        var height="";
        var weight="";
        var bloodgroup="";
        var criticalinfo="";
        var doctorlist=[];
        
        const myData = {
            username,full_name,contact,dob,age,gender,u_type,height,weight,bloodgroup,criticalinfo, doctorlist
        }
        
        var data = User(myData);

        data.save(function(err){
            if (err){
                console.log("Error in submission");
            }else{
                console.log("Form Submitted Successfully");
                return res.redirect("/dashboard")
            }

        })


        var newPublicKey = identity.publicKey;
        var newCompressed = ethCrypto.publicKey.compress(newPublicKey);
        

        
    });



}



