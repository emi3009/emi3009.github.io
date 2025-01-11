import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

let playerChoice;
let carBehind;
let doors = [0, 1, 2];
let openedDoor;
let gameStarted = false;

// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyCNrsG76-QobHmbMMGkIc6HMcyx4YPGe3A",
  authDomain: "ziegenproblem.firebaseapp.com",
  projectId: "ziegenproblem",
  storageBucket: "ziegenproblem.firebasestorage.app",
  messagingSenderId: "646164011377",
  appId: "1:646164011377:web:1a1eefe3a5ba66cbc17ed0",
  measurementId: "G-KC7HS5JFMT"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

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

    document.getElementById('.probabilitySection').style.display = 'block';
  }, 1000);
}

function getOpenDoor() {
  let remainingDoors = doors.filter(door => door !== playerChoice && door !== carBehind);
  return remainingDoors[Math.floor(Math.random() * remainingDoors.length)];
}

function switchChoice() {
  let remainingDoors = doors.filter(door => door !== playerChoice && door !== openedDoor);
  playerChoice = remainingDoors[0];
  endGame(true);
}

function stayChoice() {
  endGame(false);
}

function endGame(didSwitch) {
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

  // Türen verschwinden lassen
  setTimeout(() => {
    document.querySelector('.doors').style.display = 'none';
    askProbability(didSwitch);
  }, 2000);
}

// Frage zur Wahrscheinlichkeit anzeigen
function askProbability(didSwitch) {
  const probabilitySection = document.getElementById('probabilitySection');
  const feedback = document.getElementById('probabilityFeedback');

  if (didSwitch) {
    document.getElementById('probabilityInput').placeholder = 'Wie hoch ist die Wahrscheinlichkeit beim Wechseln?';
  } else {
    document.getElementById('probabilityInput').placeholder = 'Wie hoch ist die Wahrscheinlichkeit beim Bleiben?';
  }

  probabilitySection.style.display = 'block';

  document.getElementById('submitProbability').onclick = async () => {
    const probabilityInput = document.getElementById('probabilityInput').value.trim();
    const fractionRegex = /^(\d+)\/(\d+)$/; // Format: Zähler/Nenner
    const match = probabilityInput.match(fractionRegex);

    if (!match) {
      feedback.innerText = "Bitte gib die Wahrscheinlichkeit in einem gültigen Bruchformat ein (z. B. 1/3 oder 2/3).";
      feedback.style.color = "red";
      return;
    }

    const numerator = parseInt(match[1], 10);
    const denominator = parseInt(match[2], 10);

    if (denominator === 0) {
      feedback.innerText = "Der Nenner darf nicht 0 sein.";
      feedback.style.color = "red";
      return;
    }

    const probability = numerator / denominator;

    if (probability < 0 || probability > 1) {
      feedback.innerText = "Die Wahrscheinlichkeit muss zwischen 0 und 1 liegen.";
      feedback.style.color = "red";
      return;
    }

    feedback.innerText = `Danke! Deine geschätzte Wahrscheinlichkeit von ${probabilityInput} (${probability.toFixed(2)}) wurde gespeichert.`;
    feedback.style.color = "green";

    // Wahrscheinlichkeit speichern
    const probabilityCollection = collection(db, 'probability_input');
    await addDoc(probabilityCollection, {
      didSwitch,
      probabilityFraction: probabilityInput,
      probabilityDecimal: probability,
      timestamp: serverTimestamp()
    });

    console.log("Wahrscheinlichkeit erfolgreich gespeichert!");
    probabilitySection.style.display = 'none';
  };
}

// Ergebnis in Firestore speichern
function saveResult(playerChoice, car, didSwitch) {
  const resultsCollection = collection(db, 'ziegen_problem');

  addDoc(resultsCollection, {
    playerChoice,
    carBehind: car,
    didSwitch,
    timestamp: serverTimestamp()
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

// Eventlistener für Buttons
document.getElementById('switchButton').addEventListener('click', switchChoice);
document.getElementById('stayButton').addEventListener('click', stayChoice);

function disableDoorClicks() {
  document.getElementById('door1').replaceWith(document.getElementById('door1').cloneNode(true));
  document.getElementById('door2').replaceWith(document.getElementById('door2').cloneNode(true));
  document.getElementById('door3').replaceWith(document.getElementById('door3').cloneNode(true));
}

