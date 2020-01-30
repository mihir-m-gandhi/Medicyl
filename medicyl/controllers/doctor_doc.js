require("dotenv").config();
// Add libraries here
const express=require("express");
const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");
const bparser=require("body-parser");
const session=require("express-session");
const mongoStore=require("connect-mongo")(session);
const mongoose=require('mongoose');


module.exports=(app)=>{

    app.get("/doctor_doc",(req,res)=>{
    	patientlist=req.session.patientlist;
    	console.log("yes entered");
    	console.log(patientlist);
        res.render("doctor_doc",{patient:patientlist});
    });
}

