const express = require("express");
const expressStatic = require("express-static");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const consolidate = require("consolidate");
const expressRoute = require("express-route");
const bodyParser = require("body-parser");
const multer = require("multer");


const server = express();
server.listen(8086);

//获取请求数据
const multerObj = multer({ dest: "./static/upload" });
server.use(multerObj.any());

server.use(bodyParser.urlencoded());

//cookie session
server.use(cookieParser());
(() => {
    let keys = [];
    for (let i = 0; i < 100000; i++) {
        keys.push("keys_" + Math.random());
    }
    server.use(cookieSession({
        name: "sess_id",
        keys,
        maxAge: 20 * 60 * 1000
    }));
})();


//template
server.engine("html", consolidate.ejs);
server.set("views", "./template");
server.set("view engine", "html");

//route
server.use('/', require('./route/web')());
server.use('/admin', require('./route/admin/index')());



//static
server.use(expressStatic("./static"));

