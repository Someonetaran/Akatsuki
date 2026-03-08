const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

//@route POST /api/subscribe
// @desc Handle newsletter subScription
// @access Public
router.post("/subscribe", async (req, res) => {
    const { email } = req.body;

    if(!email) {
        return res.status(400).json({message: "Email is required"});
    }

    try {
        //Chech if the email is already subscribed
        let subcriber = await  Subscriber.findOne({ email });
        if(subcriber) {
        return res.status(400).json({message: "Email is already subscribed"});
        }  

        //Create a new subcriber
        subcriber = new Subscriber({ email });
        await subcriber.save();

        res
        .status(201)
        .json({ message: "Successfully subscribed to the newsletter!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error"});
    }
});



module.exports = router;