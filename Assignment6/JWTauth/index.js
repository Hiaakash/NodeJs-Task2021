require('dotenv').config();
const express =  require('express');
const jwt = require('jsonwebtoken');
const app = express();
const users = require("./data");
const authenticateToken = require('./auth')
app.use(express.json())


app.get('/',(req,res)=>{
    res.send("Welcome to Node Server")
})
app.get('/userinfo',authenticateToken,(req,res)=>{

    res.json(users.filter(inuser => inuser.id===req.user.id))
})

app.post('/login',(req,res)=>{
    // Authentication
    const username = req.body.email
    const password = req.body.password
    var check = true
    for (var index =0;index<users.length;index++){
        if((users[index].email ===username) && users[index].password ===password){
            const loginID = users[index].id
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
        res.status(401).send();
    }
    
    }
)

app.post('/api/newuser',authenticateToken,(req,res)=>{
    const user = {
        id : users.length + 1,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        gender:req.body.gender,
        password:req.body.password
    }
    users.push(user)
    res.json(user)
})

app.put('/api/user',authenticateToken,(req,res)=>{
    let tempID = req.user.id
    for(var index =0;index<users.length;index++){
        if(users[index].id === Number.parseInt(tempID)){

            users[index].first_name = req.body.first_name;
            users[index].last_name = req.body.last_name;
            users[index].email = req.body.email;
            users[index].gender = req.body.gender;

        }
    }
    res.send(users.filter(inuser => inuser.id===req.user.id))
})

app.delete('/api/user',authenticateToken,(req,res)=>{
    let tempID = req.user.id
    let index = users.findIndex((users)=>{
        return(users.id == Number.parseInt(tempID))
    })

    if (index>=0){
        let user = users[index]
        users.splice(index,1)
        res.json(user)
    }else{
        res.status(404)
    }
})
// app.get('/token')

app.listen(3000,()=>{
    console.log("Listening on Server : 3000")
})