const images = {
  library: { file: "library.jpg", label: "Library" },
  lecture: { file: "lecture hall.jpg", label: "Lecture Hall" },
  starbucks: { file: "starbucks.jpg", label: "Starbucks" },
  gameroom: { file: "gameroom.jpg", label: "Gameroom" },
  trueGrits: { file: "true grits.jpg", label: "True Grits" },
  commons: { file: "the commons.jpg", label: "The Commons" },
  dorm: { file: "chesapeake.jpg", label: "Chesapeake Hall" },
  gym: { file: "gym.jpg", label: "Gym" }
};

const profiles = {
  commuter: {
    label: "Commuter",
    start: { health: 64, food: 52, grades: 58, money: 70 },
    intro: "You start with better money, but commuting makes time and energy harder to protect.",
    modifiers: {
      2: { note: "A slow commute cuts into your study window.", effects: { health: -4, grades: -2 } },
      7: { note: "Packing food from home saves money this week.", effects: { food: 3, money: 4 } },
      12: { note: "A late ride home makes social plans harder.", effects: { health: -3, food: -2 } }
    }
  },
  campus: {
    label: "On-Campus",
    start: { health: 66, food: 60, grades: 58, money: 52 },
    intro: "You start closer to campus life, but convenience spending is a constant pressure.",
    modifiers: {
      3: { note: "Living nearby makes the campus event easier to join.", effects: { health: 2, food: 3 } },
      8: { note: "Dining and late-night snacks hit your budget.", effects: { money: -5, food: 3 } },
      13: { note: "Being close to classmates helps finals review.", effects: { grades: 4 } }
    }
  }
};

const stats = {
  health: { label: "Health", value: 0 },
  food: { label: "Food", value: 0 },
  grades: { label: "Grades", value: 0 },
  money: { label: "Money", value: 0 }
};

