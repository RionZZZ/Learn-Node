const mysql = require("mysql");


//1.连接
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12333",
    database: "20190719"
});
// console.log(db);

//2.查询
db.query("SELECT * FROM `user_table`;", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

//INSERT
// INSERT INTO `user_table` (`ID`, `userName`, `password`) VALUES (0, "ooo", "112233");
//DELETE
//UPDATE
//SELECT
// SELECT `id` FROM `user_table` 
