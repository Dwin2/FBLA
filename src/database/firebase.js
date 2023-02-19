// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import {getAuth, createUserWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import {getDatabase, set, ref, get, child, onValue} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAk1PFr2t9GJ9nw3rJKpRaxbpa8qEOkB9E",
    authDomain: "fbla-a75b5.firebaseapp.com",
    projectId: "fbla-a75b5",
    storageBucket: "fbla-a75b5.appspot.com",
    messagingSenderId: "663754057241",
    appId: "1:663754057241:web:660aa55940b6d3f03eac88",
    measurementId: "G-8PJ42RC16J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase();

//const {userId} = await getAuth;
const userId = auth.currentUser;

export {createUserWithEmailAndPassword, signOut, set, ref, get, child, onValue, app, auth, database, userId};