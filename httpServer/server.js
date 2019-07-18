const http = require("http");
const query = require("querystring");
const urlLib = require("url");
const fs = require("fs");


let users = {}; //{"a": "111", "b": "222"}
http.createServer((req, res) => {

    //解析数据
    let str = "";
    req.on("data", data => {
        str += data;
    })
    req.on("end", () => {

        let obj = urlLib.parse(req.url, true);
        const url = obj.pathname;
        const GET = obj.query;
        const POST = query.parse(str);


        //区分文件和接口
        if (url == '/user') {

            switch (GET.act) {
                case "reg":
                    if (users[GET.user]) {
                        res.write('{"ok": false, "msg": "此用户已存在"}');
                    } else {
                        users[GET.user] = GET.pwd;
                        res.write('{"ok": true, "msg": "注册成功!"}');
                    }
                    break;
                case "login":
                    if (!users[GET.user]) {
                        res.write('{"ok": false, "msg": "此用户不存在"}');
                    } else if (users[GET.user] != GET.pwd) {
                        res.write('{"ok": false, "msg": "用户名或密码错误"}');
                    } else {
                        res.write('{"ok": true, "msg": "登录成功!"}');
                    }
                    break;
                default:
                    res.write('{"ok": false, "msg": "未知的act"}');
            }
            res.end();
        } else {

            //读取文件
            let fileName = `./www${url}`;
            console.log(fileName)
            fs.readFile(fileName, (err, data) => {
                if (err) {
                    res.write("404");
                } else {
                    res.write(data);
                }

                res.end();
            })
        }


    })


}).listen(8086);