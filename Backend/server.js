require('dotenv').config();
const express = require('express');
const cors = require('cors');
const firebase = require('firebase-admin');

const userRoute = require('./routes/userRoute');
const studentRoute = require('./routes/studentRoute');
const teacherRoute = require('./routes/teacherRoute');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(studentRoute);
app.use(teacherRoute);

// Port 
const PORT = process.env.PORT || 5000;

// Firebase connection
const connectFirebase = () =>
  new Promise((resolve, reject) => { 
    if (firebase.apps.length) return resolve(firebase.firestore());

    try {
      if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
        firebase.initializeApp({ credential: firebase.credential.cert(serviceAccount) });
      } else if (
        process.env.FIREBASE_PROJECT_ID &&
        process.env.FIREBASE_CLIENT_EMAIL &&
        process.env.FIREBASE_PRIVATE_KEY
      ) {
        const serviceAccount = {
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        };
        firebase.initializeApp({ credential: firebase.credential.cert(serviceAccount) });
      } else {
        // assumes GOOGLE_APPLICATION_CREDENTIALS is set
        firebase.initializeApp();
      }
      resolve(firebase.firestore());
    } catch (err) {
      reject(err);
    }
  });

// Start server after firebase connection
connectFirebase()
  .then((db) => {
    app.locals.db = db;
    console.log('Firebase initialized');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Firebase initialization error:', err);
  });