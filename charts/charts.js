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

  // Count the number of stayed and switched
  const stayed = data.filter(item => !item.didSwitch).length;
  const switched = data.filter(item => item.didSwitch).length;
  // Get the canvas element
  const canvas = document.getElementById('myChart1');
  const ctx = canvas.getContext('2d');

  // Create the pie chart
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Stayed', 'Switched'],
      datasets: [{
        label: 'Stayed vs Switched',
        data: [stayed, switched],
        backgroundColor: [
          '#4e73df',
          '#1cc88a'
        ],
        hoverBackgroundColor: [
          '#2e59d9',
          '#17a673'
        ],
        hoverBorderColor: 'rgba(234, 236, 244, 1)',
      }],
    }
  });
}, (error) => {
  console.error(error);
});

