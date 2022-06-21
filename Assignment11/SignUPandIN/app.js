const {sequelize,User,Post} = require('./models')
require('dotenv').config();
const authenticateToken = require('./auth');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express()
app.use(express.json())

app.post('/user/signup', async(req,res)=>{
    var {first_name,last_name,email,gender,password} = req.body
    const salt = await bcrypt.genSalt();
    var password = await bcrypt.hash(password,salt);
    console.log(password);
    try{
       const user = await User.create({first_name,last_name,email,gender,password})
       return res.json(user)
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
})

app.get('/users',authenticateToken,async(req,res)=>{

    try{
        const users = await User.findAll()
        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }

})


app.get('/users/:uuid',authenticateToken,async(req,res)=>{
    const uuid = req.params.uuid
    try{
        const user = await User.findOne({
            where :{uuid}, include :"posts"
        })
        return res.json(user)
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
})

app.post('/user/login',async(req,res)=>{
    // Authentication
    var { count, rows } = await User.findAndCountAll();
    console.log(count)
    console.log(rows)
    const user = rows.find(user => user.email ===req.body.email)

    const username = req.body.email
    
    if(await bcrypt.compare(req.body.password,user.password)){
    const password = user.password
    var check = true
    for (var index =0;index<rows.length;index++){
        if((rows[index].email ===username) && rows[index].password ===password){
            const loginID = rows[index].id
            const user = {email : username, password : password , id : loginID}
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '30s'})
            res.json({accessToken : accessToken})
            check = true
            break;
        }else{
            check = false
        }
    } 
    if(!check){
        res.status(401).send("Invalid Credentials");
    }
}
    }
)


// Routes For Posting {posts Table}
app.post('/postdata',async(req,res)=>{
    const {useruuid,body} = req.body
    try {
        const user = await User.findOne({where : {uuid : useruuid}})
        const poststatus = await Post.create({body,userID : user.id})
        return res.json(poststatus)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})
app.get('/postdata',async(req,res)=>{
    
    try {
        const postdata = await Post.findAll({include :["user"]})
        // const poststatus = await Post.create({body,userID : user.id})
        return res.json(postdata)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})



app.delete('/users/:uuid',async(req,res)=>{
    const uuid = req.params.uuid
    try{
        const user = await User.findOne({
            where :{uuid},
        })
        const tempId = user.id
        await user.destroy();
        await Post.destroy({where :{userID :tempId}})
        return res.json("User and His Post Deleted")
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
})

// delete allposts of users
app.delete('/userpost',async(req,res)=>{
    const uuid = req.body.uuid
    try { const user = await User.findOne({
        where :{uuid},
    })
        const tempId = user.id
        await Post.destroy({where :{userID :tempId}})
        return res.json("Post Deleted")
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})


app.listen(5000,async()=>{
    console.log(Date.now())
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

