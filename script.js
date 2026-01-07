let contestants = [];

function addContestant() {
  const nameEl = document.getElementById("name");
  const s1 = Number(document.getElementById("s1").value);
  const s2 = Number(document.getElementById("s2").value);
  const s3 = Number(document.getElementById("s3").value);
  const name = nameEl.value.trim();

  if (name === "" || isNaN(s1) || isNaN(s2) || isNaN(s3)) {
    alert("Palihog kompletoha ang data.");
    return;
  }

  const contestant = {
    id: Date.now(),
    name,
    score1: s1,
    score2: s2,
    score3: s3,
    total: s1 + s2 + s3,
    average: ((s1 + s2 + s3) / 3).toFixed(2)
  };

  contestants.push(contestant);
  renderTable();

  nameEl.value = "";
  document.getElementById("s1").value = "";
  document.getElementById("s2").value = "";
  document.getElementById("s3").value = "";
  nameEl.focus();
}

function renderTable() {
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
        <td>
          <button class="edit-btn" onclick="editScores(${c.id})">Edit</button>
        </td>
      </tr>
    `;
  });
  updateHighlights();
}

function editScores(id) {
  const person = contestants.find(c => c.id === id);
  if (person) {
    const newS1 = parseFloat(prompt(`Judge 1 Score:`, person.score1));
    const newS2 = parseFloat(prompt(`Judge 2 Score:`, person.score2));
    const newS3 = parseFloat(prompt(`Judge 3 Score:`, person.score3));

    if (!isNaN(newS1) && !isNaN(newS2) && !isNaN(newS3)) {
      person.score1 = newS1;
      person.score2 = newS2;
      person.score3 = newS3;
      person.total = newS1 + newS2 + newS3;
      person.average = (person.total / 3).toFixed(2);
      renderTable();
    }
  }
}

function updateHighlights() {
  if (contestants.length > 0) {
    document.getElementById("highest").innerText = "🏆 Leading: " + contestants[0].name;
    document.getElementById("lowest").innerText = "Trailing: " + contestants[contestants.length - 1].name;
  }
}
