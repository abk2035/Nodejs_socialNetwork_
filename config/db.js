const mongoose = require("mongoose");
require('dotenv').config({path:'./config/.env'});

const MONGO_USERNAME=process.env.MONGO_USERNAME;
const MONGO_PASSWORD=process.env.MONGO_PASSWORD
const MONGO_HOST=process.env.MONGO_HOST
mongoose
  .connect(
    "mongodb+srv://"+MONGO_USERNAME+":"+MONGO_PASSWORD+"@"+MONGO_HOST,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      retryWrites: false
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
  






























//don't pay attentio
/*
PORT=6000
MONGO_USERNAME=abk
MONGO_PASSWORD=abk237
MONGO_HOST= cluster0.wjz5dxo.mongodb.net/social_network_project?retryWrites=true&w=majority 
SECRET_TOKEN= F216F4CDCBD7348F7C669D982CC5824$#$%sdfk{{sd}}
*/