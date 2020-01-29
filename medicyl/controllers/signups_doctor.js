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


var mongoose = require('mongoose');
var Doctor = require('./doctor_model.js');


module.exports = Doctor;



module.exports=(app)=>{

    app.get("/signup_doctor",(req,res)=>{
        res.render("signup_doctor",{message:null});
        
    });


    
    app.post("/signup_doctor",(req,res)=>{

        var full_name=req.body.full_name;
        var username=req.body.uname;
        var gender=req.body.gender;
        var pass=req.body.password;
        var cnf_pass=req.body.cnf_password;
        var contact=req.body.contact;
        var u_type=req.body.u_type;
        var specialization =req.body.specialization;
        var exp =req.body.exp;
        var hospital =req.body.hospital;

        var identity = createIdentity();
        console.log(identity);

        var patientlist=[];
        
        const myData = {
            username,full_name,contact,gender,u_type,specialization,exp,hospital,patientlist
        }
        
        var data = Doctor(myData);

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



