const {sequelize,User} = require('./models')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
// const bcrypt = require('bcrypt')
const passport = require('passport')
const app = express()
app.use(passport.initialize());
require('./passports')(passport);
app.use(express.json())


app.post('/users', async(req,res)=>{
    // const salt = await bcrypt.genSalt();
    // const hashedpass = await bcrypt.hash(req.body.password,salt);
    const {first_name,last_name,email,gender,password} = req.body
    try{
       const user = await User.create({first_name,last_name,email,gender,password})
       return res.json(user)
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
})
app.get('/users',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    try{
        const users = await User.findAll()
        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }

})
// ,passport.authenticate('jwt',{session:false})
app.get('/users/:uuid',async(req,res)=>{
    const uuid = req.params.uuid
    try{
        const user = await User.findOne({
            where :{uuid},  
        })
        return res.json(user)
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
})

app.post('/login',async(req,res)=>{
    // Authentication
    var { count, rows } = await User.findAndCountAll();
    console.log(count)
    console.log(rows)
    // const user = rows.find(user => user.email ===req.body.email)
    const username = req.body.email
    // if(await bcrypt.compare(req.body.password,user.password)){
    const password = req.body.password
    var check = true
    for (var index =0;index<rows.length;index++){
        if((rows[index].email ===username) && rows[index].password ===password){
            const loginID = rows[index].id
            const user = {email : username, password : password , id : loginID}
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.json({accessToken : accessToken})
            check = true
            break;
        }else{
            check = false
        }
    } 
    if(!check){
        res.status(401).send("");
    }

    }
)


app.listen(5000,async()=>{
    console.log("Server Running On Port 5000")
    await sequelize.authenticate();
    // console.log(Users.length);
    console.log("Database Connected")
})
// POST template
// {
//     "first_name" :"Anshul",
//     "last_name" :"Jain",
//     "email" :"anshul@gamil.com",
//     "gender" :"Male",
//     "password":"12345678"
//     }

