const express = require('express');
require('./config/db');
const bodyParser=require('body-parser');
const cookieParser= require('cookie-parser');
const userRoutes=require('./routes/user.routes');
const postRoutes=require('./routes/post.route');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const cors= require('cors');

const app=express() ;

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended:true }));

//jwt  middleware
app.get("*",checkUser);
app.get("/jwtid",requireAuth,(req,res,next)=>{
    res.status(200).send(res.locals.user._id);
});

//routes
app.use('/api/user',userRoutes);
app.use('/api/post',postRoutes);

//server
const PORT=process.env.PORT;
app.listen(process.env.PORT, ()=>console.log('server succesfull run on port '+PORT)); 