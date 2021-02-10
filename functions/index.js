const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
admin.initializeApp();
const app = express();

require("./startup/config")(app);

exports.app = functions.https.onRequest(app);
