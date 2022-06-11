const express = require('express');
require('./config/db');
const bodyParser=require('body-parser');
const app=express() ;
const userRoutes=require('./routes/user.routes');

app.use(express.json());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended:true }));

//routes
app.use('/api/user',userRoutes)



//server
const PORT=process.env.PORT;
app.listen(process.env.PORT, ()=>console.log('server succesfull run on port '+PORT)); 