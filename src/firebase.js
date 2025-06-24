// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1I-SChpACU4vh_VsmnrJZid2RvrtwwGc",
  authDomain: "bingo-familiar-86fd6.firebaseapp.com",
  databaseURL: "https://bingo-familiar-86fd6-default-rtdb.firebaseio.com/",
  projectId: "bingo-familiar-86fd6",
  storageBucket: "bingo-familiar-86fd6.firebasestorage.app",
  messagingSenderId: "1043972210015",
  appId: "1:1043972210015:web:ee8f5ec805ee35a6d14aea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
