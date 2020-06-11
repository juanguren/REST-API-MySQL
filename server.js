
const express = require("express");

const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root@localhost:3306/user_project');
module.exports = {sequelize};

const app = express();

app.use("/", require("./src/router"));

app.get("/", (req, res) =>{
    res.status(200).json({msg: "Index. OK"});
});

const PORT = process.env.PORT | 5000;

app.listen(PORT, () =>{
    console.log("Listening...");
});