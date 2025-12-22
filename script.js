let contestants = [];
let judgeCount = 3;

function addJudge() {
  judgeCount++;
  const container = document.getElementById("judgesContainer");
  const newInput = document.createElement("input");
  newInput.id = `s${judgeCount}`;
  newInput.type = "number";
  newInput.placeholder = `J${judgeCount} Score`; // Shorter placeholder to save space
  container.appendChild(newInput);
}

function addContestant() {
  const nameInput = document.getElementById("name");
  const name = nameInput.value;
  if (!name) return alert("Enter a name!");

  let total = 0;
  for (let i = 1; i <= judgeCount; i++) {
    total += Number(document.getElementById(`s${i}`).value || 0);
  }

  const average = (total / judgeCount).toFixed(2);
  contestants.push({ name, total, average });

  // Clear inputs
  nameInput.value = "";
  for (let i = 1; i <= judgeCount; i++) {
    document.getElementById(`s${i}`).value = "";
  }

  rankContestants();
}

function rankContestants() {
  contestants.sort((a, b) => b.total - a.total);
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  contestants.forEach((c, index) => {
    tbody.innerHTML += `<tr>
      <td>${index + 1}</td>
      <td>${c.name}</td>
      <td>${c.total}</td>
      <td>${c.average}</td>
    </tr>`;
  });

  document.getElementById("highest").innerText = "Highest: " + contestants[0].name;
  document.getElementById("lowest").innerText = "Lowest: " + contestants[contestants.length - 1].name;
}
