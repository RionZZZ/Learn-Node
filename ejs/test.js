const ejs = require("ejs");

ejs.renderFile('./pages/1.ejs', {
    name: "zya",
    json: {
        arr: [
            { user: "aaa", pwd: "111" },
            { user: "bbb", pwd: "222" },
            { user: "ccc", pwd: "333" },
            { user: "ddd", pwd: "444" }
        ]
    },
    type: "admin"
}, (err, data) => {
    if (err) {
        console.log("error");
    } else {
        console.log(data);
    }
});





