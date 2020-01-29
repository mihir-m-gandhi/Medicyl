require("dotenv").config();

var express=require('express');


module.exports=(app)=>{

    app.get("/profile",(req,res)=>{
        res.render("profile",{message:null});
    });
}