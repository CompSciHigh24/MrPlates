//import mailjet
const Mailjet = require('node-mailjet');

//connect Mailjet and give access to public and private key
const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
    {
      config: {},
      options: {}
    } 
);

//import mongoose
const mongoose = require("mongoose");

//import express
const express = require("express");

//create router
const router = express.Router();

//import body-parser
const bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); 


//MongoDB Connection String
const mongoDBConnectionString =
  "mongodb+srv://SE12:CSH2024@cluster0.hq3gcj3.mongodb.net/ToureCaterInfo?retryWrites=true&w=majority&appName=Cluster0";

//Mongoose server connects to connection string
mongoose.connect(mongoDBConnectionString).then(() => {
  console.log("MongoDB connected...");
});

//Orders Schema
var orderSchema = new mongoose.Schema({
  customerFName: { type: String},
  customerLName: { type: String},
  grade: { type: String},
  advisory: { type: String },
  email: { type: String },
  bill: { type: String },
},
  { timestamps: true },
  

);

//Order Model under orderSchema
const Order = mongoose.model("Order", orderSchema);

// GET Method routes to /orderConfirmation
router.get("/", (req, res) => {
Order.find({})
    .then((order) => {
      res.render("orderConfirmation.ejs",{order:order});

    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" });
    });
});





// POST Method to /orderConfirmation
//User will be sent an email and will be personalized based on the name they input in the text boxes
router.post("/", (req, res) => {
  const order = new Order({
    customerFName: req.body.customerFName,
    customerLName: req.body.customerLName,
    grade: req.body.grade,
    advisory: req.body.advisory,
    email: req.body.email,
    bill: req.body.bill,
  })
    .save()
    .then(() => {
      const request = mailjet
        
              .post('send', { version: 'v3.1' })
              .request({
                Messages: [
                  {
                    From: {
                      Email: 'toure.parker25@compscihigh.org',
                      Name: 'Mr. Plates'
                    },
                    To: [
                      {
                        Email: req.body.email,
                        Name: req.body.customerFName+" "+req.body.customerLName
                      }
                    ],
                    "TemplateID": 6004552,
                    "TemplateLanguage": true,
                    "Subject": "Thank you for your order, "+req.body.customerFName+"!",
                    "Variables": {
                      "name":req.body.customerFName,
                      "order":req.body.bill,
                    }
                  }
                ]
              })

      request
          .then((result) => {
              console.log(result.body)
          })
          .catch((err) => {
              console.log(err.statusCode)
          })
      res.redirect("/orderConfirmation")
    });
});


module.exports = router;
