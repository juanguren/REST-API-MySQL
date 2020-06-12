
const express = require("express");
const body_parser = require("body-parser");
const router = express.Router();
const {sequelize} = require("../server");

router.use(body_parser.json());

let ID = 1;
function generateID(req, res, next){
    ID++;
    req.params.userID = ID;
    next();
}

router.get("/index", (req, res) =>{
    res.json({msg: "WORKING!!!"});
});

router.get("/users", (req, res) =>{
    sequelize.query('SELECT * FROM users',{
        type: sequelize.QueryTypes.SELECT
    }).then((users) =>{
        res.status(200).json(users)
    }).catch((err) =>{
        console.log(err);
    })
})

router.post("/new_user", generateID, (req, res) =>{
    const {firstName, lastName, email, phone} = req.body;
    let ID = req.params.userID;
    sequelize.query('insert INTO users VALUES(:id, :firstName, :lastName, :email, :phone)',{
        replacements: {
            id: ID,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
        }
    }).then((response) =>{
        res.status(201).json(response);
    }).catch((error) =>{
        res.status(404).json({msg: error});
    })
})

module.exports = router;