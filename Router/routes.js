const express = require('express');
const router = express.Router();

const number_model = require('../db/Schema')


router.post("/user_ip_adress", async (req, res) => {
 
    const {ipaddress} = req.body;
    if (!ipaddress) {
      return res.status(400).json({ error: "IP address is required" });
    }
    let existingEntry = await number_model.findOne({ ipaddress: ipaddress });
    
    if(existingEntry){
      return res.json({status:true, msg:"this ip adress already have"})
    }else{
      const newNumber = await number_model.create({
        ipaddress: ipaddress,
    })
    return res.status(201).json({ status: true, msg: newNumber });
  }

})


router.post("/user_enter_number", async (req, res) => {
  // console.log("user calling");
  try {
    const { ipaddress, phoneno, location } = req.body;

    // Check if IP address is provided
    // if (!ipaddress) {
    //   console.log("not find ip");
    //   return res.status(400).json({ error: "IP address is required" });
    // }

    // Check if IP address already exists in the database
    let existingEntry = await number_model.findOne({ ipaddress: ipaddress });
    if (existingEntry) {
      console.log(existingEntry);
      // If IP address already exists, update the entry with new data
      // existingEntry.phoneno = phoneNumber;
      // // existingEntry.countrycode = value;
      // existingEntry.location = location;
      const result = await number_model.findOneAndUpdate(
        { ipaddress: ipaddress },
        { $set: { phoneno: phoneno, location: location} },
        { upsert: true, new: true }
      );

      // const data_save = await existingEntry.save();
      console.log(result);
      return res.status(200).json({ status: true, msg: result ?"Entry updated successfully" : "New entry created"});
    } 
    // else {
    //   // If IP address does not exist, create a new entry
    //   const newNumber = await number_model.create({
    //     ipaddress: ipaddress,
    //     phoneno: phoneNumber,
    //     countrycode: value,
    //     location: location
    //   });
    //   return res.status(201).json({ status: true, msg: newNumber });
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/user_enter_number_get",async(req,res)=>{
  try {
      // const newNumber = await number_model.create(req.body);
      const data = await number_model.find()
      // console.log(req.body);
      // console.log("hello caling");
      console.log(data);
      return res.json({status:true , msg : data})
      // res.status(201).json(newNumber);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
})

router.delete("/delete_unusal_data",async(req,res)=>{
  try {
    await number_model.deleteMany({ $or: [{ ipaddress: { $exists: false } }, { ipaddress: "" }] });
    res.json({ status: true, msg: "done" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})
router.delete("/delete_All",async(req,res)=>{
  try {
    await number_model.deleteMany();
    res.json({ status: true, msg: "done" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})


module.exports = router;