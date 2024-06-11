//import express
const express = require("express");
//import ejs
const ejs = require("ejs");
//create app
const app = express();

//import body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 

//set engine to ejs
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded());

//Logs method in console
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});


// Sets up the middleware for the /public folder
app.use(express.static(__dirname + "/public"));

// Set up the route handler for /home. Send back the home.html file as a static file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});

//create route for /menu
const foodMenuRoutes = require(__dirname + "/routes/foodMenuRoutes.js");
app.use("/menu", foodMenuRoutes);

//create route for /orderConfirmation
const ordersInfoRoutes = require(__dirname + "/routes/ordersInfoRoutes.js");
app.use("/orderConfirmation", ordersInfoRoutes);

//create route for /adminPage
app.get("/adminPage", (req, res) => {
  res.sendFile(__dirname + "/public/addItem.html");
});



//create route for /schedule
app.get("/schedule", (req, res) => {
  res.sendFile(__dirname + "/public/schedule.html");
});

//server runs on port 3003
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


