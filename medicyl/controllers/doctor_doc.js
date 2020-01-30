require("dotenv").config();

var express=require('express');


module.exports=(app)=>{

    app.get("/doctor_doc",(req,res)=>{
        res.render("doctor_doc",{message:null});
    });
}

