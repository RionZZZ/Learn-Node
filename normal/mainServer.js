const http = require("http");
const query = require("querystring");
const urlLib = require("url");
const fs = require("fs");

http.createServer((req, res) => {
    //GET
    let obj = urlLib.parse(req.url, true);
    let url = obj.pathname;
    const GET = obj.query;

    //POST
    let str = "";
    req.on("data", data => {
        str += data;
    })
    req.on("end", () => {
        const POST = query.parse(str);
    })


    //文件
    let fileName = `./www${url}`;
    fs.readFile(fileName,(err, data) => {
        if (err) {
            res.write("404");
        } else {
            res.write(data);
        }

        res.end();
    })

}).listen(8086);