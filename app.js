// Firebase-Konfiguration (ersetze mit deinen Firebase-Daten)
const firebaseConfig = {
  apiKey: "DEIN_API_KEY",
  authDomain: "DEIN_PROJECT_ID.firebaseapp.com",
  projectId: "DEIN_PROJECT_ID",
  storageBucket: "DEIN_PROJECT_ID.appspot.com",
  messagingSenderId: "DEIN_MESSAGING_SENDER_ID",
  appId: "DEIN_APP_ID",
  measurementId: "DEIN_MEASUREMENT_ID"
};

// Firebase initialisieren
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Funktion zum Simulieren des Ziegenproblems
function ziegenProblem(playerChoice) {
  const doors = [0, 1, 2];
  const car = Math.floor(Math.random() * 3); // Auto hinter einer zufälligen Tür
  const result = playerChoice === car ? "Du hast das Auto gefunden!" : "Leider eine Ziege hinter der Tür.";

  // Ergebnis anzeigen
  document.getElementById('result').innerText = `Du hast Tür ${playerChoice + 1} gewählt. ${result}`;

  // Daten in Firebase speichern
  saveResult(playerChoice, car);
}

// Funktion zum Speichern der Ergebnisse in Firestore
function saveResult(playerChoice, car) {
  // Speichern der Daten in Firestore
  db.collection("experiments").add({
    playerChoice: playerChoice,
    carBehind: car,
    timestamp: new Date()
  })
  .then(() => {
    console.log("Ergebnis erfolgreich gespeichert!");
  })
  .catch((error) => {
    console.error("Fehler beim Speichern der Daten: ", error);
  });
}

// Eventlistener für die Tür-Auswahl
document.getElementById('door1').addEventListener('click', () => ziegenProblem(0));
document.getElementById('door2').addEventListener('click', () => ziegenProblem(1));
document.getElementById('door3').addEventListener('click', () => ziegenProblem(2));
