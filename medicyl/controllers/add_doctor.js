require("dotenv").config();

var express=require('express');


module.exports=(app)=>{

    app.get("/adddoctor",(req,res)=>{
        res.render("add_doctor",{message:null});
    });
}