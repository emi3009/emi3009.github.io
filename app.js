import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


let playerChoice;
let carBehind;
let doors = [0, 1, 2]; // Die Türen 0, 1, 2 (Tür 1, Tür 2, Tür 3)
let openedDoor; // Die geöffnete Tür des Moderators
let gameStarted = false; // Spielstatus: Wurde eine Tür bereits ausgewählt?

// Funktion zum Simulieren des Ziegenproblems
async function ziegenProblem(playerChoiceInitial) {
  playerChoice = playerChoiceInitial; // Der Spieler wählt eine Tür
  carBehind = Math.floor(Math.random() * 3); // Zufällig das Auto hinter einer Tür platzieren
  openedDoor = getOpenDoor(); // Der Moderator öffnet eine Tür mit einer Ziege

  disableDoorClicks();
  
  // Zeige dem Spieler, welche Tür er gewählt hat
  document.getElementById('result').innerText = `Du hast Tür ${playerChoice + 1} gewählt.`;

  // Türbilder aktualisieren
  document.querySelectorAll('.door').forEach((doorElement, index) => {
    const img = doorElement.querySelector('.door-img');
    if (index === playerChoice) {
       doorElement.classList.add('selected');
      //img.src = 'door_selected.png'; // Tür, die der Spieler gewählt hat
    }
  });

  setTimeout(function() {
    document.querySelectorAll('.door').forEach((doorElement, index) => {
    const img = doorElement.querySelector('.door-img');
    if (index === openedDoor) {
      img.src = 'goat.png'; // Tür, die der Moderator geöffnet hat
    }
  });

  // Zeige die Buttons "Wechseln" oder "Bleiben"
  document.getElementById('switchSection').style.display = 'block';
  }, 1000);  // 1000 Millisekunden = 1 Sekunde
}

// Funktion zum Bestimmen, welche Tür der Moderator öffnet
function getOpenDoor() {
  let remainingDoors = doors.filter(door => door !== playerChoice && door !== carBehind);
  return remainingDoors[Math.floor(Math.random() * remainingDoors.length)]; // Eine der verbleibenden Türen mit Ziege
}

// Wenn der Spieler wechselt, ändert sich seine Wahl
function switchChoice() {
  let remainingDoors = doors.filter(door => door !== playerChoice && door !== openedDoor);
  playerChoice = remainingDoors[0]; // Wechseln zu der verbleibenden Tür
  endGame();
}

// Wenn der Spieler bei seiner Wahl bleibt
function stayChoice() {
  endGame();
}

// Ergebnis nach dem Spiel
function endGame() {
  document.querySelectorAll('.door').forEach((doorElement, index) => {
    if (index !== playerChoice) {
       doorElement.classList.remove('selected');
    } else {
      doorElement.classList.add('selected');
    }
  });
  
  let result;
  if(playerChoice === carBehind) {
    result = "Du hast das Auto gefunden!";
    document.querySelectorAll('.door').forEach((doorElement, index) => {
      if (index === playerChoice) {
        const img = doorElement.querySelector('.door-img');
        img.src = 'car.jpg'; 
      }
    });
  } else {
    result =  "Leider eine Ziege hinter der Tür.";
    document.querySelectorAll('.door').forEach((doorElement, index) => {
      if (index === playerChoice) {
        const img = doorElement.querySelector('.door-img');
        img.src = 'goat.png'; 
      }
    });
  }
  document.getElementById('result').innerText = `Du hast Tür ${playerChoice + 1} gewählt. ${result}`;

  // Speichern des Ergebnisses im localStorage
  saveResult(playerChoice, carBehind);
  document.getElementById('switchSection').style.display = 'none';
  document.getElementById('montyOpenedDoor').style.display = 'none';
  document.getElementById('goatImage').style.display = 'none';
}

// Funktion zum Speichern der Ergebnisse im localStorage
function saveResult(playerChoice, car) {
  const resultsCollection = db.collection('ziegen_problem');

  // Store the result
  resultsCollection.add({
    playerChoice,
    carBehind,
    didSwitch,
    timestamp: firebase.firestore.FieldValue.serverTimestamp() // Save the timestamp automatically
  })
  .then(() => {
    console.log("Result saved successfully!");
  })
  .catch((error) => {
    console.error("Error saving result: ", error);
  });
}

// Functions for door EventListeners
const door1Handler = () => ziegenProblem(0);
const door2Handler = () => ziegenProblem(1);
const door3Handler = () => ziegenProblem(2);

// Eventlistener für die Tür-Auswahl
document.getElementById('door1').addEventListener('click', door1Handler);
document.getElementById('door2').addEventListener('click', door2Handler);
document.getElementById('door3').addEventListener('click', door3Handler);

// Eventlistener für die Buttons "Wechseln" und "Bleiben"
document.getElementById('switchButton').addEventListener('click', switchChoice);
document.getElementById('stayButton').addEventListener('click', stayChoice);

const firebaseConfig = {
    apiKey: "AIzaSyCNrsG76-QobHmbMMGkIc6HMcyx4YPGe3A",
    authDomain: "ziegenproblem.firebaseapp.com",
    projectId: "ziegenproblem",
    storageBucket: "ziegenproblem.firebasestorage.app",
    messagingSenderId: "646164011377",
    appId: "1:646164011377:web:1a1eefe3a5ba66cbc17ed0",
    measurementId: "G-KC7HS5JFMT"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

function resetGame() {
  gameStarted = false; // Erlaubt wieder das Klicken auf Türen
  document.getElementById('switchSection').style.display = 'none';
  document.querySelectorAll('.door').forEach((doorElement, index) => {
    const img = doorElement.querySelector('.door-img');
    img.src = 'door_closed.png'; // Zurücksetzen des Türbildes
    doorElement.classList.remove('selected');
  });
  document.getElementById('result').innerText = ''; // Zurücksetzen des Ergebnisses
}

// Disable Event Listeners on Doors
function disableDoorClicks() {
  document.getElementById('door1').removeEventListener('click', door1Handler);
  document.getElementById('door2').removeEventListener('click', door2Handler);
  document.getElementById('door3').removeEventListener('click', door3Handler);
}
