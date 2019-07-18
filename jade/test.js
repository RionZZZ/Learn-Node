const jade = require("jade");
const fs = require("fs");

// const str = jade.render("html");
// const str = jade.renderFile("./pages/1.jade", { pretty: true });

// fs.writeFile('./build/result.html', str, (err)=>{
//     if (err) {
//         console.log("err");
//     } else {
//         console.log("success");
//     }
// });

// console.log(str);

// const str = jade.renderFile("./pages/2.jade", {
//     pretty: true,
//     name: "rion",
//     style1: { width: "200px", height: "300px" },
//     class1: ["aaa", "left-item", "active"],
//     arr: ['111', '222', '333'],
//     content: "<h1>标题</h1><p>访问四大金刚范围广黑<script>alert('cnm');</script>喂狗是我二哥是温哥华围观覅武二哥和覅五个号</p>"
// });

const str = jade.renderFile("./pages/3.jade", { pretty: true });
fs.writeFile("./build/main.html", str, err => {
    if (err) {
        console.log("error");
    } else {
        console.log("success");
    }
});

console.log(str);
