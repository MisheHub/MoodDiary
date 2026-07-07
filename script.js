const moodForm = document.getElementById("moodForm");
const moodSelect = document.getElementById("moodSelect");
const noteInput = document.getElementById("note");
const moodList = document.getElementById("moodList");

let moods = [
  { date: "01/07/2026", mood: "Среќен", note: "си уживам на викендица и работам на проектот" },
  { date: "02/07/2026", mood: "Тажен", note: "се чувствувам малку уморно" },
  { date: "03/07/2026", mood: "Енергичен", note: "имам многу мотивација денес" }
];


localStorage.setItem("moods", JSON.stringify(moods));

moodForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const mood = moodSelect.value;
  const note = noteInput.value;

  
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const date = `${day}/${month}/${year}`;

  moods.push({ date, mood, note });
  localStorage.setItem("moods", JSON.stringify(moods));
  noteInput.value = "";
  renderList();
  updateChart();
});

function renderList() {
  moodList.innerHTML = "";
  moods.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.date} - ${entry.mood} (${entry.note})`;
    moodList.appendChild(li);
  });
}

function updateChart() {
  const ctx = document.getElementById("moodChart").getContext("2d");
  const moodCounts = {};
  moods.forEach(entry => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(moodCounts),
      datasets: [{
        label: "Број на денови",
        data: Object.values(moodCounts),
        backgroundColor: [
          "rgba(76, 175, 80, 0.6)",   
          "rgba(244, 67, 54, 0.6)",   
          "rgba(255, 152, 0, 0.6)",   
          "rgba(33, 150, 243, 0.6)"   
        ],
        borderColor: [
          "rgba(76, 175, 80, 0.8)",
          "rgba(244, 67, 54, 0.8)",
          "rgba(255, 152, 0, 0.8)",
          "rgba(33, 150, 243, 0.8)"
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(76, 175, 80, 0.9)",   
          "rgba(244, 67, 54, 0.9)",   
          "rgba(255, 152, 0, 0.9)",   
          "rgba(33, 150, 243, 0.9)"   
        ]
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

renderList();
updateChart();
