const STORAGE_KEY = "fifteen-weeks-umbc-save-v2";

const images = {
  library: { file: "arcade/library.png", label: "Library" },
  lecture: { file: "arcade/lecture.png", label: "Lecture Hall" },
  starbucks: { file: "arcade/cafe.png", label: "Campus Cafe" },
  gameroom: { file: "arcade/gameroom.png", label: "Game Room" },
  trueGrits: { file: "arcade/dining.png", label: "Dining Hall" },
  commons: { file: "arcade/commons.png", label: "The Commons" },
  dorm: { file: "arcade/dorm.png", label: "Residence Hall" },
  gym: { file: "arcade/gym.png", label: "Fitness Center" }
};

const statInfo = {
  health: { label: "Health", color: "red", icon: "♥" },
  food: { label: "Food", color: "orange", icon: "▰" },
  grades: { label: "Grades", color: "blue", icon: "▣" },
  money: { label: "Money", color: "green", icon: "$" },
  stress: { label: "Stress", color: "purple", icon: "!" , inverted: true },
  social: { label: "Support", color: "teal", icon: "◆" },
  career: { label: "Career", color: "gold", icon: "★" }
};

const profiles = {
  commuter: {
    label: "Commuter Student",
    short: "Commuter",
    description: "You save on campus costs, but travel time makes every week tighter.",
    start: { health: 66, food: 54, grades: 58, money: 72, stress: 38, social: 44, career: 35 },
    perks: ["Commute discipline", "Budget awareness"],
    modifiers: {
      2: eventNote("A delayed ride trims your study window.", { health: -4, grades: -2, stress: 5 }),
      7: eventNote("Packing food from home keeps the week cheaper.", { food: 4, money: 5, stress: -2 }),
      12: eventNote("A late ride home makes it harder to follow up with classmates.", { social: -5, stress: 4 })
    }
  },
  working: {
    label: "Working Student",
    short: "Working",
    description: "You have income and responsibility, but every extra shift competes with recovery.",
    start: { health: 58, food: 56, grades: 56, money: 80, stress: 46, social: 38, career: 42 },
    perks: ["Higher income", "Work experience"],
    modifiers: {
      4: eventNote("Your manager asks for one extra closing shift.", { money: 8, health: -5, stress: 6 }),
      9: eventNote("Work experience gives you a stronger career fair story.", { career: 7, social: 2 }),
      14: eventNote("Finals collide with your work schedule.", { grades: -4, stress: 7 })
    }
  },
  firstYear: {
    label: "First-Year Student",
    short: "First-year",
    description: "You have room to explore, but college systems are still new.",
    start: { health: 70, food: 58, grades: 52, money: 55, stress: 42, social: 58, career: 25 },
    perks: ["Social momentum", "Exploration"],
    modifiers: {
      3: eventNote("A new friend group makes campus feel less overwhelming.", { social: 7, health: 2 }),
      8: eventNote("You underestimate how group projects work in college.", { grades: -4, stress: 5 }),
      13: eventNote("You learn how to talk about your first projects.", { career: 6, social: 3 })
    }
  },
  transfer: {
    label: "Transfer Student",
    short: "Transfer",
    description: "You know college pressure already, but you are still building your UMBC network.",
    start: { health: 62, food: 57, grades: 64, money: 58, stress: 40, social: 34, career: 38 },
    perks: ["Academic maturity", "Focused goals"],
    modifiers: {
      5: eventNote("Transfer orientation connects you with useful campus resources.", { social: 6, career: 4 }),
      10: eventNote("Credit planning gets complicated for next semester.", { stress: 6, grades: -2 }),
      15: eventNote("Your previous college experience helps you stay calm during finals.", { stress: -7, grades: 3 })
    }
  },
  honors: {
    label: "Honors Student",
    short: "Honors",
    description: "You start academically strong, but pressure rises when every grade feels important.",
    start: { health: 60, food: 55, grades: 74, money: 52, stress: 50, social: 44, career: 40 },
    perks: ["Strong grades", "High standards"],
    modifiers: {
      6: eventNote("You take on optional enrichment work.", { grades: 6, career: 4, stress: 6 }),
      11: eventNote("Perfectionism makes the project crunch feel heavier.", { grades: 3, health: -5, stress: 7 }),
      14: eventNote("Your study habits pay off during finals prep.", { grades: 5, stress: -3 })
    }
  },
  athlete: {
    label: "Student Athlete",
    short: "Athlete",
    description: "Training gives structure and support, but travel and fatigue change the semester.",
    start: { health: 74, food: 62, grades: 52, money: 50, stress: 44, social: 60, career: 30 },
    perks: ["Team support", "High stamina"],
    modifiers: {
      4: eventNote("A travel day compresses your homework schedule.", { grades: -4, stress: 5 }),
      9: eventNote("Training helps you reset during burnout week.", { health: 6, stress: -5 }),
      13: eventNote("Team connections help you practice networking.", { social: 5, career: 5 })
    }
  }
};

