const express = require('express');
var router = express.Router();
const db = require('../db/database');
const Users = require('../db/model');

router.get('/',(req,res)=>{
    Users.findAll()
    .then( users =>{
        console.log(users);     
    }
    )
    .catch(err=>{
        console.log("Error",err);
        res.send("OK")
    })
})

module.exports = router;