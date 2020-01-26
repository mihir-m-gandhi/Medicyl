require("dotenv").config();

module.exports=(app)=>{

    app.get("/temp",(req,res)=>{
        res.render("temp",{message:null});
    });
}