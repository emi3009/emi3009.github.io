// Funktion zum Simulieren des Ziegenproblems
function ziegenProblem(playerChoice) {
  const doors = [0, 1, 2];
  const car = Math.floor(Math.random() * 3); // Auto hinter einer zufälligen Tür
  const result = playerChoice === car ? "Du hast das Auto gefunden!" : "Leider eine Ziege hinter der Tür.";

  // Ergebnis anzeigen
  document.getElementById('result').innerText = `Du hast Tür ${playerChoice + 1} gewählt. ${result}`;

  // Speichern des Ergebnisses im localStorage
  saveResult(playerChoice, car);
}

// Funktion zum Speichern der Ergebnisse im localStorage
function saveResult(playerChoice, car) {
  // Hole die bestehenden Ergebnisse aus dem localStorage
  let results = JSON.parse(localStorage.getItem("results")) || [];

  // Speichern des aktuellen Ergebnisses
  results.push({ playerChoice: playerChoice, carBehind: car, timestamp: new Date() });

  // Speichern die Ergebnisse wieder im localStorage
  localStorage.setItem("results", JSON.stringify(results));
}

// Ergebnisse anzeigen
function showResults() {
  const results = JSON.parse(localStorage.getItem("results")) || [];
  const resultsList = document.getElementById('resultsList');
  
  // Die Liste der Ergebnisse anzeigen
  resultsList.innerHTML = '';
  results.forEach((result, index) => {
    const li = document.createElement('li');
    li.textContent = `Experiment ${index + 1}: Du hast Tür ${result.playerChoice + 1} gewählt, Auto war hinter Tür ${result.carBehind + 1}.`;
    resultsList.appendChild(li);
  });

  // Ergebnisse anzeigen
  document.getElementById('resultsSection').style.display = 'block';
}

// Eventlistener für die Tür-Auswahl
document.getElementById('door1').addEventListener('click', () => ziegenProblem(0));
document.getElementById('door2').addEventListener('click', () => ziegenProblem(1));
document.getElementById('door3').addEventListener('click', () => ziegenProblem(2));

// Eventlistener für den "Ergebnisse anzeigen"-Button
document.getElementById('showResults').addEventListener('click', showResults);
