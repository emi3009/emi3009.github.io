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
            data: [stayed, switched]
        }]
    };
    console.log(chartData);
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

// Get the canvas element
const canvas2 = document.getElementById('myChart2');
const ctx2 = canvas2.getContext('2d');
let myChart2;
// Retrieve data from the database
onValue(resultRef, (snapshot) => {
    const data = snapshot.val();
    
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
            data: [won, lost]
        }]
    };
    console.log(chartData);
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

// Get the canvas element
const canvas3 = document.getElementById('myChart3');
const ctx3 = canvas3.getContext('2d');
let myChart3;
// Retrieve data from the database
onValue(resultRef, (snapshot) => {
    const data = snapshot.val();

    // Count the number of stayed and switched
    const won = Object.values(data)
        .filter(item => !item.didSwitch)
        .filter(item => item.carBehind === item.playerChoice).length;
    const lost = Object.values(data)
        .filter(item => !item.didSwitch)
        .filter(item => item.carBehind !== item.playerChoice).length;

    // Chart configuration
    const chartData = {
        labels: ['Auto', 'Ziege'],
        datasets: [{
            data: [won, lost]
        }]
    };
    console.log(chartData);
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

// Get the canvas element
const canvas4 = document.getElementById('myChart4');
const ctx4 = canvas4.getContext('2d');
let myChart4;
// Retrieve data from the database
onValue(resultRef, (snapshot) => {
    const data = snapshot.val();

    // Group data by probabilityStay
    const groupedData = {};
    Object.values(data).forEach(item => {
        const probStay = item.probabilityStay;
        if (groupedData[probStay]) {
            groupedData[probStay]++;
        } else {
            groupedData[probStay] = 1;
        }
    });

    // Dynamische Labels und Daten aus der Datenbank extrahieren
    const labels = Object.keys(groupedData).map(label => `${label}%`);
    const chartDataValues = Object.values(groupedData);

    // Chart-Konfiguration
    const chartData = {
        labels: labels, // Dynamische Labels
        datasets: [{
            label: 'Wahrscheinlichkeiten',
            data: chartDataValues, // Dynamische Werte
        }]
    };
    console.log(chartData);
    // If the chart already exists, update it
    if (myChart4) {
        myChart4.data = chartData;
        myChart4.update();
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

/////////////

// Get the canvas element
const canvas5 = document.getElementById('myChart5');
const ctx5 = canvas5.getContext('2d');
let myChart5;
// Retrieve data from the database
onValue(resultRef, (snapshot) => {
    const data = snapshot.val();

    // Group data by probabilitySwitch
    const groupedData = {};
    Object.values(data).forEach(item => {
        const probSwitch = item.probabilitySwitch;
        if (groupedData[probSwitch]) {
            groupedData[probSwitch]++;
        } else {
            groupedData[probSwitch] = 1;
        }
    });

    // Dynamische Labels und Daten aus der Datenbank extrahieren
    const labels = Object.keys(groupedData).map(label => `${label}%`);
    const chartDataValues = Object.values(groupedData);

    // Chart-Konfiguration
    const chartData = {
        labels: labels, // Dynamische Labels
        datasets: [{
            label: 'Genannt von',
            data: chartDataValues, // Dynamische Werte
        }]
    };
    console.log(chartData);
    // If the chart already exists, update it
    if (myChart5) {
        myChart5.data = chartData;
        myChart5.update();
    } else {
        // Create the chart if it doesn't exist
        myChart5 = new Chart(ctx5, {
            type: 'pie',
            data: chartData
        });
    }
}, (error) => {
    console.error(error);
});
