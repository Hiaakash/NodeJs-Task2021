const express = require('express')
const bcrypt = require('bcrypt')
const app = express();
app.use(express.json())
const users = []

app.get('/',(req,res)=>{
        res.send("Hello Server")
    })
    app.get('/users',(req,res)=>{
    res.json(users)
})

app.post('/users',async (req,res)=>{

        try{
            const salt = await bcrypt.genSalt();
            const hashedpass = await bcrypt.hash(req.body.password,salt);


    const user = {name: req.body.name,password :hashedpass}
    users.push(user);
    res.status(201).send();

        }catch{
            res.status(500).send()

        }
})

app.post('/users/login',async (req,res) =>{
    const user = users.find(user => user.name ===req.body.name)

    if(user ==null){
        return res.status(500).send("User Not Found")
    }

    try{
        if(await bcrypt.compare(req.body.password,user.password )){

            res.send("Success ")
        }else{
            res.send("Not Allowed")
        }
    }catch{
        res.status(500).send()

    }
})
app.listen(3000,()=>{
        console.log("Listening to : 3000");
})


// encodedData = "Basic " + window.btoa('YOUR_USERNAME:YOUR_PASSWORD')