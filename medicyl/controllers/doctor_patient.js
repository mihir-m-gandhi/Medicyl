require("dotenv").config();

var express=require('express');


module.exports=(app)=>{

    app.get("/doctor_patient",(req,res)=>{
        res.render("doctor_patient",{message:null});
    });
}

