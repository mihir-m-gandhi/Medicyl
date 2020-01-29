require("dotenv").config();

var express=require('express');


module.exports=(app)=>{

    app.get("/pdf2",(req,res)=>{
        res.render("pdf2",{message:null});
    });
}