const weeks = [
  week("Adjustment", "Week 1", "First Monday", "It's Week 1, and every syllabus just turned into a deadline map. How do you start?", "lecture", [
    choice("Build a semester plan", "Map deadlines, study blocks, meals, and work shifts before the rush begins.", { grades: 9, health: 2, food: -2 }),
    choice("Handle only today's work", "Keep the day simple and avoid overloading yourself too early.", { health: 4, grades: 1, money: -1 }),
    choice("Follow your friends' pace", "Stay social and see how the first week feels before committing to a system.", { food: 3, grades: -5, money: -2 })
  ]),
  week("Adjustment", "Week 2", "Morning Grind", "You stayed up late and have an early class. Do you push through or recover?", "lecture", [
    choice("Go to class anyway", "Show up, take notes, and protect attendance even while tired.", { grades: 8, health: -5, food: -2 }),
    choice("Sleep in and review later", "Recover some energy but trust yourself to catch up.", { health: 8, grades: -6 }),
    choice("Ask a classmate for notes", "Use your network, then review the material after lunch.", { grades: 4, food: 2, money: -1 })
  ]),
  week("Adjustment", "Week 3", "Campus Life", "Your friend invites you to the Gameroom after class, but homework is waiting.", "gameroom", [
    choice("Go for one hour", "Take a short break and return before the night disappears.", { health: 5, food: 3, grades: -2, money: -2 }),
    choice("Skip it and study", "Get ahead while your motivation is still high.", { grades: 8, health: -3, food: -4 }),
    choice("Stay out late", "Enjoy the campus energy, even if tomorrow gets harder.", { health: -6, food: 6, grades: -7, money: -4 })
  ]),
  week("Momentum", "Week 4", "Lab Deadline", "A programming lab is due soon, and one bug keeps breaking the output.", "library", [
    choice("Debug with small tests", "Break the logic into pieces and verify each condition.", { grades: 10, health: -2, food: -2 }),
    choice("Visit tutoring", "Get unstuck with support instead of guessing alone.", { grades: 7, health: 2, money: -1 }),
    choice("Submit the first working version", "Avoid another late night but leave points on the table.", { health: 4, grades: -6 })
  ]),
  week("Momentum", "Week 5", "Food Budget", "True Grits is convenient, but your meal and snack choices are starting to matter.", "trueGrits", [
    choice("Eat a full meal", "Spend time on food so you can focus later.", { food: 11, health: 3, money: -4 }),
    choice("Grab a cheap snack", "Save money, but risk running on fumes.", { food: 4, money: -1, health: -4 }),
    choice("Skip the line", "Save time now and promise yourself you will eat later.", { grades: 3, food: -9, health: -5 })
  ]),
  week("Momentum", "Week 6", "Work Shift", "Starbucks asks if you can cover an extra shift during a busy coursework week.", "starbucks", [
    choice("Cover the shift", "Earn money, but lose study and recovery time.", { money: 10, grades: -4, health: -5, food: -2 }),
    choice("Decline and study", "Protect the academic week, even if money stays tight.", { grades: 8, money: -3, health: 1 }),
    choice("Trade for a shorter shift", "Keep some income without giving away the whole day.", { money: 5, grades: 3, health: -2 })
  ]),
  week("Midterm Season", "Week 7", "First Midterm", "Your first major exam is coming up, and your confidence is mixed.", "lecture", [
    choice("Make a targeted review sheet", "Focus on weak topics and practice problems instead of rereading everything.", { grades: 12, health: -3, food: -2 }),
    choice("Join a study group", "Talk through concepts and catch what you missed.", { grades: 8, food: 3, money: -1 }),
    choice("Cram the night before", "Cover a lot quickly, but accept the burnout risk.", { grades: 5, health: -10, food: -5 })
  ]),
  week("Midterm Season", "Week 8", "Commons Study Group", "A group meets in the Commons to compare notes and plan the next project.", "commons", [
    choice("Lead the task split", "Turn scattered ideas into roles, deadlines, and a shared plan.", { grades: 10, health: -2, food: 2 }),
    choice("Contribute quietly", "Do your part without taking on extra coordination.", { grades: 5, health: 3 }),
    choice("Skip the meeting", "Use the time for yourself, but miss group alignment.", { health: 5, grades: -7 })
  ]),
  week("Midterm Season", "Week 9", "Burnout Warning", "You feel worn down. Your body is asking for a reset before the second half.", "gym", [
    choice("Work out and sleep early", "Treat recovery like part of the plan.", { health: 12, food: 2, grades: -2 }),
    choice("Power through assignments", "Keep grades moving, but keep borrowing energy from later.", { grades: 8, health: -8, food: -4 }),
    choice("Take a social reset", "Step away from work and rebuild your mood.", { health: 6, food: 5, money: -3, grades: -4 })
  ]),
  week("Pressure Builds", "Week 10", "Advising Week", "Registration is close, and your next semester depends on smart course choices.", "library", [
    choice("Meet your advisor", "Ask about prerequisites, workload, and degree progress.", { grades: 6, health: 3, money: 2 }),
    choice("Copy a friend's schedule", "Fast and easy, but not built around your path.", { food: 3, grades: -5 }),
    choice("Research alone", "Compare options yourself and build a backup plan.", { grades: 5, health: -2 })
  ]),
  week("Pressure Builds", "Week 11", "Project Crunch", "A major project needs integration, testing, and a clean final submission.", "lecture", [
    choice("Test the full flow", "Catch bugs before the deadline and strengthen the final result.", { grades: 12, health: -4, food: -3 }),
    choice("Improve the presentation", "Make the work easier to understand and demo.", { grades: 7, food: 1, health: -2 }),
    choice("Submit when it works once", "Protect time, but risk hidden issues.", { health: 5, grades: -7 })
  ]),
  week("Pressure Builds", "Week 12", "Unexpected Expense", "Transportation, supplies, or a surprise bill hits your budget.", "commons", [
    choice("Cut nonessential spending", "Stabilize money by saying no to extras for a week.", { money: 10, food: -4, health: -2 }),
    choice("Use savings carefully", "Handle the problem without panicking.", { money: -4, health: 3, grades: 1 }),
    choice("Ignore it for now", "Keep the week comfortable but make the next one harder.", { food: 4, money: -11, health: -2 })
  ]),
  week("Final Push", "Week 13", "Career Fair", "A campus career event is coming up, but assignments are stacked.", "commons", [
    choice("Polish your resume", "Update projects, skills, and a short introduction before going.", { grades: 3, money: 5, health: -2 }),
    choice("Attend casually", "Learn what employers ask and build confidence.", { money: 3, food: 4, grades: 1 }),
    choice("Skip it for homework", "Protect study time, but miss a career opportunity.", { grades: 7, money: -4 })
  ]),
  week("Final Push", "Week 14", "Finals Prep", "Final exams and final submissions are now close enough to feel real.", "library", [
    choice("Prioritize by grade impact", "Rank tasks by deadline, weight, and weak topics.", { grades: 13, health: -3, food: -2 }),
    choice("Review the easiest class first", "Build confidence, but avoid the hardest work.", { health: 3, grades: 1, food: 1 }),
    choice("Study late every night", "Cover more material at a heavy cost.", { grades: 7, health: -11, food: -5 })
  ]),
  week("Final Push", "Week 15", "Last Week", "The semester ends now. Your final move decides what kind of finish this becomes.", "dorm", [
    choice("Balance review and rest", "Keep your brain sharp while finishing the highest-value work.", { grades: 8, health: 8, food: 2 }),
    choice("Cram everything", "Push for every last point, even if the week gets rough.", { grades: 10, health: -10, food: -5 }),
    choice("Reflect and recover", "Accept what is done and set yourself up for next semester.", { health: 10, food: 4, grades: 2, money: 2 })
  ])
];

