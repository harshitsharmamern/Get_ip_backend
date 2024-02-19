const express = require('express');
const router = express.Router();

const number_model = require('../db/Schema')

router.post("/user_enter_number",async(req,res)=>{
    try {
        const {ip }  = req.body
        if(ip != null){
          return;
        }else{
          const alreadystore = await number_model.find({ipadress : req.body.ipaddress})
          
          if(alreadystore){
            return ;
          }else {
          console.log(req.body);
        const newNumber = await number_model.create(req.body);
        // console.log(req.body);
        // console.log(req.body);
        return res.json({status:true , msg : newNumber})
          }
        }
        // res.status(201).json(newNumber);
      } catch (err) {
        res.status(400).json({ error: err.message });
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