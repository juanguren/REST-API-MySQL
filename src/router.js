
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

function validateUserExists(req, res, next){
    const ID = parseInt(req.params.id);
    
    sequelize.query('SELECT * FROM users WHERE id = :id', {
        type: sequelize.QueryTypes.SELECT,
        replacements:{id: ID}
    }).then((response) =>{
        if (response == "") {
            res.status(404).json({err: "User not found"});
        } else{
            next();
        }
    }).catch(err => console.log(err))
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
});

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
});

router.put("/user_modify/:id", validateUserExists, (req, res) =>{
    let userID = req.params.id;
    const {email} = req.body;

    sequelize.query('UPDATE users SET email = :new_email WHERE id = :id',{
        replacements: {
            new_email: email,
            id: userID
        }
    }).then((response) =>{
        res.status(202).json({msg: response});
    }).catch(err => console.log(err));
});

router.delete("/user/delete/:id", validateUserExists, (req, res) =>{
    const ID = req.params.id;
    sequelize.query('DELETE FROM users WHERE id = :id', {
        replacements: {id: ID}
    }).then(response => res.status(200).json(response))
        .catch(err => res.json({err: err}));
});

module.exports = router;