const weeks = [
  week("Adjustment", "Week 1", "First Monday", "Every syllabus just became a deadline map.", "Start strong without pretending you can solve the whole semester in one night.", "lecture", 1, [
    choice("Build a semester command center", "Map exams, work shifts, meals, and project checkpoints.", { grades: 9, health: 2, food: -2, stress: -5, career: 2 }),
    choice("Handle only this week", "Keep the launch simple and avoid overloading yourself.", { health: 5, grades: 2, stress: -2, money: -1 }),
    choice("Follow your friends' pace", "Stay social and see how campus feels before committing to a system.", { social: 7, food: 3, grades: -5, money: -2 })
  ]),
  week("Adjustment", "Week 2", "Morning Grind", "You stayed up late and have an early class.", "The semester is already testing whether attendance, rest, and accountability can coexist.", "lecture", 1, [
    choice("Go to class anyway", "Show up, take notes, and protect attendance.", { grades: 8, health: -5, food: -2, stress: 3 }),
    choice("Sleep in and review later", "Recover energy but trust yourself to catch up.", { health: 9, grades: -6, stress: -4 }),
    choice("Ask a classmate for notes", "Use support, then review the material after lunch.", { grades: 4, social: 5, food: 2, money: -1 })
  ]),
  week("Adjustment", "Week 3", "Campus Life", "Your friend invites you to the Gameroom after class.", "Homework is waiting, but a semester with zero breaks rarely stays healthy.", "gameroom", 1, [
    choice("Go for one hour", "Take a short break and return before the night disappears.", { health: 5, social: 6, food: 3, grades: -2, money: -2, stress: -3 }),
    choice("Skip it and study", "Get ahead while motivation is still high.", { grades: 8, health: -3, food: -4, social: -3 }),
    choice("Stay out late", "Enjoy campus energy even if tomorrow gets harder.", { health: -6, social: 8, food: 6, grades: -7, money: -4, stress: 4 })
  ]),
  week("Momentum", "Week 4", "Lab Deadline", "A programming lab is due soon, and one bug keeps breaking the output.", "This is a small test of whether you debug with a system or with panic.", "library", 2, [
    choice("Debug with small tests", "Break the logic into pieces and verify each condition.", { grades: 11, health: -2, food: -2, stress: -3, career: 4 }),
    choice("Visit tutoring", "Get unstuck with support instead of guessing alone.", { grades: 8, health: 2, social: 3, money: -1 }),
    choice("Submit the first working version", "Avoid another late night but leave points on the table.", { health: 5, grades: -6, stress: -2 })
  ]),
  week("Momentum", "Week 5", "Food Budget", "True Grits is convenient, but meals and snacks are becoming strategic.", "Your brain cannot run on vibes forever.", "trueGrits", 1, [
    choice("Eat a full meal", "Spend time on food so you can focus later.", { food: 12, health: 4, money: -5, stress: -2 }),
    choice("Grab a cheap snack", "Save money, but risk running on fumes.", { food: 4, money: -1, health: -4 }),
    choice("Meal prep for two days", "Use planning to protect food and money.", { food: 8, money: 4, health: 2, grades: -2, stress: -3 })
  ]),
  week("Momentum", "Week 6", "Work Shift", "Starbucks asks if you can cover an extra shift during a busy coursework week.", "Money helps, but time is the hidden cost.", "starbucks", 2, [
    choice("Cover the shift", "Earn money, but lose study and recovery time.", { money: 11, grades: -4, health: -5, food: -2, stress: 5 }),
    choice("Decline and study", "Protect the academic week, even if money stays tight.", { grades: 8, money: -3, health: 1, stress: -2 }),
    choice("Trade for a shorter shift", "Keep income without giving away the whole day.", { money: 5, grades: 3, health: -2, career: 2 })
  ]),
  week("Midterm Season", "Week 7", "First Midterm", "Your first major exam is close, and your confidence is mixed.", "Midterms reward targeted practice more than heroic rereading.", "lecture", 3, [
    choice("Make a targeted review sheet", "Focus weak topics and practice problems.", { grades: 13, health: -3, food: -2, stress: -4 }),
    choice("Join a study group", "Talk through concepts and catch what you missed.", { grades: 9, social: 5, food: 3, money: -1, stress: -2 }),
    choice("Cram the night before", "Cover a lot quickly, but accept the burnout risk.", { grades: 5, health: -10, food: -5, stress: 10 })
  ]),
  week("Midterm Season", "Week 8", "Group Project", "A group meets in the Commons to split a project.", "The assignment is not just technical. It is coordination, timing, and trust.", "commons", 2, [
    choice("Lead the task split", "Turn scattered ideas into owners, deadlines, and a shared plan.", { grades: 10, career: 4, health: -2, social: 3, stress: 2 }),
    choice("Contribute quietly", "Do your part without taking on extra coordination.", { grades: 5, health: 3, stress: -1 }),
    choice("Skip the meeting", "Use the time for yourself, but miss group alignment.", { health: 5, grades: -7, social: -4, stress: 2 })
  ]),
  week("Midterm Season", "Week 9", "Burnout Warning", "You feel worn down before the second half.", "Your body is not being dramatic. It is giving you data.", "gym", 3, [
    choice("Work out and sleep early", "Treat recovery like part of the plan.", { health: 13, food: 2, grades: -2, stress: -10 }),
    choice("Power through assignments", "Keep grades moving, but borrow energy from later.", { grades: 8, health: -8, food: -4, stress: 9 }),
    choice("Take a social reset", "Step away from work and rebuild your mood.", { health: 6, social: 7, food: 5, money: -3, grades: -4, stress: -6 })
  ]),
  week("Pressure Builds", "Week 10", "Advising Week", "Registration is close, and next semester depends on smart course choices.", "The wrong schedule can make next semester harder before it starts.", "library", 2, [
    choice("Meet your advisor", "Ask about prerequisites, workload, and degree progress.", { grades: 6, career: 5, health: 3, money: 2, stress: -5 }),
    choice("Copy a friend's schedule", "Fast and easy, but not built around your path.", { social: 2, food: 3, grades: -5, stress: 2 }),
    choice("Research alone", "Compare options yourself and build a backup plan.", { grades: 5, career: 3, health: -2 })
  ]),
  week("Pressure Builds", "Week 11", "Project Crunch", "A major project needs integration, testing, and a clean final submission.", "This is where 'it worked once' becomes a dangerous sentence.", "lecture", 3, [
    choice("Test the full flow", "Catch bugs before the deadline and strengthen the final result.", { grades: 12, career: 5, health: -4, food: -3, stress: -2 }),
    choice("Improve the presentation", "Make the work easier to understand and demo.", { grades: 7, career: 6, food: 1, health: -2 }),
    choice("Submit when it works once", "Protect time, but risk hidden issues.", { health: 5, grades: -7, stress: -2 })
  ]),
  week("Pressure Builds", "Week 12", "Unexpected Expense", "Transportation, supplies, or a surprise bill hits your budget.", "A money problem can become an academic problem if it stays invisible.", "commons", 2, [
    choice("Cut nonessential spending", "Stabilize money by saying no to extras for a week.", { money: 11, food: -4, health: -2, stress: 2 }),
    choice("Ask about support resources", "Look for pantry, emergency aid, or campus guidance.", { money: 5, food: 5, social: 3, stress: -5 }),
    choice("Ignore it for now", "Keep the week comfortable but make the next one harder.", { food: 4, money: -11, health: -2, stress: 6 })
  ]),
  week("Final Push", "Week 13", "Career Fair", "A campus career event is coming up, but assignments are stacked.", "You do not need to be perfect to start practicing professional conversations.", "commons", 2, [
    choice("Polish your resume", "Update projects, skills, and a short introduction before going.", { career: 12, grades: 3, money: 3, health: -2 }),
    choice("Attend casually", "Learn what employers ask and build confidence.", { career: 8, social: 4, food: 4, grades: 1 }),
    choice("Skip it for homework", "Protect study time, but miss a career opportunity.", { grades: 7, career: -4, stress: -1 })
  ]),
  week("Final Push", "Week 14", "Finals Prep", "Final exams and final submissions are close enough to feel real.", "A plan matters more now because everything feels urgent.", "library", 3, [
    choice("Prioritize by grade impact", "Rank tasks by deadline, weight, and weak topics.", { grades: 14, health: -3, food: -2, stress: -3 }),
    choice("Review the easiest class first", "Build confidence, but avoid the hardest work.", { health: 3, grades: 1, food: 1, stress: -3 }),
    choice("Study late every night", "Cover more material at a heavy cost.", { grades: 7, health: -11, food: -5, stress: 11 })
  ]),
  week("Final Push", "Week 15", "Last Week", "The semester ends now.", "Your final move decides whether this semester becomes a lesson, a win, or a warning.", "dorm", 3, [
    choice("Balance review and rest", "Keep your brain sharp while finishing the highest-value work.", { grades: 8, health: 8, food: 2, stress: -8 }),
    choice("Cram everything", "Push for every last point, even if the week gets rough.", { grades: 10, health: -10, food: -5, stress: 12 }),
    choice("Reflect and recover", "Accept what is done and set yourself up for next semester.", { health: 10, food: 4, grades: 2, money: 2, career: 3, stress: -9 })
  ])
];

