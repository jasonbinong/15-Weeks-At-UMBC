const W_LIGHT = 4;
const W_MED = 8;
const W_HEAVY = 12;

const imageNames = {
  library: "library.jpg",
  lecture: "lecture hall.jpg",
  starbucks: "starbucks.jpg",
  gameroom: "gameroom.jpg",
  trueGrits: "true grits.jpg",
  commons: "the commons.jpg",
  dorm: "chesapeake.jpg",
  gym: "gym.jpg"
};

const weekImages = [
  [
    imageNames.lecture,
    imageNames.trueGrits,
    imageNames.gameroom,
    imageNames.lecture,
    imageNames.gym,
    imageNames.starbucks,
    imageNames.lecture,
    imageNames.commons,
    imageNames.gym,
    imageNames.library
  ],
  [
    imageNames.lecture,
    imageNames.dorm,
    imageNames.library,
    imageNames.starbucks,
    imageNames.gameroom,
    imageNames.library,
    imageNames.gym,
    imageNames.commons,
    imageNames.trueGrits,
    imageNames.commons
  ]
];

const scenarios = [
  [
    scenario("It's Week 1! You stayed up late last night. Go to class anyway?", -1, 0, 1, 0, 0, 0, -1, 0, W_MED),
    scenario("You're hungry but short on time. Grab a meal at True Grits?", 1, 1, -1, 0, -1, -1, 0, 0, W_MED),
    scenario("Your friend invites you to the Gameroom. Go play?", 0, -1, 0, 0, -1, 0, 0, 0, W_LIGHT),
    scenario("You have an early lab tomorrow. Stay up and finish the assignment?", -1, -1, 1, 0, 1, 1, -1, 0, W_HEAVY),
    scenario("You're feeling tired. Hit the Gym for a quick workout?", 1, -1, 0, 0, -1, 0, 0, 0, W_MED),
    scenario("Your Starbucks shift calls you in early. Cover the shift?", -1, -1, 0, 1, 0, 0, 0, -1, W_MED),
    scenario("The professor posted notes online. Skip class and read them later?", 0, 0, -1, 0, 0, -1, 1, 0, W_MED),
    scenario("You skipped breakfast. Buy a snack from Commons?", -1, 1, 1, -1, -1, -1, 0, 1, W_LIGHT),
    scenario("Track practice is later today. Rest instead of studying?", 1, 0, -1, 0, -1, 0, 1, 0, W_MED),
    scenario("You have a quiz tomorrow. Go study in the Library?", 1, 0, 1, 0, 0, 0, -1, 0, W_HEAVY)
  ],
  [
    scenario("Week 2 begins! You feel sleepy. Attend your 8 a.m. class?", 0, 0, 1, 0, 0, 0, -1, 0, W_MED),
    scenario("You forgot your ID card. Go back to your Dorm to grab it?", 1, 0, 0, 0, -1, -1, 0, 0, W_LIGHT),
    scenario("Your roommate is being loud. Study in the Library instead?", 0, -1, 1, 0, 0, 0, -1, 0, W_MED),
    scenario("You're low on money. Pick up an extra Starbucks shift?", 0, -1, 0, 1, 0, 0, 0, -1, W_MED),
    scenario("You're feeling stressed. Play pool in the Gameroom?", 1, -1, -1, 0, -1, -1, -1, 0, W_LIGHT),
    scenario("You're behind on readings. Pull an all-nighter?", -1, -1, 1, 0, 0, -1, -1, 0, W_HEAVY),
    scenario("Your coach adds a surprise practice. Go anyway?", -1, -1, -1, 0, 1, 0, 0, 0, W_LIGHT),
    scenario("You're invited to a study group in Commons. Join them?", 0, 0, 1, 0, -1, 0, -1, 0, W_MED),
    scenario("True Grits is packed. Wait in line for food?", -1, 1, 0, -1, 0, -1, 0, 0, W_MED),
    scenario("Friday night! Go out or stay in and rest?", 1, -1, 0, -1, -1, -1, 0, 0, W_MED)
  ]
];

const stats = {
  health: { label: "Health", value: 50 },
  eat: { label: "Food", value: 30 },
  grades: { label: "Grades", value: 55 },
  money: { label: "Money", value: 60 }
};

const state = {
  week: 1,
  scenarioIndex: 0,
  currentScene: "menu",
  won: false,
  choiceLog: []
};

const els = {
  menuView: document.querySelector("#menuView"),
  gameView: document.querySelector("#gameView"),
  resultView: document.querySelector("#resultView"),
  startButton: document.querySelector("#startButton"),
  restartButton: document.querySelector("#restartButton"),
  playAgainButton: document.querySelector("#playAgainButton"),
  sceneImage: document.querySelector("#sceneImage"),
  weekLabel: document.querySelector("#weekLabel"),
  scenarioLabel: document.querySelector("#scenarioLabel"),
  scenarioText: document.querySelector("#scenarioText"),
  yesButton: document.querySelector("#yesButton"),
  noButton: document.querySelector("#noButton"),
  statusTitle: document.querySelector("#statusTitle"),
  meters: document.querySelector("#meters"),
  choiceLog: document.querySelector("#choiceLog"),
  resultEyebrow: document.querySelector("#resultEyebrow"),
  resultTitle: document.querySelector("#resultTitle"),
  resultText: document.querySelector("#resultText")
};

