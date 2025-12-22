let contestants = [];
let judgeCount = 3; // Starts at 3 because of your HTML

// Function to add a new input box for another judge
function addJudge() {
  judgeCount++;
  const container = document.getElementById("judgesContainer");
  
  // Create the new input element
  const newInput = document.createElement("input");
  newInput.id = `s${judgeCount}`;
  newInput.type = "number";
  newInput.placeholder = `Judge ${judgeCount} Score`;
  
  // Add it to the screen
  container.appendChild(newInput);
}

function addContestant() {
  const name = document.getElementById("name").value;
  if (!name) {
    alert("Please enter a contestant name");
    return;
  }

  let total = 0;
  
  // Loop through all judge inputs dynamically
  for (let i = 1; i <= judgeCount; i++) {
    const score = Number(document.getElementById(`s${i}`).value);
    total += score;
  }

  const average = (total / judgeCount).toFixed(2);

  contestants.push({ name, total, average });

  // Clear inputs for the next entry
  document.getElementById("name").value = "";
  for (let i = 1; i <= judgeCount; i++) {
    document.getElementById(`s${i}`).value = "";
  }

  rankContestants();
}

function rankContestants() {
  if (contestants.length === 0) return;

  contestants.sort((a, b) => b.total - a.total);

  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  contestants.forEach((c, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${c.name}</td>
        <td>${c.total}</td>
        <td>${c.average}</td>
      </tr>
    `;
  });

  document.getElementById("highest").innerText =
    "Highest Performer: " + contestants[0].name;

  document.getElementById("lowest").innerText =
    "Lowest Performer: " + contestants[contestants.length - 1].name;
}
