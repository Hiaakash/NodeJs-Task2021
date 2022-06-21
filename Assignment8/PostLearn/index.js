const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/database');
// import { db} from './db/database';

db.authenticate()
  .then(()=>{
      console.log("DB Connected");
  })
  .catch((error)=>{
      console.log("Error",error);

  })

const app = express();

app.use('/userinfo', require("./routes/userinfo"));

app.listen(3000,()=>{
    console.log("Running Server on port : 3000");
})

app.get('/',(req,res)=>{
    res.send("Hello, Welcome to the server");
})