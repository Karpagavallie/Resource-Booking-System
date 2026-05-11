const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db");

// Register
router.post("/register", async (req,res)=>{
    const {name,email,password,role} = req.body;
    const hashed = await bcrypt.hash(password,10);
    const sql = "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)";
    db.query(sql,[name,email,hashed,role], (err,result)=>{
        if(err) return res.status(500).json({message: err.message});
        res.status(201).json({message:"User registered successfully!"});
    });
});

// Login
router.post("/login", (req,res)=>{
    const {email,password} = req.body;
    db.query("SELECT * FROM users WHERE email=?", [email], async (err,results)=>{
        if(err) return res.status(500).json({message: err.message});
        if(results.length === 0) return res.status(400).json({message:"User not found"});

        const valid = await bcrypt.compare(password, results[0].password);
        if(!valid) return res.status(400).json({message:"Invalid password"});

        res.status(200).json({message:"Login successful", user:results[0]});
    });
});

module.exports = router;
