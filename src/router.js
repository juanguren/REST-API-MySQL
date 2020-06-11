
const express = require("express");
const body_parser = require("body-parser");
const router = express.Router();
const {sequelize} = require("../server");

router.use(body_parser.json());

router.get("/index", (req, res) =>{
    res.json({msg: "WORKING!!!"});
});

router.get("/users", (req, res) =>{
    sequelize.query('SELECT * FROM users',{
        type: sequelize.QueryTypes.SELECT
    }).then((users) =>{
        console.log(users);
    }).catch((err) =>{
        console.log(err);
    })
})

router.post("/new_user", (req, res) =>{
    
})

module.exports = router;