const express = require("express");
const expressStatic = require("express-static");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const jade = require("jade");
const ejs = require("ejs");
const multer = require("multer");


const server = express();

server.listen(8086);

//解析cookie
const key = "wsidugfvhjkwebfiwefliuh";
server.use(cookieParser(key));

//使用session
let keys = [];
for (let i = 0; i < 100000; i++) {
    keys.push("keys_" + Math.random());
}
server.use(cookieSession({
    name: "sessin_id",
    keys: keys,
    maxAge: 20 * 3600 * 1000
}));

//post数据
server.use(bodyParser.urlencoded({ extended: false }));
server.use(multer({ dest: "./www/upload" }).any());

//用户请求
server.use("/", (req, res, next) => {
    console.log(req.query, req.body, req.files, req.cookies, req.session)
});

//static数据
server.use(expressStatic("./www"));



