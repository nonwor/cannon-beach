// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration

const placeHolderAPIKEY = import.meta.env.REACT_APP_API_KEY
const placeHolderAUTHDOMAIN = import.meta.env.AUTHDOMAIN
const placeHolderPROJECTID = import.meta.env.PROJECTID
// const placeHolderSTORAGEBUCKET = import.meta.env.STORAGEBUCKET
const placeHolderMESSAGINGSENDERID = import.meta.env.MESSAGINGSENDERID
const placeHolderAPPID = import.meta.env.APPID


const firebaseConfig = {
  apiKey: placeHolderAPIKEY,
  authDomain: placeHolderAUTHDOMAIN,
  projectId: placeHolderPROJECTID ,
  storageBucket: "ocean-eyes-v1.appspot.com",
  messagingSenderId: placeHolderMESSAGINGSENDERID,
  appId: placeHolderAPPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);