const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const homeRoute = require("./routes/index");



const server = express();
const templatePath = path.join(__dirname,"./templates/views");
const partialPath = path.join(__dirname,"./templates/partials");
// console.log(templatePath);

//config files
dotenv.config({path : './config.env'});
const PORT = process.env.PORT;

//models
require("./model/dbConn");

//middleware
server.use(cors());

// Set up express-session middleware
server.set('trust proxy', 1) // trust first proxy
server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false}
}))


server.use(express.static("public"));
// Parse incoming form data
server.use(bodyParser.urlencoded({ extended: true }));



server.set("view engine","hbs");
server.set("views",templatePath);

hbs.registerPartials(partialPath);
//apis
server.use("/",homeRoute);



server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});