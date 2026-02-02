const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body; 

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await sendEmail({ name, email, message });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;
