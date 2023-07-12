// Import the functions you need from the SDKs you need
const admin = require('firebase-admin');
const {initializeApp} = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: process.env.VITE_API_KEY,
    authDomain: process.env.VITE_AUTH_DOMAIN,
    projectId: process.env.VITE_PROJECT_ID,
    storageBucket: process.env.VITE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_APP_ID,
};

// Initialize Firebase
// const app = admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//     ...firebaseConfig,
// });
const app = initializeApp(firebaseConfig)
module.exports = {
   app,
}
