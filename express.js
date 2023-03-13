import { start, myResponse } from './src/index.js';
import express from "express";

import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(express.json())

app.use(express.urlencoded({extended : false}));

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> console.log(`Server is running on ${PORT}`))


// gettting request from server 
app.get('/get',(req,res)=>{
    res.send("Hello 123")
});

app.get('/sas',(req,res)=>{
    res.send("Hello sas")
});

// sending the post request to server
app.post('/post',async (req,res)=>{
console.log(req.body)
    await start(req.body.domain);
    // try{
        if(myResponse.length == 1){
        res.send({
            "domainName" : "didnt exist"
        })
    // }
    // else{
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
// }
}
// catch(error){
// res.send(error + " dasdasdasda")
// }


});