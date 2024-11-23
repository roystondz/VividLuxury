const express  = require('express')
const router = express.Router();
const ownerModel = require('../models/owner-model');

router.get("/",function(req,res){
    res.send("Hello World from owner");
})

if(process.env.NODE_ENV === "development"){
    router.post("/create",async function(req,res){
        let owners = await ownerModel.find();
        if(owners.length > 0 ){
            return res
            .status(503)
            .send("Owner already exists");
        } 
        let{fullname,email,password} = req.body;
            let newOwner = await ownerModel.create({
                fullname,
                email,
                password
            });
            res.send(newOwner);
        
    })
    
}


module.exports = router;
