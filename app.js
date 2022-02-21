
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const docxGenerator = require('./modules/docxGenerator.js')

const fs = require("fs")
const path = require("path")

const urlencodedParser = express.urlencoded({extended: false});
  
app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});
app.post("/", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});

app.post("/generate",urlencodedParser,(req,res)=>{
    if(!req.body) return res.sendStatus(400)

    //res.send(`${req.body.userName} - ${req.body.userAge}`);
    let result = docxGenerator.docxtemplater(req)
    res.download(path.join(result),(err)=>{console.log(err)})

})


app.listen(port,function(){
    console.log(`running on ${port}`);
});