let state = loadSavedState() || createNewState("commuter");

const els = {
  menuView: document.querySelector("#menuView"),
  gameView: document.querySelector("#gameView"),
  resultView: document.querySelector("#resultView"),
  startButton: document.querySelector("#startButton"),
  restartButton: document.querySelector("#restartButton"),
  playAgainButton: document.querySelector("#playAgainButton"),
  continueButton: document.querySelector("#continueButton"),
  profilePicker: document.querySelector("#profilePicker"),
  profileName: document.querySelector("#profileName"),
  profileDescription: document.querySelector("#profileDescription"),
  loadoutBars: document.querySelector("#loadoutBars"),
  phaseLabel: document.querySelector("#phaseLabel"),
  weekTitle: document.querySelector("#weekTitle"),
  weekCounter: document.querySelector("#weekCounter"),
  semesterTrack: document.querySelector("#semesterTrack"),
  difficultyBadge: document.querySelector("#difficultyBadge"),
  sceneMedia: document.querySelector(".scene-media"),
  sceneImage: document.querySelector("#sceneImage"),
  sceneCaption: document.querySelector("#sceneCaption"),
  scenarioKicker: document.querySelector("#scenarioKicker"),
  scenarioText: document.querySelector("#scenarioText"),
  scenarioDetail: document.querySelector("#scenarioDetail"),
  choices: document.querySelector("#choices"),
  statusTitle: document.querySelector("#statusTitle"),
  scoreBadge: document.querySelector("#scoreBadge"),
  alertStack: document.querySelector("#alertStack"),
  meters: document.querySelector("#meters"),
  choiceLog: document.querySelector("#choiceLog"),
  achievementList: document.querySelector("#achievementList"),
  resultEyebrow: document.querySelector("#resultEyebrow"),
  resultOutcome: document.querySelector("#resultOutcome"),
  resultTitle: document.querySelector("#resultTitle"),
  resultText: document.querySelector("#resultText"),
  resultGrid: document.querySelector("#resultGrid"),
  endingNotes: document.querySelector("#endingNotes")
};

