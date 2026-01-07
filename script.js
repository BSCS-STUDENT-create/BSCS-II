// Security Configuration
const SECRET_PIN = "123456789";

function checkPin() {
    const userInput = document.getElementById("pinInput").value;
    const overlay = document.getElementById("pinOverlay");
    const main = document.getElementById("mainContent");
    const errorMsg = document.getElementById("pinError");

    if (userInput === SECRET_PIN) {
        overlay.style.display = "none";
        main.style.display = "flex";
    } else {
        errorMsg.style.display = "block";
        document.getElementById("pinInput").value = "";
        // Autofocus back to input
        document.getElementById("pinInput").focus();
    }
}

// Tabulation Logic
let contestants = [];
let judgeCount = 3;

function addJudgeField() {
    judgeCount++;
    const container = document.getElementById("judgesContainer");
    const newInput = document.createElement("input");
    newInput.type = "number";
    newInput.className = "judge-score";
    newInput.placeholder = `Judge ${judgeCount}`;
    container.appendChild(newInput);
}

function addContestant() {
    const nameEl = document.getElementById("name");
    const name = nameEl.value.trim();
    const scoreInputs = document.querySelectorAll(".judge-score");
    
    let scores = [];
    let total = 0;
    let isInvalid = false;

    scoreInputs.forEach(input => {
        const val = parseFloat(input.value);
        if (input.value === "" || isNaN(val)) isInvalid = true;
        scores.push(val);
        total += val;
    });

    if (name === "" || isInvalid) {
        alert("Palihog kompletoha ang Ngalan ug tanang Scores!");
        return;
    }

    const contestant = {
        id: Date.now(),
        name: name,
        scores: scores,
        total: total,
        average: (total / scores.length).toFixed(2)
    };

    contestants.push(contestant);
    renderTable();

    // Reset fields
    nameEl.value = "";
    scoreInputs.forEach(input => input.value = "");
    nameEl.focus();
}

function renderTable() {
    // Sort highest to lowest score
    contestants.sort((a, b) => b.total - a.total);
    
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = contestants.map((c, index) => `
        <tr>
            <td style="font-weight: bold; color: #ffd700;">${index + 1}</td>
            <td style="text-align: left;">${c.name}</td>
            <td>${c.total.toFixed(2)}</td>
            <td>${c.average}</td>
            <td>
                <button class="edit-btn" onclick="editScores(${c.id})">Edit Scores</button>
            </td>
        </tr>
    `).join("");
    
    updateHighlights();
}

function editScores(id) {
    const person = contestants.find(c => c.id === id);
    if (person) {
        let newScores = [];
        let newTotal = 0;

        for (let i = 0; i < person.scores.length; i++) {
            let input = prompt(`Updating ${person.name}\nScore for Judge ${i+1}:`, person.scores[i]);
            
            if (input === null) return; // Cancel edit

            let val = parseFloat(input);
            if (!isNaN(val)) {
                newScores.push(val);
                newTotal += val;
            } else {
                alert("Invalid input! Please enter a number.");
                return;
            }
        }

        person.scores = newScores;
        person.total = newTotal;
        person.average = (newTotal / newScores.length).toFixed(2);
        renderTable();
    }
}

function updateHighlights() {
    const highEl = document.getElementById("highest");
    const lowEl = document.getElementById("lowest");

    if (contestants.length > 0) {
        highEl.innerHTML = `🏆 Leading: ${contestants[0].name} (Total: ${contestants[0].total.toFixed(2)})`;
        lowEl.innerText = `Trailing: ${contestants[contestants.length - 1].name}`;
    } else {
        highEl.innerHTML = "";
        lowEl.innerText = "";
    }
}

// Allow "Enter" key for PIN access
document.getElementById("pinInput")?.addEventListener("keypress", function(e) {
    if (e.key === "Enter") checkPin();
});
