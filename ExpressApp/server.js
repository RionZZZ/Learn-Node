const express = require("express");
const expressStatic = require("express-static");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const multer = require("multer");

// const jade = require("jade");
// const ejs = require("ejs");
const consolidate = require("consolidate");


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
    next();
});

//配置模板引擎
//呈现
server.set("view engine", "html");
//模板文件位置
server.set("views", "./pages");
//使用模板引擎
server.engine("html", consolidate.ejs);

//接收用户请求
server.use('/index', (req, res) => {
    // if (req.session.userId) {
        res.render("1.ejs", {name: "zya"});
    // } else {
        // res.render("login.ejs", {});
    // }
})

//static数据
server.use(expressStatic("./www"));



