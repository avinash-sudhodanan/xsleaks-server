const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();
let count = 2;
let status = "Found";
let code = 200

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});


router.get("/status", (req, res) => {
    console.log(count, count%2)
    if(count%2 === 1){
        status = "Not Found";
        code = 400;
    }
    else{
        status = "Found";
        code = 200;
    }
    res.status(code).send(status);
    count+=1;
});

router.get("/csp", (req, res) => {
    if(count%2 === 1){
        location = "/.netlify/functions/api/";
    }
    else{
        location = "https://example.com";
    }
    res.redirect(location);
    count+=1;
});

router.get("/count", (req, res) => {
    if(count%2 === 1){
        location = "/.netlify/functions/api/";
    }
    else{
        location = "https://www.linkedin.com/";
    }
    res.redirect(location);
    count+=1;
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
