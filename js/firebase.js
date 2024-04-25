// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsqHrem-nWxXEcWbXAv8eV9IHLYMGZsWg",
  authDomain: "vamos-18e65.firebaseapp.com",
  projectId: "vamos-18e65",
  storageBucket: "vamos-18e65.appspot.com",
  messagingSenderId: "442018087415",
  appId: "1:442018087415:web:6e4f50646df4ed91dfeef2",
  measurementId: "G-46R38T2J2P"
};

// Initialize Firebase Firestore

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const placeCollection = await collection(db, 'places_collection'); 

// Initialise Firebase storage
const storage = getStorage();

export {placeCollection, storage};

