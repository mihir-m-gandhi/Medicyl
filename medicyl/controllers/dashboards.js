require("dotenv").config();

module.exports=(app)=>{

    app.get("/dashboard",(req,res)=>{
        res.render("dashboard",{message:null});
    });
}