const state = {
  profile: "commuter",
  weekIndex: 0,
  log: []
};

const els = {
  menuView: document.querySelector("#menuView"),
  gameView: document.querySelector("#gameView"),
  resultView: document.querySelector("#resultView"),
  startButton: document.querySelector("#startButton"),
  restartButton: document.querySelector("#restartButton"),
  playAgainButton: document.querySelector("#playAgainButton"),
  profileCards: [...document.querySelectorAll(".profile-card")],
  phaseLabel: document.querySelector("#phaseLabel"),
  weekTitle: document.querySelector("#weekTitle"),
  weekCounter: document.querySelector("#weekCounter"),
  sceneImage: document.querySelector("#sceneImage"),
  sceneCaption: document.querySelector("#sceneCaption"),
  scenarioKicker: document.querySelector("#scenarioKicker"),
  scenarioText: document.querySelector("#scenarioText"),
  choices: document.querySelector("#choices"),
  statusTitle: document.querySelector("#statusTitle"),
  scoreBadge: document.querySelector("#scoreBadge"),
  meters: document.querySelector("#meters"),
  choiceLog: document.querySelector("#choiceLog"),
  resultEyebrow: document.querySelector("#resultEyebrow"),
  resultTitle: document.querySelector("#resultTitle"),
  resultText: document.querySelector("#resultText"),
  resultGrid: document.querySelector("#resultGrid")
};

els.profileCards.forEach(card => {
  card.addEventListener("click", () => selectProfile(card.dataset.profile));
});
els.startButton.addEventListener("click", startGame);
els.restartButton.addEventListener("click", resetGame);
els.playAgainButton.addEventListener("click", resetGame);

selectProfile(state.profile);

function week(phase, title, kicker, text, image, choices) {
  return { phase, title, kicker, text, image, choices };
}

function choice(label, detail, effects) {
  return { label, detail, effects };
}

function selectProfile(profile) {
  state.profile = profile;
  Object.entries(profiles[profile].start).forEach(([key, value]) => {
    stats[key].value = value;
  });
  state.log = [profiles[profile].intro];
  state.weekIndex = 0;
  els.profileCards.forEach(card => {
    const active = card.dataset.profile === profile;
    card.classList.toggle("active", active);
    card.setAttribute("aria-pressed", String(active));
  });
  renderStatus();
}

function startGame() {
  state.weekIndex = 0;
  Object.entries(profiles[state.profile].start).forEach(([key, value]) => {
    stats[key].value = value;
  });
  state.log = [profiles[state.profile].intro];
  showView("game");
  renderWeek();
  renderStatus();
}

function resetGame() {
  selectProfile(state.profile);
  showView("menu");
}

function renderWeek() {
  const current = weeks[state.weekIndex];
  const image = images[current.image];

  els.phaseLabel.textContent = current.phase;
  els.weekTitle.textContent = current.title;
  els.weekCounter.textContent = `${state.weekIndex + 1} / ${weeks.length}`;
  els.sceneImage.src = `data/${image.file}`;
  els.sceneImage.alt = `${image.label} UMBC campus scene`;
  els.sceneCaption.textContent = image.label;
  els.scenarioKicker.textContent = current.kicker;
  els.scenarioText.textContent = current.text;
  els.choices.innerHTML = "";

  current.choices.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.innerHTML = `
      <span>${index + 1}. ${option.label}</span>
      <strong>${option.detail}</strong>
      <div class="choice-effects">${formatEffects(option.effects)}</div>
    `;
    button.addEventListener("click", () => choose(option));
    els.choices.appendChild(button);
  });
}

