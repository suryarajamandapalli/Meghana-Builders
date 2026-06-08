import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDpMWGFtnR4Ql2xbnaBYKgQTmYfv2ieNqY",
  authDomain: "mkmeghnabuilders.firebaseapp.com",
  databaseURL: "https://mkmeghnabuilders-default-rtdb.firebaseio.com",
  projectId: "mkmeghnabuilders",
  storageBucket: "mkmeghnabuilders.firebasestorage.app",
  messagingSenderId: "317798610131",
  appId: "1:317798610131:web:cf22fde86d8a48ba8dd026"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
