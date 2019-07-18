const express = require("express");
const cookieParser = require("cookie-parser");

const cookieSession = require("cookie-session");

const server = express();

//cookie
server.use(cookieParser("ioiooioi"));
server.use(cookieSession({
    name: "sess",
    keys: ['aaa', 'bbb', 'ccc'],
    maxAge: 2*3600*1000
}));


server.use('/', (req, res) => {
    // 发送cookie
    // res.cookie("user", "zya", {
    //     path: "/aaa",
    //     maxAge: 30*24*3600*1000 //ms
    // });

    // 未签名cookie
    // console.log(req.cookies);


    // cookie签名
    // req.secret = "ioiooioi"; //可省略
    // res.cookie("user","zyaaa", {signed: true});
    // 签名cookie
    // console.log(req.signedCookies);

    // 删除cookie
    // res.clearCookie("user");


    if (!req.session["count"]) {
        req.session["count"] = 1;
    } else {
        req.session["count"]++;
    }

    // 删除session
    // delete req.session["count"];

    console.log(req.session);

    res.send("ok");
});


server.listen(8086);