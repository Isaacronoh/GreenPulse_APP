// Load saved data from localStorage
let savedWeights = JSON.parse(localStorage.getItem("weightData")) || {
  labels: ["Week 1"],
  data: [72] // default starting weight
};
let weekCount = savedWeights.labels.length;

// Chart.js setup
const ctx = document.getElementById("weightChart").getContext("2d");
const weightData = {
  labels: savedWeights.labels,
  datasets: [{
    label: "Weight (kg)",
    data: savedWeights.data,
    borderColor: "red",
    backgroundColor: "rgba(10, 109, 60, 0.2)",
    borderWidth: 2,
    tension: 0.4,
    pointBackgroundColor: "black",
    pointRadius: 5
  }]
};
const weightChart = new Chart(ctx, {
  type: "line",
  data: weightData,
  options: { responsive: true }
});

// Add new weight dynamically
document.getElementById("addWeightBtn").addEventListener("click", () => {
  const weightInput = document.getElementById("weightValue").value;
  if (weightInput === "" || isNaN(weightInput)) {
    alert("Please enter a valid weight in kg!");
    return;
  }
  weekCount++;
  weightData.labels.push(`Week ${weekCount}`);
  weightData.datasets[0].data.push(parseFloat(weightInput));
  localStorage.setItem("weightData", JSON.stringify({
    labels: weightData.labels,
    data: weightData.datasets[0].data
  }));
  weightChart.update();
  document.getElementById("weightValue").value = "";
});

// Show daily calories in console (optional integration to chart later)
let dailyCalories = JSON.parse(localStorage.getItem("dailyCalories")) || 0;
console.log("Today's total calories:", dailyCalories);
function saveWeight(date, value){
    let weights = JSON.parse(localStorage.getItem("weights")) || [];
    weights.push({date, value});
    localStorage.setItem("weights", JSON.stringify(weights));
  }

  // Save meal entry
  function saveMeal(date, time, items, calories){
    let meals = JSON.parse(localStorage.getItem("meals")) || [];
    meals.push({date, time, items, calories});
    localStorage.setItem("meals", JSON.stringify(meals));
  }

 // script.js
// Save and load weight progress