function choose(option) {
  applyEffects(option.effects);
  state.log.unshift(`${weeks[state.weekIndex].title}: ${option.label}`);

  const modifier = profiles[state.profile].modifiers[state.weekIndex + 1];
  if (modifier) {
    applyEffects(modifier.effects);
    state.log.unshift(modifier.note);
  }

  renderStatus();

  const failed = getFailedStat();
  if (failed) {
    showEnding("Semester ended early", `${stats[failed].label} collapsed`, getFailureText(failed));
    return;
  }

  state.weekIndex += 1;
  if (state.weekIndex >= weeks.length) {
    showFinalEnding();
    return;
  }

  renderWeek();
}

function applyEffects(effects) {
  Object.entries(effects).forEach(([key, value]) => {
    stats[key].value = clamp(stats[key].value + value, 0, 100);
  });
}

function renderStatus() {
  els.statusTitle.textContent = profiles[state.profile].label;
  els.scoreBadge.textContent = getAverageScore();
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

  els.choiceLog.innerHTML = state.log.slice(0, 6).map(item => `<li>${item}</li>`).join("");
}

function showFinalEnding() {
  const average = getAverageScore();
  const lowest = Object.entries(stats).sort((a, b) => a[1].value - b[1].value)[0];

  if (average >= 78 && lowest[1].value >= 45) {
    showEnding("Semester complete", "Balanced Finish", `You made it through all 15 weeks with a strong overall balance. Your final average was ${average}, and even your weakest area stayed manageable.`);
  } else if (stats.grades.value >= 80) {
    showEnding("Semester complete", "Academic Clutch", `You protected your grades through the final push. The semester worked academically, but ${lowest[1].label.toLowerCase()} needs more attention next time.`);
  } else if (stats.health.value >= 75 && stats.food.value >= 60) {
    showEnding("Semester complete", "Healthy Reset", `You finished with your wellbeing intact. Your grades may not be perfect, but you built a sustainable rhythm for the next semester.`);
  } else if (stats.money.value >= 80) {
    showEnding("Semester complete", "Budget Survivor", `You kept your money under control across a chaotic semester. Next time, use that stability to support ${lowest[1].label.toLowerCase()}.`);
  } else {
    showEnding("Semester complete", "Survived the Semester", `You reached the end, but the semester was uneven. Your final average was ${average}, and ${lowest[1].label.toLowerCase()} was the toughest area.`);
  }
}

function showEnding(eyebrow, title, text) {
  els.resultEyebrow.textContent = eyebrow;
  els.resultTitle.textContent = title;
  els.resultText.textContent = text;
  els.resultGrid.innerHTML = Object.values(stats).map(stat => `
    <div class="result-stat">
      <span>${stat.label}</span>
      <strong>${stat.value}</strong>
    </div>
  `).join("");
  showView("result");
}

function getFailedStat() {
  if (stats.health.value <= 0) return "health";
  if (stats.food.value <= 0) return "food";
  if (stats.grades.value <= 0) return "grades";
  if (stats.money.value <= 0) return "money";
  return null;
}

function getFailureText(stat) {
  const messages = {
    health: "Burnout took over before finals. You needed recovery earlier in the semester.",
    food: "You ran out of fuel. Meals and energy are not optional when the semester gets heavy.",
    grades: "The academic workload became impossible to recover from. The game ends because grades hit zero.",
    money: "Money pressure became too heavy to keep the semester stable."
  };
  return messages[stat];
}

function showView(view) {
  els.menuView.classList.toggle("hidden", view !== "menu");
  els.gameView.classList.toggle("hidden", view !== "game");
  els.resultView.classList.toggle("hidden", view !== "result");
}

function formatEffects(effects) {
  return Object.entries(effects)
    .map(([key, value]) => `${value > 0 ? "+" : ""}${value} ${stats[key].label}`)
    .join(" | ");
}

function getAverageScore() {
  const values = Object.values(stats).map(stat => stat.value);
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
