const express = require('express');
const router = express.Router();

const number_model = require('../db/Schema')

router.post("/user_enter_number",async(req,res)=>{
  // res.json({server : "bakend server running"})
    try {
        const { ipaddress } = req.body;

    // Check if IP address is provided
    if (!ipaddress) {
      return res.status(400).json({ error: "IP address is required" });
    }
    const existingEntry = await number_model.findOne({ ipaddress: ipaddress });
    if (existingEntry) {
      return res.status(400).json({ error: "IP address already exists in the database" });
    }

    // If IP address is provided and doesn't exist in the database, save the entry
    const newNumber = await number_model.create(req.body);
    return res.status(201).json({ status: true, msg: newNumber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.get("/user_enter_number_get",async(req,res)=>{
  try {
      // const newNumber = await number_model.create(req.body);
      const data = await number_model.find()
      // console.log(req.body);
      // console.log("hello caling");
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