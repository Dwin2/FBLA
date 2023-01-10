import './styles.css'

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}