renderProfilePicker();
bindEvents();
selectProfile(state.profile, false);
showView(state.mode === "game" ? "game" : state.mode === "result" ? "result" : "menu");
renderAll();

function bindEvents() {
  els.startButton.addEventListener("click", startGame);
  els.continueButton.addEventListener("click", continueGame);
  els.restartButton.addEventListener("click", resetGame);
  els.playAgainButton.addEventListener("click", resetGame);
}

function eventNote(note, effects) {
  return { note, effects };
}

function week(phase, title, kicker, text, detail, image, difficulty, choices) {
  return { phase, title, kicker, text, detail, image, difficulty, choices };
}

function choice(label, detail, effects) {
  return { label, detail, effects };
}

function createNewState(profile) {
  return {
    mode: "menu",
    profile,
    weekIndex: 0,
    stats: structuredClone(profiles[profile].start),
    log: [profiles[profile].description],
    achievements: [],
    result: null,
    flags: {
      lowHealthWeeks: 0,
      highStressWeeks: 0,
      lowMoneyWeeks: 0,
      lowFoodWeeks: 0,
      studyWins: 0,
      recoveryWins: 0,
      careerWins: 0
    }
  };
}

function loadSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !profiles[saved.profile]) return null;
    return normalizeState(saved);
  } catch {
    return null;
  }
}

