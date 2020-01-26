const express=require("express");


const app=express();

const signup=require("./controllers/signups");
const dashboards=require("./controllers/dashboards");
const add_record=require("./controllers/add_record");

app.set('view engine','ejs');

app.use(express.static('./public'));

app.get('/',(req,res)=>{
    res.render("index",{message:null});
});




app.listen(3000,()=>{
    console.log("listening to PORT 3000");
});



signup(app);
dashboards(app);
add_record(app);