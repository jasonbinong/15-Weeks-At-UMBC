# 15 Weeks at UMBC

15 Weeks at UMBC is a choice-driven campus life game about balancing health, food, grades, and money through a UMBC semester.

This repo includes:

- A deployable browser version for GitHub Pages
- The original Processing sketch in `15_Weeks_At_UMBC.pde`
- Campus image assets in the `data` folder

## Play Online

After GitHub Pages is enabled, the live game will be available at:

```text
https://jasonbinong.github.io/15-Weeks-At-UMBC/
```

## Run the Browser Version

Open `index.html` in a web browser.

No installation is required.

## Deploy With GitHub Pages

1. Go to the repository's **Settings** tab.
2. Open **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/root` folder.
5. Save the settings.

## Run the Original Processing Version

1. Open `15_Weeks_At_UMBC.pde` in Processing.
2. Make sure the required photos are in the `data` folder.
3. Press Run.

## Required Photos

Processing loads images from the sketch's `data` folder. The game expects these exact filenames:

- `library.jpg`
- `lecture hall.jpg`
- `starbucks.jpg`
- `gameroom.jpg`
- `true grits.jpg`
- `the commons.jpg`
- `chesapeake.jpg`
- `gym.jpg`

If a photo is missing, the game shows an "Image not found" placeholder and prints the missing file path in the Processing console.
