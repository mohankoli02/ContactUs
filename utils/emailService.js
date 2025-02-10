const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (name, email, message) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      // 📩 Email to Admin (from customer)
      let adminMailOptions = {
        from: process.env.EMAIL_USER, // Must be the authenticated email
        to: process.env.EMAIL_USER, // Admin's email
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        replyTo: email, // Allows the admin to reply directly to the customer
      };
      
  
      // 📩 Auto-response to Customer
      let customerMailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Send to customer's email
        subject: "Thank You for Contacting Us!",
        text: `Hello ${name},\n\nThank you for reaching out! We've received your message and will get back to you soon.\n\nBest Regards,\nYour Support Team`,
      };
  
      // Send emails
      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(customerMailOptions);
  
      console.log("Emails sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  

module.exports = sendEmail;
