// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import {getDatabase, set, ref, update, onValue} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);



signIn.addEventListener('click', (e) => {
    event.preventDefault();

    var email = document.getElementById('email_input').value;
    var name = document.getElementById('name_input').value;
    var password = document.getElementById('psw_input').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        var lgDate = new Date();
        update(ref(database, 'users/' + user.uid), {
          last_login: lgDate,
        })
        .then(() => {
          // Data saved successfully!
          alert('Logged in successfully');
          window.location.href = "home.html";
        })
        .catch((error) => {
          // The write failed...
          alert(error);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });

});
signUp.addEventListener('click', (e) => {
    event.preventDefault();
    
    var email = document.getElementById('email_input').value;
    var name = document.getElementById('name_input').value;
    var password = document.getElementById('psw_input').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            // Data saved successfully!
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
              name : name,
              email: email,
              password: password,
            })
            .then(() => {
              // Data saved successfully!
              alert('User created successfully');
              //alert(user.password); 
              //window.location.href = "home.html";
            })
            .catch((error) => {
              // The write failed...
              alert(error);
            });
            
        })
        .catch((error) => {
            // The write failed...
            alert(error);
        });
});