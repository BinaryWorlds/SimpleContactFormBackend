const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");

const reCapUrl = "https://recaptcha.google.com/recaptcha/api/siteverify"; // whitelisted
const reCaptchaSecret = "yourSecretKey";

const from = "noReply.yourdomain@gmail.com";
const to = "contact@yourdomain.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: from,
    pass: "yourpassword", // turn on 2-Step Verification and use "Sign in using app passwords"
    //i think its good idea to create separate gmail account like noreply.yourdomain@gmail.com only for this usage
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//todo: throttling api calls/ protect from ddos cost!

router.post("/", async (req, res) => {
  const body = req.body;

  if (!body || !body["token"] || !body.name || !body.email || !body.message)
    return res.status(400).send("No data!");

  const { name, email, message, token } = body;

  // edit name and message length for your purpose
  if (name.length > 16 || email.length > 254 || message.length > 4098)
    res.status(400).send("Bad data!");

  let isError = false;

  const isHuman = await fetch(reCapUrl, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    body: `secret=${reCaptchaSecret}&response=${token}`,
  })
    .then((res) => res.json())
    .then((json) => json.success)
    .catch(() => (isError = true));

  if (isError) return res.status(424).send(`Error in Google Siteverify API.`);

  if (!isHuman)
    return res
      .status(400)
      .send("Recaptcha verification failed. Are you a robot?");

  // send a mail now

  const mailToSend = {
    from,
    to,
    replyTo: email,
    subject: `${name} - yourdomain.com contact form`,
    text: message,
  };

  transporter
    .sendMail(mailToSend)
    .then((info) => console.log(info.response))
    .catch(() => (isError = true));

  if (isError) return res.status(424).send(`Error when sending mail.`);

  return res.status(200).send("Email was send.");
});

module.exports = router;
