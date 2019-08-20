const express = require("express");
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

        switch (req.query.act) {
            case "mod":
                db.query(`SELECT * FROm banner_table WHERE ID=${req.query.id}`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send("database error").end();
                    } else if (!data.length) {
                        res.status(404).send("data not found").end();
                    } else {
                        db.query(`SELECT * FROM banner_table`, (err, banner) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send("database error").end();
                            } else {
                                res.render("admin/banner.ejs", { banner, modData: data[0] });
                            }
                        })
                    }
                })
                break;
            case "del":
                db.query(`DELETE FROM banner_table WHERE ID=${req.query.id}`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send("database error").end();
                    } else {
                        res.redirect('/admin/banner');
                    }
                })
                break;
            default:
                db.query(`SELECT * FROM banner_table`, (err, banner) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send("database error").end();
                    } else {
                        res.render("admin/banner.ejs", { banner });
                    }
                })
                break;
        }
    });
    router.post('/', (req, res) => {
        const title = req.body.title;
        const description = req.body.description;
        const href = req.body.href;
        if (!title || !description || !href) {
            res.status(400).send("arg error").end();
        } else {
            if (req.body.id) {
                db.query(`UPDATE banner_table SET title='${title}', description='${description}', href='${href}' WHERE ID=${req.body.id}`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send("database error").end();
                    } else {
                        res.redirect('/admin/banner');
                    }
                });
            } else {
                db.query(`INSERT INTO banner_table (title, description, href) VALUE ('${title}', '${description}', '${href}')`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send("database error").end();
                    } else {
                        res.redirect('/admin/banner');
                    }
                });
            }
        }
    });


    return router;

}







