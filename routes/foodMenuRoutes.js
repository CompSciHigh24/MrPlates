
//import mongoose
const mongoose = require("mongoose");

//import express
const express = require("express");

//create router
const router = express.Router();
//import body parser

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

//Menu Schema
const menuSchema = new mongoose.Schema({
  foodName: { type: String},
  allergens: { type: Array},
  price: { type: Number},
  itemNumber:{ type: Number},
  description: { type: String},
  imgUrl: { type: String },
});

//Menu Model under menuSchema
const Menu = mongoose.model("Menu", menuSchema);


// GET Method routes to /menu
router.get("/", (req, res) => {
  Menu.find({})
    .then((items) => {
      res.render("entres.ejs", { foods: items });
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" });
    });
});
//GET Method routes to /menu/editMenu
router.get("/editMenu", (req, res) => {
  Menu.find({})
    .then((items) => {
      res.render("editMenu.ejs", { foods: items });
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" });
    });
});


//GET Method routes to /menu/*each individual menu item*
router.get("/:index", (req, res) => {
   const i=req.params.index;
let filter={itemNumber:i};
  Menu.findOne(filter)
    .then((item) => {
      console.log(item)
      res.render("itemInfo.ejs",{item:item});

    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

 //GET Method routes to /menu/*each individual menu items order page that will show the info of that item when being purchased*
router.get("/:index/orderPage", (req, res) => {
   const i=req.params.index;
let filter={itemNumber:i};
  Menu.findOne(filter)
    .then((item) => {
      console.log(item)
      res.render("orderPage.ejs",{item:item});

    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

//POST Method that allows Toure to publish more menu items. Allows him to add a new menu items, and include attributes such as the foodName, allergens, price, itemNumber, description, and imgUrl in the database
router.post('/', (req, res) => {
  const { foodName, allergens, price, itemNumber, description, imgUrl } = req.body;
  const menuItem = new Menu({ foodName, allergens, price, itemNumber, description, imgUrl });
console.log("posted!")
  menuItem.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});


//DELETE Method that allows Toure to delete one or more menu items. Will first have to access the id given to each menu item in order to remove it from the database
router.delete('/editMenu/:_id', (req, res) => {
  const filter = {_id: req.params._id}

  Menu.findOneAndDelete(filter)
  .then((del) => {
    res.json(del)
  })
});

//PATCH Method that allows Toure to update menu items. Allows him to change the foodName, allergens, price, itemNumber, description, and imgUrl in the database
router.patch('/editMenu/:_id', (req, res) => {
  const filter = {_id: req.params._id}
  const update = {foodName: req.body.foodName, allergens: req.body.allergens,price: req.body.price,itemNumber:req.body.itemNumber,description: req.body.description}

  Menu.findOneAndUpdate(filter, update, {new: true})
  .then((upd) => {
    res.json(upd)
  })
})



module.exports = router;
