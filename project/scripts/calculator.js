/* ---------- Data ---------- */
const expenseCategories = [
  { key: "housing", label: "Housing" },
  { key: "transportation", label: "Transportation" },
  { key: "food", label: "Food" },
  { key: "savings", label: "Savings" },
  { key: "other", label: "Other" },
];

const storageKey = "firstPaycheckBudget";
const countKey = "firstPaycheckCalcCount";

/* ---------- DOM References ---------- */
const budgetForm = document.getElementById("budget-form");
const incomeInput = document.getElementById("income");
const resultFigure = document.getElementById("result-figure");
const resultMessage = document.getElementById("result-message");
const breakdownList = document.getElementById("breakdown-list");
const calcMeta = document.getElementById("calc-meta");

/* ---------- Helpers ---------- */
function currency(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function readBudgetFromForm() {
  const budget = { income: Number(incomeInput.value) || 0 };

  expenseCategories.forEach((category) => {
    const field = document.getElementById(category.key);
    budget[category.key] = Number(field.value) || 0;
  });

  return budget;
}

function fillFormFromBudget(budget) {
  incomeInput.value = budget.income;

  expenseCategories.forEach((category) => {
    const field = document.getElementById(category.key);
    field.value = budget[category.key];
  });
}

/* ---------- Render ---------- */
function renderBreakdown(budget) {
  const rows = expenseCategories
    .map((category) => {
      const amount = budget[category.key];
      const pct = budget.income > 0 ? Math.min((amount / budget.income) * 100, 100) : 0;
      return `<li>
        <div class="breakdown-row"><span>${category.label}</span><span>${currency(amount)}</span></div>
        <div class="bar-track"><div class="bar-fill" data-pct="${pct}"></div></div>
      </li>`;
    })
    .join("");

  breakdownList.innerHTML = rows;

  /* Animate bars in on the next frame so the width transition actually plays */
  requestAnimationFrame(() => {
    breakdownList.querySelectorAll(".bar-fill").forEach((bar) => {
      bar.style.width = `${bar.dataset.pct}%`;
    });
  });
}

function pulseResult() {
  resultFigure.classList.remove("pulse");
  void resultFigure.offsetWidth;
  resultFigure.classList.add("pulse");
}

function renderResult(budget) {
  const totalExpenses = expenseCategories.reduce(
    (sum, category) => sum + budget[category.key],
    0
  );
  const leftover = budget.income - totalExpenses;
  const savingsRate = budget.income > 0 ? (budget.savings / budget.income) * 100 : 0;

  resultFigure.textContent = `${leftover < 0 ? "-" : ""}${currency(Math.abs(leftover))}`;
  resultFigure.classList.remove("positive", "negative");

  if (leftover < 0) {
    resultFigure.classList.add("negative");
    resultMessage.textContent = `Your expenses are ${currency(Math.abs(leftover))} more than your income this month. Look for a category above to trim before payday.`;
  } else if (savingsRate < 20) {
    resultFigure.classList.add("positive");
    resultMessage.textContent = `You have ${currency(leftover)} left over. Your savings rate is ${savingsRate.toFixed(1)}%, below the 20% target — consider nudging your savings line up next month.`;
  } else {
    resultFigure.classList.add("positive");
    resultMessage.textContent = `You have ${currency(leftover)} left over and a savings rate of ${savingsRate.toFixed(1)}%. That is a solid, sustainable pace.`;
  }

  pulseResult();
  renderBreakdown(budget);
}

/* ---------- Persistence ---------- */
function saveBudget(budget) {
  localStorage.setItem(storageKey, JSON.stringify(budget));

  const previousCount = Number(localStorage.getItem(countKey)) || 0;
  const nextCount = previousCount + 1;
  localStorage.setItem(countKey, `${nextCount}`);

  if (calcMeta) {
    calcMeta.textContent = `Calculated ${nextCount} time${nextCount === 1 ? "" : "s"} on this device. Your numbers are saved locally, so they'll be here next time you visit.`;
  }
}

function loadSavedBudget() {
  const saved = localStorage.getItem(storageKey);
  const count = Number(localStorage.getItem(countKey)) || 0;

  if (calcMeta) {
    calcMeta.textContent = count > 0
      ? `Calculated ${count} time${count === 1 ? "" : "s"} on this device. Your numbers are saved locally, so they'll be here next time you visit.`
      : `Nothing saved yet — fill in the fields and calculate to store your numbers on this device.`;
  }

  if (!saved) {
    return null;
  }

  return JSON.parse(saved);
}

/* ---------- Event Handling ---------- */
budgetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const budget = readBudgetFromForm();
  renderResult(budget);
  saveBudget(budget);
});

/* ---------- Initial Load ---------- */
const savedBudget = loadSavedBudget();

if (savedBudget) {
  fillFormFromBudget(savedBudget);
  renderResult(savedBudget);
}
