require("dotenv").config();



var Document = require("./document_model");
const session=require("express-session");


module.exports=(app)=>{

    app.get("/dashboard",(req,res)=>{

        console.log(req.session.username);

        Document.find({username:req.session.username},function(err,docs){
            console.log(err,docs)
            if (err){
                console.log("Not found in User");
        
            }else{
                console.log("SEARCH RESULTS");
                console.log(docs)

                res.render("dashboard",{docList:docs});                 
            }
        });

        
    });
}