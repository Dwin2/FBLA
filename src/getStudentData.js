// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
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

function getData() {
    auth.onAuthStateChanged(function(user) {
    //add progess bar
        if (user) {
            const name = ref(database, 'users/' + user.uid + '/name');
                onValue(name, (snapshot) => {
                const data = snapshot.val();
                document.getElementById("greet").innerHTML =  "Welcome back, " + data +".";
            });
            const points = ref(database, 'users/' + user.uid + '/points');
                onValue(points, (snapshot) => {
                const data = snapshot.val();
                document.getElementById("myPoints").innerHTML =  "You have " + data +" current points.";
            });
            const dbRef = ref(database, 'users/' + user.uid + '/events');
            onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                
                var tmpCard = '<div class="card" style="margin-left: 6%;"><div class="card-body bg-white">';
                
                
                const name = ref(database, 'events/' + childData + '/name');
                    onValue(name, (snapshot) => {
                    const data = snapshot.val();

                    tmpCard += '<h5 class="card-title">' + data + '</h5>';
                    tmpCard += '<hr class="my-4">';
                });

                const description = ref(database, 'events/' + childData + '/description');
                    onValue(description, (snapshot) => {
                    const data = snapshot.val();
                    tmpCard += '<p class="card-text">'  + data + '</p>';
                });
                const location = ref(database, 'events/' + childData + '/location');
                    onValue(location, (snapshot) => {
                    const data = snapshot.val();
                    tmpCard += '<p class="card-text"><strong>Location:</strong> ' + data + '</p>';
                });
                const stime = ref(database, 'events/' + childData + '/st');
                    onValue(stime, (snapshot) => {
                    const data = snapshot.val();
                    tmpCard += '<p class="card-text"><strong>Time:</strong> ' + data + ' to ';
                });
                const etime = ref(database, 'events/' + childData + '/et');
                    onValue(etime, (snapshot) => {
                    const data = snapshot.val();
                    tmpCard += data + '</p>';
                    tmpCard += '<a href="./login.html" class="btn btn-primary" style="margin-top: 2%; font-size: 20px; margin-right: 6%;">More Info</a>';
                    tmpCard += '<button class="btn btn-danger" style="margin-top: 2%; font-size: 20px;" onclick="unRegister(childData);">Unregister</button>';
                    document.getElementById("cards").innerHTML += tmpCard;
                });

            });
            }, {
            onlyOnce: true
            });
        }
    });
}

export {getData};