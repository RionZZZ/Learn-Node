const express = require("express");
const expressStatic = require("express-static");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const multer = require("multer");

// const jade = require("jade");
// const ejs = require("ejs");
const consolidate = require("consolidate");

const common = require("./common");


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
// server.use("/", (req, res, next) => {
//     console.log(req.query, req.body, req.files, req.cookies, req.session)
//     next();
// });

//配置模板引擎
//呈现
server.set("view engine", "html");
//模板文件位置
server.set("views", "./pages");
//使用模板引擎
server.engine("html", consolidate.ejs);

//接收用户请求
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12333",
    database: "blog"
});
server.get('/', (req, res, next) => {
    // const db = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "12333",
    //     database: "blog"
    // });

    //查询banner
    db.query("SELECT * FROM `banner_table`", (err, data) => {
        if (err) {
            res.status(500).send("banner_db error").end();
        } else {
            // res.render("index.ejs", { banners: data });
            res.banners = data;
            next();
        }
    });

})

server.get('/', (req, res, next) => {
    db.query("SELECT `ID`, `title`, `summary` FROM `article_table`", (err, data) => {
        if (err) {
            res.status(500).send("article_db error").end();
        } else {
            // res.render("index.ejs", { banners: res.banners, articles: data });
            res.articles = data;
            next();
        }
    });
});

server.get('/', (req, res) => {
    res.render("index.ejs", { banners: res.banners, articles: res.articles });
});

server.get('/article', (req, res) => {
    if (req.query.id) {
        if (req.query.act == "like") {
            //增加一个赞
            db.query(`UPDATE article_table SET n_like=n_like+1 WHERE ID=${req.query.id}`, (err, data) => {
                if (err) {
                    res.status(500).send("article_db error").end();
                }
            });
        }
        db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`, (err, data) => {
            if (err) {
                res.status(500).send("article_db error").end();
            } else {
                if (data.length == 0) {
                    res.status(404).send("article not found").end();
                } else {
                    const article = data[0];
                    article.timeout = common.time2Data(article.post_time);
                    article.content = article.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
                    res.status(200).render("conText.ejs", { article: article });
                }
            }
        });
    } else {
        res.status(404).send("article not found").end();
    }
})

//static数据
server.use(expressStatic("./www"));



