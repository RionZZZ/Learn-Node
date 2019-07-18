const express = require("express");
const expressStatic = require("express-static");

const bodyParser = require("body-parser");

const server = express();

// server.use('/aaaa.html', (req, res) => {
//     res.send("11111");
//     res.end();
// });

// server.get('/', () => {
//     console.log("GET");
// })

// server.post('/', () => {
//     console.log("POST");
// })

// //用户数据
// let users = {
//     "z": "111",
//     "y": "222",
//     "a": "333"
// }


// /*
// 接口

// /login?user=xx&pwd=xxx
// =>{ok:true/false, msg:"..."} 

// */
// server.get('/login', (req, res) => {
//     console.log(req.query);
//     let user = req.query['user'];
//     let pwd = req.query['pwd'];

//     if (!users[user]){
//         res.send({ok: false, msg: "用户不存在"});
//     } else {
//         if (users[user] != pwd) {
//             res.send({ok: false, msg: "密码错误"});
//         } else {
//             res.send({ok: true, msg: "登录成功"});
//         }
//     }
// });

//post需要中间件 - body-parser
// server.use(bodyParser.urlencoded({
//     extended: true,  //扩展模式
//     limit: 2*1024*1024     //限制(2M)
// }));
// server.use('/', (req, res) => {
//     console.log(req.body);
// });

//链式操作
server.use('/', (req, res, next) => {
    console.log('A');
    next();
});
server.use('/', (req, res) => {
    console.log('B');
});

server.use(expressStatic("./www"));

server.listen(8086);