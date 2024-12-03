// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDDLcBahPYK0C8M_sOjstamg1Dg4iQ9BmA",
    authDomain: "universal-yoga-6a677.firebaseapp.com",
    databaseURL: "https://universal-yoga-6a677-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "universal-yoga-6a677",
    storageBucket: "universal-yoga-6a677.firebasestorage.app",
    messagingSenderId: "892013269570",
    appId: "1:892013269570:web:50681d9c4edf9f31a313db"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };