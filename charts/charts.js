import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

// Initialize the chart variable
let myChart;
// Get the canvas element
const canvas = document.getElementById('myChart1');
const ctx = canvas.getContext('2d');

// Retrieve data from the database
onValue(resultRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);

    // Count the number of stayed and switched
    const stayed = Object.values(data).filter(item => !item.didSwitch).length;
    const switched = Object.values(data).filter(item => item.didSwitch).length;

    // Chart configuration
    const chartData = {
        labels: ['Bleiben', 'Wechseln'],
        datasets: [{
            label: 'gewechselt vs geblieben',
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
        }]
    };
    // If the chart already exists, update it
    if (myChart) {
        myChart.data = chartData;
        myChart.update();
    } else {
        // Create the chart if it doesn't exist
        myChart = new Chart(ctx, {
            type: 'pie',
            data: chartData
        });
    }
}, (error) => {
    console.error(error);
});

/////////////

// Initialize the chart variable
let switchedProbabilityChart;
// Get the canvas element
const canvas2 = document.getElementById('myChart2');
const ctx2 = canvas2.getContext('2d');
let myChart2;
// Retrieve data from the database
onValue(resultRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);

    // Count the number of stayed and switched
    const won = Object.values(data)
        .filter(item => item.didSwitch)
        .filter(item => item.carBehind === item.playerChoice).length;
    const lost = Object.values(data)
        .filter(item => item.didSwitch)
        .filter(item => item.carBehind !== item.playerChoice).length;

    // Chart configuration
    const chartData = {
        labels: ['Auto', 'Ziege'],
        datasets: [{
            data: [won, lost],
            backgroundColor: [
                '#4e73df',
                '#1cc88a'
            ],
            hoverBackgroundColor: [
                '#2e59d9',
                '#17a673'
            ],
            hoverBorderColor: 'rgba(234, 236, 244, 1)',
        }]
    };
    // If the chart already exists, update it
    if (myChart2) {
        myChart2.data = chartData;
        myChart2.update();
    } else {
        // Create the chart if it doesn't exist
        myChart2 = new Chart(ctx2, {
            type: 'pie',
            data: chartData
        });
    }
}, (error) => {
    console.error(error);
});


/////////////

// Initialize the chart variable
let stayedProbabilityChart;
// Get the canvas element
const canvas3 = document.getElementById('myChart3');
const ctx3 = canvas3.getContext('2d');
let myChart3;
// Retrieve data from the database
onValue(resultRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);

    // Count the number of stayed and switched
    const won = Object.values(data)
        .filter(item => item.didStay)
        .filter(item => item.carBehind === item.playerChoice).length;
    const lost = Object.values(data)
        .filter(item => item.didStay)
        .filter(item => item.carBehind !== item.playerChoice).length;

    // Chart configuration
    const chartData = {
        labels: ['Auto', 'Ziege'],
        datasets: [{
            data: [won, lost],
            backgroundColor: [
                '#4e73df',
                '#1cc88a'
            ],
            hoverBackgroundColor: [
                '#2e59d9',
                '#17a673'
            ],
            hoverBorderColor: 'rgba(234, 236, 244, 1)',
        }]
    };
    // If the chart already exists, update it
    if (myChart3) {
        myChart3.data = chartData;
        myChart3.update();
    } else {
        // Create the chart if it doesn't exist
        myChart3 = new Chart(ctx3, {
            type: 'pie',
            data: chartData
        });
    }
}, (error) => {
    console.error(error);
});

/////////////

// Initialize the chart variable
let ProbabilityStayChart;
// Get the canvas element
const canvas4 = document.getElementById('myChart4');
const ctx4 = canvas3.getContext('2d');
let myChart4;
// Retrieve data from the database
onValue(resultRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);

    // Count the number of stayed and switched
    const probability = Object.values(data)
        .filter(item => item.probabilitySwitch).length;
    

    // Dynamische Labels und Daten aus der Datenbank extrahieren
    const labels = Object.keys(data); // Labels sind die Schlüssel der Datenbankeinträge
    const chartDataValues = Object.values(data).map(item => item.probabilitySwitch); // Die zugehörigen Werte
    
    // Prüfen, ob alle Werte vorhanden sind
    console.log("Labels:", labels);
    console.log("Daten:", chartDataValues);

    // Chart-Konfiguration
    const chartData = {
        labels: labels, // Dynamische Labels
        datasets: [{
            label: 'Wahrscheinlichkeiten',
            data: chartDataValues, // Dynamische Werte
            backgroundColor: [
                '#4e73df',
                '#1cc88a',
                '#36b9cc',
                '#f6c23e',
                '#e74a3b'
            ],
            hoverBackgroundColor: [
                '#2e59d9',
                '#17a673',
                '#2c9faf',
                '#d4a017',
                '#be2617'
            ],
            hoverBorderColor: 'rgba(234, 236, 244, 1)',
        }]
    };
    // If the chart already exists, update it
    if (myChart4) {
        myChart4.data = chartData;
        myChart3.update();
    } else {
        // Create the chart if it doesn't exist
        myChart4 = new Chart(ctx4, {
            type: 'pie',
            data: chartData
        });
    }
}, (error) => {
    console.error(error);
});

