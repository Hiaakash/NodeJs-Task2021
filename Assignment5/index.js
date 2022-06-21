const { json } = require("express");
const express = require("express");
const student = require("./data");


const app = express();
app.use(express.json());
const port = 3000;
app.listen(port,()=>{
    console.log("Running on the Port : ",port);
})



app.get('/',(req,res)=>{
    res.json({message: "Getting the Data"});
})


app.get('/api/student',(req,res)=>{
    res.json(student);
})


app.post('/api/student',(req,res)=>{
    const user = {
        id : student.length + 1,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        gender:req.body.gender
    }

    student.push(user)
    res.json(user)
})

app.put('/api/student/:id',(req,res)=>{
    let id1 = req.params.id
    for(var index =0;index<student.length;index++){
        if(student[index].id === Number.parseInt(id1)){

            student[index].first_name = req.body.first_name
            student[index].last_name = req.body.last_name
            student[index].email = req.body.email
            student[index].gender = req.body.gender

        }
    }
    res.send(JSON.stringify(student))
})

app.delete('/api/student/:id',(req,res)=>{
    let id1 = req.params.id
    let index = student.findIndex((student)=>{
        return(student.id == Number.parseInt(id1))
    })

    if (index>=0){
        let std = student[index]

        student.splice(index,1)
        res.json(std)
    }else{
        res.status(404)
    }
})
