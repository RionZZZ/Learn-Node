const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const server = express();
// server.use(bodyParser.urlencoded({ extended: false }));//无法解析文件上传

const multerObj = multer({ dest: './upload' });
server.use(multerObj.single("f")); //multerObj.any() --- req.files

server.post("/", (req, res) => {
    // console.log(req.body);
    console.log(req.file);

    //获取原文件扩展名
    const ext = path.parse(req.file.originalname).ext;
    //修改文件名
    fs.rename(req.file.path, req.file.path + ext, err => {
        if (err) {
            console.log("error");
        } else {
            console.log("success");
        }
    });
});

server.listen(8086);
