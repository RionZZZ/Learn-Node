const http = require("http");
const fs = require("fs");
const query = require("querystring");
const url = require("url");

// const server = http.createServer((req, res) => {
//     // console.log(req.url);
//     // switch (req.url) {
//     //     case "/1.html":
//     //         res.write("111111");
//     //         break;
//     //     case "/2.html":
//     //         res.write("22222");
//     //         break;
//     //     case "/3.html":
//     //         res.write("33333");
//     //         break;
//     //     default:
//     //         res.write("404");
//     //         break;
//     // }
//     // res.write("res");
//     // res.end();

//     const file_name = `./www${req.url}`;
//     fs.readFile(file_name, (err, data) => {
//         if (err) {
//             console.log("async1");
//             res.write("404");
//         } else {
//             res.write(data);
//         }
//         res.end();
//     })
//     console.log("async2");
// });
// server.listen(8086);


http.createServer((req, res) => {
    console.log(req.url);

    // let GET = {};
    // //1.split,for...
    // //...
    // //2.quertstring
    // let arr = req.url.split("?")
    // GET = query.parse(arr[1]);
    // console.log(GET);
    // //3.url
    // GET = url.parse(req.url, true).query;
    // console.log(GET);

    let str = "";
    let i = 0;
    //一段数据到达
    req.on("data", (data)=>{
        console.log(i++);
        str += data;
    });
    //所有数据到达
    req.on("end", ()=>{
        console.log(str);
        var POST = query.parse(str);
        console.log(POST);
    });

    res.write("success");
    res.end();
}).listen(8086);








