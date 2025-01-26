import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNrsG76-QobHmbMMGkIc6HMcyx4YPGe3A",
  authDomain: "ziegenproblem.firebaseapp.com",
  databaseURL: "https://ziegenproblem-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ziegenproblem",
  storageBucket: "ziegenproblem.firebasestorage.app",
  messagingSenderId: "646164011377",
  appId: "1:646164011377:web:1a1eefe3a5ba66cbc17ed0",
  measurementId: "G-KC7HS5JFMT"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);

// Get a reference to your 'ziegen_problem' database
const database = getDatabase(app);
const resultRef = ref(database, 'ziegen_problem');

// Retrieve data from the database
resultRef.on('value', (snapshot) => {
  const data = snapshot.val();
  console.log(data);

  // Process the retrieved data and display it on your website
  // For example, you can loop through the data and create HTML elements
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      console.log(element);
      // Create HTML elements and append them to your website
    }
  }
}, (error) => {
  console.error('Error retrieving data from Firebase:', error);
});

