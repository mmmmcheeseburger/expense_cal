// script.js

// Data store (in memory + sync with localStorage)
let transactions = [];

// Select DOM elements
const form = document.getElementById("transaction-form");
const typeEl = document.getElementById("type");
const categoryEl = document.getElementById("category");
const amountEl = document.getElementById("amount");
const dateEl = document.getElementById("date");
const descriptionEl = document.getElementById("description");

const balanceDisplay = document.getElementById("balance-display");
const totalIncomeEl = document.getElementById("total-income");
const totalExpensesEl = document.getElementById("total-expenses");
const transactionList = document.getElementById("transaction-list");

const tipsEl = document.getElementById("tips");

let categoryChart;
let timeChart;

// Load from localStorage
function loadTransactions() {
  const data = localStorage.getItem("transactions");
  if (data) {
    transactions = JSON.parse(data);
  } else {
    transactions = [];
  }
}

// Save to localStorage
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add transaction
function addTransaction(e) {
  e.preventDefault();
  const type = typeEl.value;
  const category = categoryEl.value || "Other";
  const amount = parseFloat(amountEl.value);
  const date = dateEl.value;
  const description = descriptionEl.value;

  if (isNaN(amount) || amount <= 0 || !date) {
    alert("Please enter valid amount and date");
    return;
  }

  const id = Date.now();
  transactions.push({ id, type, category, amount, date, description });
  saveTransactions();
  updateUI();
  form.reset();
}

// Remove transaction
function removeTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  saveTransactions();
  updateUI();
}

// Summaries
function calculateTotals() {
  let income = 0,
    expenses = 0;
  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expenses += t.amount;
  });
  return { income, expenses, balance: income - expenses };
}

// Generate tips
function generateTips(totals) {
  let advice = "";
  if (totals.expenses > totals.income) {
    advice +=
      "You are spending more than you earn. Try cutting back in some categories. ";
  } else {
    advice += "Good job! You are spending less than or equal to your income. ";
  }

  // Check largest expense category
  const catTotals = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
    }
  });
  const sortedCats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
  if (sortedCats.length > 0) {
    const [topCat, topAmt] = sortedCats[0];
    advice += `You spend most on ${topCat} (${topAmt.toFixed(
      2
    )}). Maybe try setting a budget for it.`;
  }
  return advice;
}

// Draw charts
function drawCharts() {
  // Category Chart (bar)
  const expenseCats = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      expenseCats[t.category] = (expenseCats[t.category] || 0) + t.amount;
    }
  });
  const catLabels = Object.keys(expenseCats);
  const catValues = Object.values(expenseCats);

  if (categoryChart) categoryChart.destroy();
  const ctx1 = document.getElementById("categoryChart").getContext("2d");
  categoryChart = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: catLabels,
      datasets: [
        {
          label: "Expenses by Category",
          data: catValues,
          backgroundColor: "rgba(255,99,132,0.5)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      animation: { duration: 1000 },
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });

  // Time Chart (line) - show expenses over time by date
  // Group by date (could adapt to week or month)
  const dateMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      const d = t.date;
      dateMap[d] = (dateMap[d] || 0) + t.amount;
    }
  });
  const sortedDates = Object.keys(dateMap).sort();
  const dateValues = sortedDates.map((d) => dateMap[d]);

  if (timeChart) timeChart.destroy();
  const ctx2 = document.getElementById("timeChart").getContext("2d");
  timeChart = new Chart(ctx2, {
    type: "line",
    data: {
      labels: sortedDates,
      datasets: [
        {
          label: "Expenses Over Time",
          data: dateValues,
          backgroundColor: "rgba(54,162,235,0.2)",
          borderColor: "rgba(54,162,235,1)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      animation: { duration: 1000 },
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}

// Render transactions list
function renderTransactions() {
  transactionList.innerHTML = "";
  transactions.forEach((t) => {
    const li = document.createElement("li");
    li.classList.add("transaction-type-" + t.type);
    li.innerHTML = `
      <div>
        <strong>${t.category}</strong> - ${t.description ? t.description : ""}
      </div>
      <div>
        ${t.date} — ${t.type === "income" ? "+" : "-"} $${t.amount.toFixed(2)}
        <button class="del-btn" data-id="${t.id}">Delete</button>
      </div>
    `;
    transactionList.appendChild(li);
  });

  // Add delete event listeners
  document.querySelectorAll(".del-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      removeTransaction(id);
    });
  });
}

// Update the UI: summary, charts, tips, list, balance
function updateUI() {
  loadTransactions();
  const totals = calculateTotals();
  balanceDisplay.textContent = `Balance: $${totals.balance.toFixed(2)}`;
  totalIncomeEl.textContent = `$${totals.income.toFixed(2)}`;
  totalExpensesEl.textContent = `$${totals.expenses.toFixed(2)}`;
  renderTransactions();
  drawCharts();
  const advice = generateTips(totals);
  tipsEl.textContent = advice;

  // Color change for negative balance
  if (totals.balance < 0) {
    balanceDisplay.style.color = "red";
  } else {
    balanceDisplay.style.color = "green";
  }
}

// Init
function init() {
  loadTransactions();
  updateUI();
  form.addEventListener("submit", addTransaction);
}

init();