function normalizeState(saved) {
  const fallback = createNewState(saved.profile || "commuter");
  return {
    ...fallback,
    ...saved,
    stats: { ...fallback.stats, ...(saved.stats || {}) },
    flags: { ...fallback.flags, ...(saved.flags || {}) },
    log: Array.isArray(saved.log) ? saved.log : fallback.log,
    achievements: Array.isArray(saved.achievements) ? saved.achievements : [],
    result: saved.result && typeof saved.result === "object" ? saved.result : null,
    weekIndex: clamp(Number(saved.weekIndex || 0), 0, weeks.length),
    mode: ["menu", "game", "result"].includes(saved.mode) ? saved.mode : "menu"
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderProfilePicker() {
  els.profilePicker.innerHTML = Object.entries(profiles).map(([key, profile]) => `
    <button class="profile-card" type="button" data-profile="${key}" aria-pressed="false">
      <span>${profile.label}</span>
      <strong>${profile.description}</strong>
      <small>${profile.perks.join(" / ")}</small>
    </button>
  `).join("");
  [...els.profilePicker.querySelectorAll(".profile-card")].forEach(card => {
    card.addEventListener("click", () => selectProfile(card.dataset.profile, true));
  });
}

function selectProfile(profile, reset) {
  if (reset) state = createNewState(profile);
  state.profile = profile;
  const current = profiles[profile];
  els.profileName.textContent = current.label;
  els.profileDescription.textContent = current.description;
  els.loadoutBars.innerHTML = Object.entries(current.start).map(([key, value]) => renderMiniBar(key, value)).join("");
  [...els.profilePicker.querySelectorAll(".profile-card")].forEach(card => {
    const active = card.dataset.profile === profile;
    card.classList.toggle("active", active);
    card.setAttribute("aria-pressed", String(active));
  });
  renderStatus();
  saveState();
}

function startGame() {
  state = createNewState(state.profile);
  state.mode = "game";
  saveState();
  showView("game");
  renderAll();
}

function continueGame() {
  if (state.mode === "game" && state.weekIndex < weeks.length) {
    showView("game");
    renderAll();
  }
}

function resetGame() {
  const profile = state.profile;
  state = createNewState(profile);
  localStorage.removeItem(STORAGE_KEY);
  selectProfile(profile, false);
  showView("menu");
  renderAll();
}

function renderAll() {
  renderStatus();
  if (state.mode === "game" && state.weekIndex < weeks.length) renderWeek();
  if (state.mode === "result") {
    if (state.result) {
      renderSavedEnding();
    } else {
      showFinalEnding(false);
    }
  }
  els.continueButton.disabled = !(state.mode === "game" && state.weekIndex < weeks.length);
}

function renderWeek() {
  const current = weeks[state.weekIndex];
  const image = images[current.image];

  els.phaseLabel.textContent = current.phase;
  els.weekTitle.textContent = current.title;
  els.weekCounter.textContent = `${state.weekIndex + 1} / ${weeks.length}`;
  els.difficultyBadge.textContent = ["Normal", "Tight", "High pressure"][current.difficulty - 1] || "Normal";
  els.sceneMedia.style.setProperty("--scene-art", `url("data/${image.file}")`);
  els.sceneImage.src = `data/${image.file}`;
  els.sceneImage.alt = `${image.label} UMBC campus scene`;
  els.sceneCaption.textContent = image.label;
  els.scenarioKicker.textContent = current.kicker;
  els.scenarioText.textContent = current.text;
  els.scenarioDetail.textContent = current.detail;
  els.semesterTrack.innerHTML = weeks.map((item, index) => `<span class="${index < state.weekIndex ? "done" : index === state.weekIndex ? "current" : ""}" title="${item.title}"></span>`).join("");
  els.choices.innerHTML = "";

  current.choices.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = `choice-button choice-${index + 1}`;
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
  setChoicesDisabled(true);
  applyEffects(option.effects);
  updateChoiceFlags(option.effects);
  addLog(`${weeks[state.weekIndex].title}: ${option.label}`);

  const modifier = profiles[state.profile].modifiers[state.weekIndex + 1];
  if (modifier) {
    applyEffects(modifier.effects);
    addLog(modifier.note);
  }

  applyDynamicConsequences();
  unlockAchievements();
  renderStatus();

  const failed = getFailedStat();
  if (failed) {
    showEnding(
      "Semester ended early",
      `${statInfo[failed].label} collapsed`,
      getFailureText(failed),
      {
        label: "Failed Semester",
        tone: "fail",
        detail: `${statInfo[failed].label} dropped too low before finals.`
      }
    );
    return;
  }

  state.weekIndex += 1;
  if (state.weekIndex >= weeks.length) {
    showFinalEnding(true);
    return;
  }

  state.mode = "game";
  saveState();
  transitionToNextWeek();
}

function transitionToNextWeek() {
  const next = weeks[state.weekIndex];
  const nextImage = images[next.image];
  const preloader = new Image();
  preloader.src = `data/${nextImage.file}`;

  els.gameView.classList.add("is-changing");
  window.setTimeout(() => {
    renderWeek();
    window.requestAnimationFrame(() => {
      els.gameView.classList.remove("is-changing");
    });
  }, 260);
}

function setChoicesDisabled(disabled) {
  els.choices.querySelectorAll("button").forEach(button => {
    button.disabled = disabled;
  });
}

function applyEffects(effects) {
  Object.entries(effects).forEach(([key, value]) => {
    state.stats[key] = clamp((state.stats[key] || 0) + value, 0, 100);
  });
}

function updateChoiceFlags(effects) {
  if ((effects.grades || 0) >= 7) state.flags.studyWins += 1;
  if ((effects.health || 0) >= 6 || (effects.stress || 0) <= -6) state.flags.recoveryWins += 1;
  if ((effects.career || 0) >= 5) state.flags.careerWins += 1;
}

function applyDynamicConsequences() {
  const { health, food, money, stress, social } = state.stats;
  state.flags.lowHealthWeeks = health < 30 ? state.flags.lowHealthWeeks + 1 : 0;
  state.flags.lowFoodWeeks = food < 25 ? state.flags.lowFoodWeeks + 1 : 0;
  state.flags.lowMoneyWeeks = money < 25 ? state.flags.lowMoneyWeeks + 1 : 0;
  state.flags.highStressWeeks = stress > 76 ? state.flags.highStressWeeks + 1 : 0;

  if (state.flags.lowHealthWeeks >= 2) {
    applyEffects({ grades: -4, stress: 4 });
    addLog("Low health is now hurting your academic focus.");
  }
  if (state.flags.lowFoodWeeks >= 2) {
    applyEffects({ health: -4, grades: -3 });
    addLog("Running low on food is dragging down energy and grades.");
  }
  if (state.flags.lowMoneyWeeks >= 2) {
    applyEffects({ stress: 6, social: -2 });
    addLog("Money pressure is making the semester harder to manage.");
  }
  if (state.flags.highStressWeeks >= 2) {
    applyEffects({ health: -5, grades: -2 });
    addLog("Sustained stress is turning into burnout.");
  }
  if (social >= 72 && stress > 35) {
    applyEffects({ stress: -3 });
    addLog("Your support network helps absorb some pressure.");
  }
}

function unlockAchievements() {
  const awards = [
    ["Academic Anchor", state.flags.studyWins >= 5],
    ["Recovery Matters", state.flags.recoveryWins >= 4],
    ["Career Starter", state.flags.careerWins >= 3],
    ["Support System", state.stats.social >= 75],
    ["Budget Watch", state.stats.money >= 80],
    ["Stress Manager", state.stats.stress <= 25 && state.weekIndex >= 8]
  ];
  awards.forEach(([award, earned]) => {
    if (earned && !state.achievements.includes(award)) {
      state.achievements.push(award);
      addLog(`Achievement unlocked: ${award}`);
    }
  });
}

function renderStatus() {
  const profile = profiles[state.profile];
  els.statusTitle.textContent = profile.label;
  els.scoreBadge.textContent = getSemesterScore();
  els.alertStack.innerHTML = getAlerts().map(alert => `<div class="alert ${alert.tone}">${alert.text}</div>`).join("");
  els.meters.innerHTML = Object.entries(statInfo).map(([key, info]) => `
    <div class="meter">
      <div class="meter-label">
        <span><i class="stat-icon ${info.color}">${info.icon}</i>${info.label}</span>
        <span>${state.stats[key]}</span>
      </div>
      <div class="meter-track">
        <div class="meter-fill ${info.color}" style="width: ${info.inverted ? 100 - state.stats[key] : state.stats[key]}%"></div>
      </div>
    </div>
  `).join("");

  els.choiceLog.innerHTML = state.log.slice(0, 8).map(item => `<li>${escapeHtml(item)}</li>`).join("");
  els.achievementList.innerHTML = state.achievements.length
    ? state.achievements.map(item => `<span>${escapeHtml(item)}</span>`).join("")
    : "<p>No achievements yet.</p>";
}

function showFinalEnding(advanceMode) {
  if (advanceMode) state.mode = "result";
  const score = getSemesterScore();
  const lowest = Object.entries(state.stats).sort((a, b) => normalizedStat(a[0], a[1]) - normalizedStat(b[0], b[1]))[0];
  const passedSemester = state.stats.grades >= 60 && score >= 55 && state.stats.health >= 20 && state.stats.food >= 20;
  let title = "Survived the Semester";
  let text = `You reached the end, but the semester was uneven. Your final semester score was ${score}, and ${statInfo[lowest[0]].label.toLowerCase()} was the toughest area.`;

  if (!passedSemester) {
    title = "Semester Did Not Pass";
    text = `You made it to finals week, but the overall balance was too low to pass the semester cleanly. Your final semester score was ${score}, and ${statInfo[lowest[0]].label.toLowerCase()} hurt the outcome most.`;
  } else if (score >= 84 && normalizedStat(lowest[0], lowest[1]) >= 45) {
    title = "Balanced Semester";
    text = `You made it through all 15 weeks with strong overall balance. Your final semester score was ${score}, and even your weakest area stayed manageable.`;
  } else if (state.stats.grades >= 82 && state.stats.career >= 60) {
    title = "Internship Ready Finish";
    text = `You protected your grades and built career momentum. You leave the semester with stronger evidence, better habits, and a clearer next step.`;
  } else if (state.stats.grades >= 84) {
    title = "Academic Clutch";
    text = `You protected your grades through the final push, but ${statInfo[lowest[0]].label.toLowerCase()} needs more attention before next semester.`;
  } else if (state.stats.health >= 76 && state.stats.stress <= 38) {
    title = "Sustainable Finish";
    text = "You finished with your wellbeing intact. The grades may not be perfect, but you built a rhythm that can last.";
  } else if (state.stats.money >= 82) {
    title = "Budget Survivor";
    text = `You kept money under control across a chaotic semester. Next time, use that stability to support ${statInfo[lowest[0]].label.toLowerCase()}.`;
  } else if (state.stats.stress >= 82) {
    title = "Burned Out But Through";
    text = "You made it to the end, but stress ran the semester. The next run needs earlier recovery and support.";
  }

  showEnding(
    "Semester complete",
    title,
    text,
    {
      label: passedSemester ? "Passed Semester" : "Failed Semester",
      tone: passedSemester ? "pass" : "fail",
      detail: passedSemester
        ? `Final score: ${score}/100. Grades, health, food, and pressure stayed above the survival line.`
        : `Final score: ${score}/100. One or more core semester systems fell below the survival line.`
    }
  );
}

function showEnding(eyebrow, title, text, outcome = { label: "Semester Complete", tone: "neutral", detail: "" }) {
  state.result = { eyebrow, title, text, outcome };
  renderSavedEnding();
  state.mode = "result";
  saveState();
  showView("result");
}

function renderSavedEnding() {
  const { eyebrow, title, text } = state.result;
  const outcome = state.result.outcome || { label: "Semester Complete", tone: "neutral", detail: "" };
  els.resultEyebrow.textContent = eyebrow;
  els.resultOutcome.className = `result-outcome ${outcome.tone}`;
  els.resultOutcome.innerHTML = `
    <strong>${escapeHtml(outcome.label)}</strong>
    <span>${escapeHtml(outcome.detail)}</span>
  `;
  els.resultTitle.textContent = title;
  els.resultText.textContent = text;
  els.resultGrid.innerHTML = Object.entries(statInfo).map(([key, info]) => `
    <div class="result-stat">
      <span>${info.label}</span>
      <strong>${state.stats[key]}</strong>
    </div>
  `).join("");
  els.endingNotes.innerHTML = buildEndingNotes().map(note => `<li>${escapeHtml(note)}</li>`).join("");
}

function buildEndingNotes() {
  const notes = [
    `${profiles[state.profile].label} path completed ${Math.min(state.weekIndex + 1, weeks.length)} of ${weeks.length} weeks.`,
    `Semester score: ${getSemesterScore()}/100.`,
    `Achievements: ${state.achievements.length ? state.achievements.join(", ") : "none yet"}.`
  ];
  const lowest = Object.entries(state.stats).sort((a, b) => normalizedStat(a[0], a[1]) - normalizedStat(b[0], b[1]))[0];
  notes.push(`Biggest improvement area: ${statInfo[lowest[0]].label}.`);
  if (state.stats.career >= 60) notes.push("Career readiness improved because you invested in portfolio, advising, or networking moments.");
  if (state.stats.social >= 70) notes.push("Your support system became a real advantage during pressure weeks.");
  return notes;
}

function getFailedStat() {
  if (state.stats.health <= 0) return "health";
  if (state.stats.food <= 0) return "food";
  if (state.stats.grades <= 0) return "grades";
  if (state.stats.money <= 0) return "money";
  if (state.stats.stress >= 100) return "stress";
  return null;
}

function getFailureText(stat) {
  const messages = {
    health: "Burnout took over before finals. You needed recovery earlier in the semester.",
    food: "You ran out of fuel. Meals and energy are not optional when the semester gets heavy.",
    grades: "The academic workload became impossible to recover from.",
    money: "Money pressure became too heavy to keep the semester stable.",
    stress: "Stress hit the ceiling and the semester became unsustainable."
  };
  return messages[stat];
}

function getAlerts() {
  const alerts = [];
  Object.entries(state.stats).forEach(([key, value]) => {
    if (key === "stress" && value >= 72) alerts.push({ tone: "danger", text: "Stress is high. Recovery matters soon." });
    if (key !== "stress" && value <= 28) alerts.push({ tone: "danger", text: `${statInfo[key].label} is in the danger zone.` });
  });
  if (!alerts.length && state.mode === "game") alerts.push({ tone: "ok", text: "No critical warnings this week." });
  return alerts.slice(0, 3);
}

function showView(view) {
  els.menuView.classList.toggle("hidden", view !== "menu");
  els.gameView.classList.toggle("hidden", view !== "game");
  els.resultView.classList.toggle("hidden", view !== "result");
  state.mode = view;
  saveState();
}

function renderMiniBar(key, value) {
  const info = statInfo[key];
  const width = info.inverted ? 100 - value : value;
  return `
    <div class="mini-bar">
      <span><i class="stat-icon ${info.color}">${info.icon}</i>${info.label}</span>
      <div><i class="${info.color}" style="width:${width}%"></i></div>
      <strong>${value}</strong>
    </div>
  `;
}

function formatEffects(effects) {
  return Object.entries(effects)
    .map(([key, value]) => `${value > 0 ? "+" : ""}${value} ${statInfo[key].label}`)
    .join(" / ");
}

function getSemesterScore() {
  const values = Object.entries(state.stats).map(([key, value]) => normalizedStat(key, value));
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function normalizedStat(key, value) {
  return statInfo[key].inverted ? 100 - value : value;
}

function addLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 30);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
