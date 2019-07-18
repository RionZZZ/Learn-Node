const express = require("express");
const queryString = require("querystring");

const server = express();

//链式操作
server.use('/', (req, res, next) => {
    // req.a = 44;

    let str = "";
    req.on("data", data => {
        str += data;
    });
    req.on("end",()=>{
        req.body = queryString.parse(str);
        next();
    });

});
server.use('/', (req, res) => {
    // console.log(req.a); //44

    console.log(req.body);
});

server.listen(8086);