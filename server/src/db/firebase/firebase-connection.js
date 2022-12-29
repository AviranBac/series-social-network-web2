const admin = require('firebase-admin');
const serviceAccount = require('../../../credentials/firebaseServiceAccountKey.json');

const firebaseAdminConnection = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
console.log("Connected to Firebase Admin SDK successfully");

module.exports = {
    firebaseAdminConnection
};