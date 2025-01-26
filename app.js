import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


let playerChoice;
let carBehind;
let doors = [0, 1, 2];
let openedDoor;
let gameStarted = false;
let didSwitch;
let probabilityStay;
let probabilitySwitch;

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
// Get a reference to the Realtime Database
const database = getDatabase(app);

// Spiel starten
async function ziegenProblem(playerChoiceInitial) {
  if (gameStarted) return; // Mehrfachstart verhindern
  gameStarted = true;

  playerChoice = playerChoiceInitial;
  carBehind = Math.floor(Math.random() * 3);
  openedDoor = getOpenDoor();

  disableDoorClicks();

  document.getElementById('result').innerText = `Du hast Tür ${playerChoice + 1} gewählt.`;

  document.querySelectorAll('.door').forEach((doorElement, index) => {
    const img = doorElement.querySelector('.door-img');
    if (index === playerChoice) {
      doorElement.classList.add('selected');
    }
  });

  setTimeout(() => {
    document.querySelectorAll('.door').forEach((doorElement, index) => {
      const img = doorElement.querySelector('.door-img');
      if (index === openedDoor) {
        img.src = 'goat.png';
      }
    });

    document.getElementById('switchSection').style.display = 'block';
  }, 400);
}

function submitSwitchEstimation() {
  // store result
  probabilitySwitch = Number(document.getElementById('probabilitySwitchInput').value);
  document.getElementById('probabilitySectionSwitch').style.display = 'none';
  document.getElementById('probabilitySectionStay').style.display = 'block';
}

function submitStayEstimation() {
  // store result
  probabilitySwitch = Number(document.getElementById('probabilityStayInput').value);
  document.getElementById('probabilitySectionStay').style.display = 'none';
  endGame();
}

function getOpenDoor() {
  let remainingDoors = doors.filter(door => door !== playerChoice && door !== carBehind);
  return remainingDoors[Math.floor(Math.random() * remainingDoors.length)];
}

function switchChoice() {
  let remainingDoors = doors.filter(door => door !== playerChoice && door !== openedDoor);
  playerChoice = remainingDoors[0];
  document.getElementById('probabilitySectionSwitch').style.display = 'block';
  document.getElementById('switchSection').style.display = 'none';
  didSwitch = true;
}

function stayChoice() {
  didSwitch = false;
  document.getElementById('probabilitySectionSwitch').style.display = 'block';
  document.getElementById('switchSection').style.display = 'none';
}

function endGame() {
  document.querySelectorAll('.door').forEach((doorElement, index) => {
    if (index !== playerChoice) {
      doorElement.classList.remove('selected');
    } else {
      doorElement.classList.add('selected');
    }
  });

  let result;
  if (playerChoice === carBehind) {
    result = "Du hast das Auto gefunden!";
    document.querySelectorAll('.door').forEach((doorElement, index) => {
      if (index === playerChoice) {
        const img = doorElement.querySelector('.door-img');
        img.src = 'car.jpg';
      }
    });
  } else {
    result = "Leider eine Ziege hinter der Tür.";
    document.querySelectorAll('.door').forEach((doorElement, index) => {
      if (index === playerChoice) {
        const img = doorElement.querySelector('.door-img');
        img.src = 'goat.png';
      }
    });
  }

  document.getElementById('result').innerText = `Du hast Tür ${playerChoice + 1} gewählt. ${result}`;
  saveResult(playerChoice, carBehind, didSwitch);
}

// Ergebnis in Firestore speichern
function saveResult(playerChoice, car, didSwitch) {
  const resultRef = ref(database, 'ziegen_problem');

  push(resultRef, {
    playerChoice,
    carBehind,
    didSwitch,
    probabilitySwitch,
    probabilityStay,
    timestamp: Date.now()
  })
    .then(() => {
      console.log("Result saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving result: ", error);
    });
}

// Eventlistener für Türen
document.getElementById('door1').addEventListener('click', () => ziegenProblem(0));
document.getElementById('door2').addEventListener('click', () => ziegenProblem(1));
document.getElementById('door3').addEventListener('click', () => ziegenProblem(2));

// Switch or Stay estimations buttons
document.getElementById('submitProbabilitySwitch').addEventListener('click', submitSwitchEstimation);
document.getElementById('submitProbabilityStay').addEventListener('click', submitStayEstimation);

// Eventlistener für Buttons
document.getElementById('switchButton').addEventListener('click', switchChoice);
document.getElementById('stayButton').addEventListener('click', stayChoice);

function disableDoorClicks() {
  document.getElementById('door1').replaceWith(document.getElementById('door1').cloneNode(true));
  document.getElementById('door2').replaceWith(document.getElementById('door2').cloneNode(true));
  document.getElementById('door3').replaceWith(document.getElementById('door3').cloneNode(true));
}

