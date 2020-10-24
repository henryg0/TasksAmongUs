const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
export const database = db;
