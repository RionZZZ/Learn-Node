const express = require("express");
const common = require("../../libs/common");
const mysql = require("mysql");

const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12333',
    database: 'expressblog'
});


module.exports = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.render("admin/login.ejs");
    })
    router.post('/', (req, res) => {
        const user = req.body.user;
        const pwd = common.md5(req.body.pwd + common.MD5_SUFFIX);

        db.query(`SELECT * FROM admin_table WHERE username='${user}'`, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send("database error").end();
            } else {
                if (!data.length) {
                    res.status(400).send("no this admin").end();
                } else {
                    if (data[0].password == pwd) {
                        req.session["admin_id"] = data[0].ID;
                        res.redirect('/admin');
                    } else {
                        res.status(404).send("this password is incorrect").end();
                    }
                }
            }
        })
    })


    return router;
}
