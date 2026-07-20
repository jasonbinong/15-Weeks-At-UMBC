# 15 Weeks at UMBC

![15 Weeks at UMBC thumbnail](thumbnail.png)

15 Weeks at UMBC is an arcade-style campus-life strategy game about balancing health, food, grades, money, stress, support, and career readiness through a full semester.

## Quick Links

- [Play Game](https://jasonbinong.github.io/15-Weeks-At-UMBC/)
- [Portfolio Case Study](https://jasonbinong.github.io/umbc-game-case-study.html)
- [Jason Binong Portfolio](https://jasonbinong.github.io/)

## Project Snapshot

| Area | Details |
| --- | --- |
| Status | Deployed browser game |
| Focus | Decision systems, state management, interactive storytelling |
| Users | Students and reviewers exploring campus-life tradeoffs |
| Core Stack | JavaScript, HTML, CSS, Java/Processing |
| Deployment | GitHub Pages |

## What It Does

Players choose a student path and move through 15 weekly campus-life decisions. Each choice changes seven connected stats: health, food, grades, money, stress, support, and career readiness. The game ends with a semester outcome based on the player's tradeoffs.

## Key Features

- Six student paths: commuter, working student, first-year, transfer, honors, and student athlete
- 15 weekly decision scenarios
- Three meaningful choices per week
- Seven tracked stats across the semester
- Profile-specific events
- Dynamic consequences when stress, money, food, or health become unstable
- Save and continue support with browser localStorage
- Achievement system based on play style
- Semester progress tracker and final report
- Early failure states and multiple final endings
- Responsive layout for desktop and mobile
- Original Processing sketch preserved in `15_Weeks_At_UMBC.pde`

## Tech Stack

- JavaScript
- HTML/CSS
- Browser localStorage
- Java/Processing
- GitHub Pages

## What Reviewers Should Notice

- Meaningful state management across connected variables
- Game logic translated from a Processing class project into a deployable web product
- Branching outcomes based on student choices
- Stronger visual identity with arcade-inspired UI
- Campus-life theme tied to UMBC student experience

## Case Study

### Problem

College students constantly trade off studying, working, resting, eating, socializing, and taking care of their health. I wanted to turn those everyday decisions into an interactive game that makes the consequences visible.

### Solution

15 Weeks at UMBC is a semester-long decision game where players choose weekly actions and manage health, food, grades, money, stress, support, and career readiness. Each decision affects the semester, leading to different outcomes based on the player's priorities and tradeoffs.

### Key Design Decisions

- Built a 15-week structure to mirror a real semester
- Used six student paths so the experience changes based on the player's starting situation
- Added stress, support, career readiness, achievements, and save/continue for a more complete game loop
- Added early failure states and multiple endings to make decisions meaningful
- Preserved the original Processing sketch while creating a deployable browser version

## How To Run

Open `index.html` in a browser.

No installation is required for the browser version.

## Run The Original Processing Version

1. Open `15_Weeks_At_UMBC.pde` in Processing.
2. Make sure the required photos are in the `data` folder.
3. Press Run.

## Required Processing Photos

The original Processing sketch expects these files in the `data` folder:

- `library.jpg`
- `lecture hall.jpg`
- `starbucks.jpg`
- `gameroom.jpg`
- `true grits.jpg`
- `the commons.jpg`
- `chesapeake.jpg`
- `gym.jpg`

The browser version uses its own web-ready visual system.

## Future Improvements

- Add more event variety based on major, work schedule, or club involvement
- Add optional sound effects and music
- Expand endings with more detailed semester summaries
- Add more achievement paths and replay incentives
