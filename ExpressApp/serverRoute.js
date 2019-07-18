const express = require("express");

const server = express();

const userRoute = express.Router();
userRoute.get("/1.html", (req, res) => { // http://www.xx.com/user/1.html
    res.send("user1");
});
userRoute.get("/2.html", (req, res) => {
    res.send("user2");
});

server.use("/user", userRoute);

server.listen(8086);