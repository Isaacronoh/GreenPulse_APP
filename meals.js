// meals.js
// Calories database (simple example)
const caloriesDB = {
  Egg: 78,
  Chapati: 200,
  Tea: 30,
  Rice: 206,
  Beans: 150,
  Chicken: 250,
  Fish: 220,
  Vegetables: 50,
  Soda: 140,
  Bread: 80
};

let selectedFoods = [];
let totalCalories = 0;

document.getElementById("addFoodBtn").addEventListener("click", () => {
  const food = document.getElementById("foodInput").value;
  selectedFoods.push(food);

  // Update list
  const li = document.createElement("li");
  li.textContent = food;
  document.getElementById("foodList").appendChild(li);

  // Update calories
  totalCalories += caloriesDB[food] || 0;
  document.getElementById("totalCalories").textContent = totalCalories;

  // Suggest exercise (simple logic)
  let exercise = "";
  if (totalCalories < 200) exercise = "Light jogging (15 min)";
  else if (totalCalories < 400) exercise = "30 push-ups + 20 min running";
  else exercise = "Intense workout (45 min cardio + weights)";
  document.getElementById("exercise").textContent = exercise;
});

// Save meal
document.getElementById("finishMealBtn").addEventListener("click", () => {
  const mealType = document.getElementById("mealType").value;
  const today = new Date().toLocaleDateString();

  const meal = {
    date: today,
    time: mealType,
    items: selectedFoods.join(", "),
    calories: totalCalories
  };

  // Save to localStorage
  let meals = JSON.parse(localStorage.getItem("meals")) || [];
  meals.push(meal);
  localStorage.setItem("meals", JSON.stringify(meals));

  // Reset
  alert("Meal saved!");
  document.getElementById("foodList").innerHTML = "";
  document.getElementById("totalCalories").textContent = 0;
  document.getElementById("exercise").textContent = "";
  selectedFoods = [];
  totalCalories = 0;
});
