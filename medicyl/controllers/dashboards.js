require("dotenv").config();

const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
var Document = require("./document_model");
const session=require("express-session");

const right_abi=require("../contracts/rights").right_abi;
const right_address=require("../contracts/rights").right_address;



module.exports=(app)=>{

    app.get("/dashboard",(req,res)=>{

        console.log("Username",req.session.username);

        Document.find({username:req.session.username},function(err,docs){
            console.log(err,docs)
            if (err){
                console.log("Not found in Document");
        
            }else{
                console.log("SEARCH Document RESULTS");
                console.log(docs)
                
                res.render("dashboard",{DocList:docs});                 
            }
        });

       
        
    });
<<<<<<< HEAD


    app.post("/dashboard",async (req,res)=>{
        var docname=req.body.docname;

             // Web3 provider setup
            const provider = new HDwalletprovider(
                process.env.PRIVATE_KEY,
                process.env.ROPSTEN_INFURA
            );
            
            const web3=new Web3(provider);

            if (web3.currentProvider !== 'undefined'){
                console.log("Provider is set");
            }
            
            const contract=new web3.eth.Contract(right_abi,right_address);

            
            var ipfshash = "";
            var right = "";
            var policy_count= await contract.methods.getUserPolicyCount(req.session.username).call();
            console.log(policy_count);

            for(var i=policy_count-1;i >= 0;i--){
                const policy= await contract.methods.policy(req.session.username,i).call();
                console.log(policy);
                console.log(policy.docname);
                if(policy.docname.match(docname)){
                    ipfshash = policy.doc;
                    right = policy.rights;
                    console.log(ipfshash,right);
                    break;
                }
            }

        return res.render("pdf2",{message:[docname,ipfshash,right]});

    })



=======
    
>>>>>>> 207d3016953773896387598f1215d93152bf9766
}