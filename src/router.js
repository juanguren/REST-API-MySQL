
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
        console.log(users);
    }).catch((err) =>{
        console.log(err);
    })
})

router.post("/new_user", generateID, (req, res) =>{
    let ID = req.params.userID;
    sequelize.query('insert INTO users VALUES(:id, :firstName, :lastName, :email, :phone)',{
        replacements: {
            id: ID,
            firstName: "Juan Felipe",
            lastName: "Aranguren",
            email: "juan_fe_7@live.com",
            phone: 555316
        }
    }).then((response) =>{
        res.status(201).json(response);
    })
})

module.exports = router;