let playerChoice;
let carBehind;
let doors = [0, 1, 2]; // Die Türen 0, 1, 2 (Tür 1, Tür 2, Tür 3)
let openedDoor; // Die geöffnete Tür des Moderators

// Funktion zum Simulieren des Ziegenproblems
function ziegenProblem(playerChoiceInitial) {
  playerChoice = playerChoiceInitial; // Der Spieler wählt eine Tür
  carBehind = Math.floor(Math.random() * 3); // Zufällig das Auto hinter einer Tür platzieren
  openedDoor = getOpenDoor(); // Der Moderator öffnet eine Tür mit einer Ziege

  // Zeige dem Spieler, welche Tür er gewählt hat
  document.getElementById('result').innerText = `Du hast Tür ${playerChoice + 1} gewählt.`;

  // Türbilder aktualisieren
  document.querySelectorAll('.door').forEach((doorElement, index) => {
    const img = doorElement.querySelector('.door-img');
    if (index === playerChoice) {
      img.src = 'door_opened.png'; // Tür, die der Spieler gewählt hat
      doorElement.classList.add('selected'); // Vergrößere die gewählte Tür
    } else if (index === openedDoor) {
      img.src = 'goat.png'; // Tür, die der Moderator geöffnet hat
      doorElement.innerHTML += '<img src="goat.png" alt="Ziege" class="goat-img">'; // Zeige Ziege hinter der Tür
    } else {
      img.src = 'door_closed.png'; // Alle anderen Türen bleiben geschlossen
    }
  });

  // Zeige die Buttons "Wechseln" oder "Bleiben"
  document.getElementById('switchSection').style.display = 'block';
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

  // Markiere die finale Wahl
  markFinalChoice(playerChoice);

  endGame();
}

// Wenn der Spieler bei seiner Wahl bleibt
function stayChoice() {
  // Markiere die finale Wahl
  markFinalChoice(playerChoice);

  endGame();
}

// Funktion zum Markieren der finalen Wahl
function markFinalChoice(finalChoice) {
  // Alle Türen zurücksetzen
  document.querySelectorAll('.door').forEach(door => {
    door.classList.remove('selected', 'finalChoice'); // Entferne die Klassen
  });

  // Markiere die finale Tür
  const finalDoor = document.querySelectorAll('.door')[finalChoice];
  finalDoor.classList.add('finalChoice'); // Markiere die endgültige Wahl
}

// Ergebnis nach dem Spiel
function endGame() {
  const result = playerChoice === carBehind ? "Du hast das Auto gefunden!" : "Leider eine Ziege hinter der Tür.";
  document.getElementById('result').innerText = `Du hast Tür ${playerChoice + 1} gewählt. ${result}`;

  // Speichern des Ergebnisses im localStorage
  saveResult(playerChoice, carBehind);
  document.getElementById('switchSection').style.display = 'none';
}

// Funktion zum Speichern der Ergebnisse im localStorage
function saveResult(playerChoice, car) {
  let results = JSON.parse(localStorage.getItem("results")) || [];
  results.push({ playerChoice, carBehind: car, timestamp: new Date() });
  localStorage.setItem("results", JSON.stringify(results));
}

// Ergebnisse anzeigen
function showResults() {
  const results = JSON.parse(localStorage.getItem("results")) || [];
  const resultsList = document.getElementById('resultsList');
  resultsList.innerHTML = '';
  results.forEach((result, index) => {
    const li = document.createElement('li');
    li.textContent = `Experiment ${index + 1}: Du hast Tür ${result.playerChoice + 1} gewählt und das Auto war hinter Tür ${result.carBehind + 1}.`;
    resultsList.appendChild(li);
  });
}

// Funktion zur Initialisierung des Spiels
function startGame() {
  document.querySelectorAll('.door').forEach(door => {
    door.classList.remove('hovered', 'selected', 'finalChoice'); // Setze alles zurück
    door.innerHTML = '<img src="door_closed.png" alt="Geschlossene Tür" class="door-img">'; // Setze das Türbild zurück
  });

  document.getElementById('result').innerText = ''; // Setze die Ergebnisse zurück
  document.getElementById('switchSection').style.display = 'none'; // Verstecke die Buttons
  document.getElementById('resultsSection').style.display = 'none'; // Verstecke Ergebnisse
}
