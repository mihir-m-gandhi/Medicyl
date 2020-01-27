require("dotenv").config();

var express=require('express');


module.exports=(app)=>{

    app.get("/addrecord",(req,res)=>{
        res.render("add_record",{message:null});
    });
}