import { start, myResponse } from './src/index.js';
import express from "express";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : false}));

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> console.log(`Server is running on ${PORT}`))


// gettting request from serve 
app.get('/get',(req,res)=>{
    res.send("Hello 123")
});

app.get('/sas',(req,res)=>{
    res.send("Hello sas")
});

// sending the post request to server
app.post('/post',async (req,res)=>{
const domain = req.body.domain;
    try{
        const response  = await start(domain)
        if(response.length == 1){
        res.json({
            "domainName" : "didnt exist"
        })
    }
    else{
    res.json({
        "domainName" : myResponse[0],
        "firstRegister" : myResponse[1],
        "lastUpdated" : myResponse[2],
        "primaryServer" : myResponse[3],
        "secondaryServer" : myResponse[4],
        "email" : myResponse[5],
        "personName" : myResponse[6],
        "address" : myResponse[7],
    })
}
}
catch(error){
res.send(error)
}


});