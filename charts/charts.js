import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
onValue(resultRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);

  // Prepare the data for the pie chart
  const labels = ['Probability Stay', 'Probability Switch']
  const values = Object.values(data).map(({ probabilityStay, probabilitySwitch }) => ({
    probabilityStay,
    probabilitySwitch,
  })).map(({ probabilityStay, probabilitySwitch }) => [
    probabilityStay,
    probabilitySwitch,
  ]);
  // Get the canvas element
  const canvas = document.getElementById('myChart1');
  const ctx = canvas.getContext('2d');

  // Create the pie chart
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [{
        label: 'Users',
        data: [50, 60, 70, 180]
      }, {
        label: 'Revenue',
        data: [100, 200, 300, 400]
      }]
    }
  });
}, (error) => {
  console.error(error);
});

