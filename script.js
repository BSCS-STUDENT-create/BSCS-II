let contestants = [];
function addContestant() {
  const name = document.getElementById("name").value;
  const s1 = Number(document.getElementById("s1").value);
  const s2 = Number(document.getElementById("s2").value);
  const s3 = Number(document.getElementById("s3").value);

  const total = s1 + s2 + s3;
  const average = (total / 3).toFixed(2);

  contestants.push({ name, total, average });

  rankContestants();
}

function rankContestants() {
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