els.startButton.addEventListener("click", startGame);
els.restartButton.addEventListener("click", resetGame);
els.playAgainButton.addEventListener("click", resetGame);
els.yesButton.addEventListener("click", () => applyChoice(true));
els.noButton.addEventListener("click", () => applyChoice(false));

renderMeters();

function scenario(text, hY, eY, gY, mY, hN, eN, gN, mN, weight) {
  return { text, hY, eY, gY, mY, hN, eN, gN, mN, weight };
}

function startGame() {
  state.currentScene = "game";
  showView("game");
  renderScenario();
}

function resetGame() {
  stats.health.value = 50;
  stats.eat.value = 30;
  stats.grades.value = 55;
  stats.money.value = 60;
  state.week = 1;
  state.scenarioIndex = 0;
  state.won = false;
  state.choiceLog = [];
  state.currentScene = "menu";
  showView("menu");
  renderMeters();
  renderChoiceLog();
}

function renderScenario() {
  const weekIndex = state.week - 1;
  const currentScenario = scenarios[weekIndex][state.scenarioIndex];
  const imageName = weekImages[weekIndex][state.scenarioIndex];

  els.weekLabel.textContent = `Week ${state.week}`;
  els.scenarioLabel.textContent = `Scenario ${state.scenarioIndex + 1} of ${scenarios[weekIndex].length}`;
  els.scenarioText.textContent = currentScenario.text;
  els.sceneImage.src = `data/${imageName}`;
  els.sceneImage.alt = imageName.replace(".jpg", " UMBC campus scene");
  els.statusTitle.textContent = `Week ${state.week}`;
}

function applyChoice(yes) {
  const currentScenario = scenarios[state.week - 1][state.scenarioIndex];
  const weight = currentScenario.weight;

  if (yes) {
    applyDeltas(currentScenario.hY * weight, currentScenario.eY * weight, currentScenario.gY * weight, currentScenario.mY * weight);
  } else {
    applyDeltas(currentScenario.hN * weight, currentScenario.eN * weight, currentScenario.gN * weight, currentScenario.mN * weight);
  }

  state.choiceLog.unshift(`Week ${state.week}.${state.scenarioIndex + 1}: ${yes ? "Yes" : "No"} - ${currentScenario.text}`);
  renderMeters();
  renderChoiceLog();
  nextScenario();
}

function applyDeltas(health, eat, grades, money) {
  stats.health.value = clamp(stats.health.value + health, 0, 100);
  stats.eat.value = clamp(stats.eat.value + eat, 0, 100);
  stats.grades.value = clamp(stats.grades.value + grades, 0, 100);
  stats.money.value = clamp(stats.money.value + money, 0, 100);
}

function nextScenario() {
  if (stats.health.value <= 0 || checkTwoBarsZero()) {
    showResult(false);
    return;
  }

  state.scenarioIndex += 1;

  if (state.scenarioIndex >= scenarios[state.week - 1].length) {
    state.week += 1;
    state.scenarioIndex = 0;

    if (state.week > scenarios.length) {
      showResult(true);
      return;
    }
  }

  renderScenario();
}

function checkTwoBarsZero() {
  let count = 0;
  if (stats.eat.value <= 0) count += 1;
  if (stats.grades.value <= 0) count += 1;
  if (stats.money.value <= 0) count += 1;
  return count >= 2;
}

function showResult(won) {
  state.won = won;
  showView("result");

  if (won) {
    els.resultEyebrow.textContent = "Semester over";
    els.resultTitle.textContent = "Demo Complete";
    els.resultText.textContent = "You completed the original two-week demo. Your choices kept the semester moving, and your final stats show how you balanced school, food, money, and health.";
  } else {
    els.resultEyebrow.textContent = "Semester over";
    els.resultTitle.textContent = "You did not survive the semester";
    els.resultText.textContent = "One major resource collapsed, or two of your food, grades, and money bars reached zero. Try again with a different balance of school, work, rest, and campus life.";
  }
}

function showView(view) {
  els.menuView.classList.toggle("hidden", view !== "menu");
  els.gameView.classList.toggle("hidden", view !== "game");
  els.resultView.classList.toggle("hidden", view !== "result");
}

function renderMeters() {
  els.meters.innerHTML = Object.entries(stats).map(([key, stat]) => `
    <div class="meter">
      <div class="meter-label">
        <span>${stat.label}</span>
        <span>${stat.value}</span>
      </div>
      <div class="meter-track">
        <div class="meter-fill ${key}" style="width: ${stat.value}%"></div>
      </div>
    </div>
  `).join("");
}

function renderChoiceLog() {
  if (state.choiceLog.length === 0) {
    els.choiceLog.innerHTML = "<li>Click Start Game to begin Week 1.</li>";
    return;
  }

  els.choiceLog.innerHTML = state.choiceLog
    .slice(0, 5)
    .map(choice => `<li>${choice}</li>`)
    .join("");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
