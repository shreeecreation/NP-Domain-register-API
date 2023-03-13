import { start, myResponse } from './index.js';


import express from "express";
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : false}));

const PORT = process.env.port || 3000;
app.listen(PORT,()=> console.log(`Server is running on ${PORT}`))

app.get('/get',(req,res)=>{
    res.send("Hello 123")
});

app.get('/sas',(req,res)=>{
    res.send("Hello sas")
});


app.post('/post',async (req,res)=>{
    console.log(JSON.stringify(req.body, null, 2));
    console.log(req.body.domain)
    await start(req.body.domain);
    console.log(myResponse);
    
    if(myResponse.length == 1){
        res.send({
            "domainName" : "didnt exist"
        })
    }
    res.send({
        "domainName" : myResponse[0],
        "firstRegister" : myResponse[1],
        "lastUpdated" : myResponse[2],
        "primaryServer" : myResponse[3],
        "secondaryServer" : myResponse[4],
        "email" : myResponse[5],
        "personName" : myResponse[6],
        "address" : myResponse[7],
    })
});