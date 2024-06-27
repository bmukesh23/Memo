require('dotenv').config();
const admin = require("firebase-admin");
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;