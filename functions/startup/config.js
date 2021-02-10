const express = require("express");

const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

const Send = require("../routes/Send");

const whitelist = [
  "http://localhost:3000", // delete localhost on production
  "https://yourdomain.com",
  "https://www.yourdomain.com",
];

const allowedOrigin = function (origin, callback) {
  if (whitelist.indexOf(origin) !== -1) callback(null, true);
  else callback(new Error("Not allowed by CORS"));
};

module.exports = function (app) {
  app.use(helmet());
  app.use(
    cors({
      origin: allowedOrigin,
      methods: ["POST"],
      allowedHeaders: ["Content-Type"],
    }),
  );
  app.use(compression());
  app.use(express.json());
  app.use("/send", Send);
};
