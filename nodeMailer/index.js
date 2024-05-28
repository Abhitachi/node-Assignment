const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.urlencoded());

console.log(__dirname);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/send-mail", (req, res) => {
  const { email, subject, message } = req.body;
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    services: "gmail",
    auth: {
      user: "abhishek@gmail.com",
      pass: "hi",
    },
  });

  const mailOptions = {
    from: email,
    to: "abhishek@gmail.com",
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
      res.end();
    }
  });
});

app.listen(port, () => {
  console.log(`listening on the server ${port}`);
});
