const Contact = require("../models/contact.js");
const sendEmail = require("../utils/emailService.js");

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save contact data in database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email notification
    await sendEmail(name, email, message);


    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
