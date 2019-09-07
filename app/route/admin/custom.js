const express = require("express");
const mysql = require("mysql");
const pathLib = require("path");
const fs = require("fs");

const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12333',
    database: 'expressblog'
});

module.exports = function () {
    const router = express.Router();

    router.get("/", (req, res) => {
        switch (req.query.act) {
            case 'del':
                db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.query.id}`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send("database error").end();
                    } else if (!data.length) {
                        res.status(404).send("data not found").end();
                    } else {
                        fs.unlink("static/upload/" + data[0].src, (error) => {
                            if (error) {
                                console.error(error);
                                res.status(500).send("file operation error").end();
                            } else {
                                db.query(`DELETE FROM custom_evaluation_table WHERE ID=${req.query.id}`, (err, data) => {
                                    if (err) {
                                        console.error(err);
                                        res.status(500).send("database error").end();
                                    } else {
                                        res.redirect("/admin/custom");
                                    }
                                })
                            }
                        });
                    }
                })
                break;
            case 'mod':
                db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.query.id}`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send("database error").end();
                    } else if (!data.length) {
                        res.status(404).send("data not found").end();
                    } else {
                        db.query(`SELECT * FROM custom_evaluation_table`, (err, customs) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send("database error").end();
                            } else {
                                res.render("admin/custom.ejs", { customs, modData: data[0] });
                            }
                        })
                    }
                })
                break;
            default:
                db.query(`SELECT * FROM custom_evaluation_table`, (err, customs) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send("database error").end();
                    } else {
                        res.render("admin/custom.ejs", { customs });
                    }
                })
                break;
        }
    })

    router.post('/', (req, res) => {
        const title = req.body.title;
        const description = req.body.description;

        console.log(req.files);
        let oldPath, ext, newPath, newFileName;
        if (req.files[0]) {
            oldPath = req.files[0].path;
            ext = pathLib.parse(req.files[0].originalname).ext;
            newPath = oldPath + ext;
            newFileName = req.files[0].filename + ext;
        } else {
            newFileName = "";
        }

        if (newFileName) {
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("file opration error").end();
                } else {
                    if (req.body.id) {
                        //先删除
                        db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.body.id}`, (err, data) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send("database error").end();
                            } else if (!data.length) {
                                res.status(404).send("data not found").end();
                            } else {
                                fs.unlink("static/upload/" + data[0].src, (error) => {
                                    if (error) {
                                        console.error(error);
                                        res.status(500).send("file operation error").end();
                                    } else {
                                        db.query(`UPDATE custom_evaluation_table SET title='${title}', description='${description}', src='${newFileName}' WHERE ID=${req.body.id}`, (err, data) => {
                                            if (err) {
                                                console.error(err);
                                                res.status(500).send("database error").end();
                                            } else {
                                                res.redirect('/admin/custom');
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    } else {
                        db.query(`INSERT INTO custom_evaluation_table (title, description, src) VALUE ('${title}', '${description}', '${newFileName}')`, (err, data) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send("database error").end();
                            } else {
                                res.redirect('/admin/custom');
                            }
                        });
                    }
                }
            });
        } else {
            if (req.body.id) {
                db.query(`UPDATE custom_evaluation_table SET title='${title}', description='${description}' WHERE ID=${req.body.id}`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send("database error").end();
                    } else {
                        res.redirect('/admin/custom');
                    }
                });
            } else {
                db.query(`INSERT INTO custom_evaluation_table (title, description, src) VALUE ('${title}', '${description}', '${newFileName}')`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send("database error").end();
                    } else {
                        res.redirect('/admin/custom');
                    }
                });
            }
        }


    });

    return router;
}











