import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js/auto';

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
  const labels = Object.keys(data);
  const values = Object.values(data).map(Number);

  // Get the canvas element
  const canvas = document.getElementById('myChart1');
  const ctx = canvas.getContext('2d');

  // Create the pie chart
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Probabilities',
        data: values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Ziegen Problem Probabilities'
        }
      }
    }
  });
}, (error) => {
  console.error(error);
});

