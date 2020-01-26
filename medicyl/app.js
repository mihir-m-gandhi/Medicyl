const express=require("express");


const app=express();

const signup=require("./controllers/signups");

app.set('view engine','ejs');

app.use(express.static('./public'));

app.get('/',(req,res)=>{
    res.render("index",{message:null});
});


app.listen(3000,()=>{
    console.log("listening to PORT 3000");
});



signup(app);
