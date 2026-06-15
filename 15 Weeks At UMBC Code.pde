// === 15 Weeks at UMBC (v27 — auto-rotate sideways photos) ===
// Put these in data/: library.jpg, lecture hall.jpg, starbucks.jpg,
// gameroom.jpg, true grits.jpg, the commons.jpg, chesapeake.jpg, gym.jpg


import java.util.HashMap;
import java.util.HashSet;
import java.util.Arrays;
import java.io.File;


int week = 1;
boolean gameOver = false, won = false;
String currentScene = "menu";
int scenarioIndex = 0;


final int W_LIGHT = 4, W_MED = 8, W_HEAVY = 12;


int health = 50, eat = 30, grades = 55, money = 60;


PImage currentBG;
int yesX, noX, buttonY, buttonW = 140, buttonH = 50;
int playX, playY, playW = 200, playH = 50;
PFont titleFont, textFont;


HashMap<String, PImage> imgCache = new HashMap<String, PImage>();


// ---- filenames (spaces matter) ----
String LIBRARY_IMG   = "library.jpg";
String LECTURE_IMG   = "lecture hall.jpg";
String STARBUCKS_IMG = "starbucks.jpg";
String GAMEROOM_IMG  = "gameroom.jpg";
String TRUEGRITS_IMG = "true grits.jpg";
String COMMONS_IMG   = "the commons.jpg";
String DORM_IMG      = "chesapeake.jpg";
String GYM_IMG       = "gym.jpg";


// ——— NEW: rotate these 90° clockwise when drawing ———
HashSet<String> ROTATE_CW = new HashSet<String>();
// If any need the other direction, add to this set instead:
// HashSet<String> ROTATE_CCW = new HashSet<String>(Arrays.asList("fileName.jpg"));
HashSet<String> ROTATE_CCW = new HashSet<String>();


// map 0..9 = scenarios 1..10
String[] week1Images = {
  LECTURE_IMG,       // #1
  TRUEGRITS_IMG,     // #2
  GAMEROOM_IMG,      // #3
  LECTURE_IMG,       // #4
  GYM_IMG,           // #5
  STARBUCKS_IMG,     // #6
  LECTURE_IMG,       // #7
  COMMONS_IMG,       // #8
  GYM_IMG,           // #9
  LIBRARY_IMG        // #10
};


String[] week2Images = {
  LECTURE_IMG,       // #11
  DORM_IMG,          // #12
  LIBRARY_IMG,       // #13
  STARBUCKS_IMG,     // #14
  GAMEROOM_IMG,      // #15
  LIBRARY_IMG,       // #16
  GYM_IMG,           // #17
  COMMONS_IMG,       // #18
  TRUEGRITS_IMG,     // #19
  COMMONS_IMG        // #20
};


// -------- scenario model ----------
class Scenario {
  String text;
  int hY,eY,gY,mY, hN,eN,gN,mN, weight;
  String img;
  Scenario(String t,int HY,int EY,int GY,int MY,int HN,int EN,int GN,int MN,int wt){
    text=t; hY=HY; eY=EY; gY=GY; mY=MY; hN=HN; eN=EN; gN=GN; mN=MN; weight=wt; img="";
  }
}
Scenario[][] scenarios = new Scenario[2][];


// -------- setup ----------
void setup(){
  size(800,600);
  titleFont = createFont("Arial Bold",36);
  textFont  = createFont("Arial",18);


  currentBG = createImage(width,height,RGB);
  currentBG.loadPixels();
  for (int i=0;i<currentBG.pixels.length;i++) currentBG.pixels[i]=color(150,180,255);
  currentBG.updatePixels();


  initScenarios();
  resolveScenarioImages();
}


// -------- scenarios ----------
void initScenarios(){
  scenarios[0] = new Scenario[]{
    new Scenario("It's Week 1! You stayed up late last night. Go to class anyway?", -1,0,+1,0,  0,0,-1,0,  W_MED),
    new Scenario("You're hungry but short on time. Grab a meal at True Grits?", +1,+1,-1,0,  -1,-1,0,0,  W_MED),
    new Scenario("Your friend invites you to the Gameroom. Go play?", 0,-1,0,0,  -1,0,0,0,  W_LIGHT),
    new Scenario("You have an early lab tomorrow. Stay up and finish the assignment?", -1,-1,+1,0,  +1,+1,-1,0,  W_HEAVY),
    new Scenario("You're feeling tired. Hit the Gym for a quick workout?", +1,-1,0,0,  -1,0,0,0,  W_MED),
    new Scenario("Your Starbucks shift calls you in early. Cover the shift?", -1,-1,0,+1,  0,0,0,-1,  W_MED),
    new Scenario("The professor posted notes online. Skip class and read them later?", 0,0,-1,0,  0,-1,+1,0,  W_MED),
    new Scenario("You skipped breakfast. Buy a snack from Commons?", -1,+1,+1,-1,  -1,-1,0,+1,  W_LIGHT),
    new Scenario("Track practice is later today. Rest instead of studying?", +1,0,-1,0,  -1,0,+1,0,  W_MED),
    new Scenario("You have a quiz tomorrow. Go study in the Library?", +1,0,+1,0,  0,0,-1,0,  W_HEAVY)
  };


  scenarios[1] = new Scenario[]{
    new Scenario("Week 2 begins! You feel sleepy. Attend your 8 a.m. class?", 0,0,+1,0,  0,0,-1,0,  W_MED),
    new Scenario("You forgot your ID card. Go back to your Dorm to grab it?", +1,0,0,0,  -1,-1,0,0,  W_LIGHT),
    new Scenario("Your roommate is being loud. Study in the Library instead?", 0,-1,+1,0,  0,0,-1,0,  W_MED),
    new Scenario("You're low on money. Pick up an extra Starbucks shift?", 0,-1,0,+1,  0,0,0,-1,  W_MED),
    new Scenario("You're feeling stressed. Play pool in the Gameroom?", +1,-1,-1,0,  -1,-1,-1,0,  W_LIGHT),
    new Scenario("You're behind on readings. Pull an all-nighter?", -1,-1,+1,0,  0,-1,-1,0,  W_HEAVY),
    new Scenario("Your coach adds a surprise practice. Go anyway?", -1,-1,-1,0,  +1,0,0,0,  W_LIGHT),
    new Scenario("You're invited to a study group in Commons. Join them?", 0,0,+1,0,  -1,0,-1,0,  W_MED),
    new Scenario("True Grits is packed. Wait in line for food?", -1,+1,0,-1,  0,-1,0,0,  W_MED),
    new Scenario("Friday night! Go out or stay in and rest?", +1,-1,0,-1,  -1,-1,0,0,  W_MED)
  };
}


// -------- image mapping ----------
void resolveScenarioImages(){
  for(int i=0;i<10;i++){
    scenarios[0][i].img = week1Images[i];
    scenarios[1][i].img = week2Images[i];
  }
}


boolean valid(String s){ return s!=null && s.trim().length()>0; }


PImage getCachedImage(String filename){
  if(!valid(filename)) return null;
  if(imgCache.containsKey(filename)) return imgCache.get(filename);

  String imagePath = dataPath(filename);
  File imageFile = new File(imagePath);
  if(!imageFile.exists()){
    println("Missing image: " + imagePath);
    imgCache.put(filename, null);
    return null;
  }

  PImage loaded=null;
  try{
    loaded=loadImage(imagePath);
  }catch(Exception e){
    println("Could not load image: " + imagePath);
    loaded=null;
  }
  if(loaded==null) println("Could not load image: " + imagePath);
  imgCache.put(filename, loaded); return loaded;
}


// -------- draw ----------
void draw(){
  background(0);
  if(gameOver) showGameOver();
  else if(currentScene.equals("menu")) showMenu();
  else showGame();
}


void showMenu(){
  background(50,80,120);
  fill(255); textFont(titleFont); textAlign(CENTER);
  text("15 Weeks at UMBC", width/2, 220);
  textFont(textFont);

  text("Click anywhere to start!", width/2, 350);
}


void showGame(){
  image(currentBG,0,0,width,height);
  displayBars();
  displayScenarioWithImage();
}


void displayBars(){
  fill(255); rect(40,60,150,100,10);
  fill(200,0,0); rect(50,130, map(health,0,100,0,130),15);
  fill(0); textAlign(LEFT,BASELINE); text("Health",50,120);


  fill(255); text("Eat",600,100);
  fill(255,165,0); rect(600,110, map(eat,0,100,0,150),15);
  fill(255); text("Grades",600,150);
  fill(0,100,255); rect(600,160, map(grades,0,100,0,150),15);
  fill(255); text("Money",600,200);
  fill(50,205,50); rect(600,210, map(money,0,100,0,150),15);


  fill(255); text("Week "+week,370,50);
}


void displayScenarioWithImage(){
  Scenario sc = scenarios[week-1][scenarioIndex];


  float boxWidth=620, pad=18, textLine=22;
  float textAreaWidth = boxWidth-2*pad;


  textFont(textFont); textSize(18);
  float estLines = max(1, ceil(textWidth(sc.text)/textAreaWidth));
  float textAreaHeight = estLines*textLine;
  float buttonAreaHeight = buttonH + pad*1.5;
  float boxHeight = constrain(textAreaHeight + pad*3 + buttonAreaHeight, 140, 260);


  float barsBottom=225, safeTopY=barsBottom+2, bottomMargin=18, imgGap=10;
  float availableForAll = height - bottomMargin - safeTopY;
  float sLimit = availableForAll - imgGap - boxHeight;
  float s = constrain(min(400, sLimit), 160, 400);


  float imgX=(width-s)/2.0, imgY=safeTopY;
  float boxX=(width-boxWidth)/2.0, boxY=imgY+s+imgGap;


  if (boxY+boxHeight+bottomMargin>height){
    float overflow=(boxY+boxHeight+bottomMargin)-height;
    s=max(160, s-overflow);
    imgX=(width-s)/2.0; imgY=safeTopY; boxY=imgY+s+imgGap;
  }


  // image frame + draw
  noStroke(); fill(255,245); rect(imgX,imgY,s,s,16);
  drawScenarioImage(sc.img,imgX,imgY,s,s);


  // question card
  noStroke(); fill(255,235); rect(boxX,boxY,boxWidth,boxHeight,20);
  fill(0); textAlign(LEFT,TOP); textLeading(textLine);
  float textX=boxX+pad, textY=boxY+pad, textW=boxWidth-2*pad, textH=boxHeight-(buttonAreaHeight+pad*2);
  text(sc.text,textX,textY,textW,textH);


  int gap=40;
  yesX=int(boxX + (boxWidth - (buttonW*2 + gap))/2.0);
  noX = yesX + buttonW + gap;
  buttonY=int(boxY + boxHeight - pad - buttonH);


  fill(0,200,0); rect(yesX,buttonY,buttonW,buttonH,10);
  fill(255); textAlign(CENTER,CENTER); textSize(20); text("YES", yesX+buttonW/2, buttonY+buttonH/2+2);


  fill(200,0,0); rect(noX,buttonY,buttonW,buttonH,10);
  fill(255); text("NO", noX+buttonW/2, buttonY+buttonH/2+2);
}


// ---- draw image (auto-rotate if needed) ----
void drawScenarioImage(String filename,float x,float y,float w,float h){
  PImage img = getCachedImage(filename);
  if (img==null){
    fill(235); rect(x+8,y+8,w-16,h-16,12);
    fill(120); textAlign(CENTER,CENTER);
    text("Image not found:\n"+filename, x+w/2, y+h/2);
    return;
  }


  boolean cw  = ROTATE_CW.contains(filename);
  boolean ccw = ROTATE_CCW.contains(filename);


  if (!cw && !ccw){
    // normal fit
    float scale=min(w/img.width, h/img.height);
    float drawW=img.width*scale, drawH=img.height*scale;
    image(img, x+(w-drawW)/2, y+(h-drawH)/2, drawW, drawH);
    return;
  }


  // rotated fit (swap width/height during scaling)
  float srcW = img.height; // swapped
  float srcH = img.width;
  float scale=min(w/srcW, h/srcH);
  float drawW=srcW*scale, drawH=srcH*scale;


  pushMatrix();
  // center the rotated image in the square
  translate(x + w/2, y + h/2);
  rotate(cw ? HALF_PI : -HALF_PI);  // CW or CCW
  image(img, -drawW/2, -drawH/2, drawW, drawH);
  popMatrix();
}


// -------- input & flow ----------
void mousePressed(){
  if(currentScene.equals("menu")){ currentScene="game"; return; }
  if(gameOver){ if(overRect(playX,playY,playW,playH)) resetGame(); return; }
  if(!currentScene.equals("game")) return;
  if(overRect(yesX,buttonY,buttonW,buttonH)) applyChoice(true);
  if(overRect(noX, buttonY,buttonW,buttonH)) applyChoice(false);
}
boolean overRect(int x,int y,int w,int h){ return mouseX>x && mouseX<x+w && mouseY>y && mouseY<y+h; }


void applyChoice(boolean yes){
  Scenario sc=scenarios[week-1][scenarioIndex];
  int w=sc.weight;
  if(yes) applyDeltas(sc.hY*w, sc.eY*w, sc.gY*w, sc.mY*w);
  else    applyDeltas(sc.hN*w, sc.eN*w, sc.gN*w, sc.mN*w);
  nextScenario();
}
void applyDeltas(int dH,int dE,int dG,int dM){
  health=clamp(health+dH,0,100);
  eat   =clamp(eat+dE,0,100);
  grades=clamp(grades+dG,0,100);
  money =clamp(money+dM,0,100);
}
int clamp(int v,int lo,int hi){ return max(lo,min(hi,v)); }


void nextScenario(){
  if(health<=0 || checkTwoBarsZero()){ gameOver=true; won=false; return; }
  scenarioIndex++;
  if(scenarioIndex>=scenarios[week-1].length){
    week++; scenarioIndex=0;
    if(week>2){ gameOver=true; won=true; return; }
  }
}
boolean checkTwoBarsZero(){ int c=0; if(eat<=0)c++; if(grades<=0)c++; if(money<=0)c++; return c>=2; }


void showGameOver(){
  background(0); textAlign(CENTER); textFont(titleFont);
  if(won){ fill(0,200,0); text("SEMESTER OVER", width/2, height/2-60);
           textFont(textFont); fill(255);
           text("You completed the demo (Weeks 1–2)!", width/2, height/2);
  } else { fill(255,0,0); text("SEMESTER OVER", width/2, height/2-60);
           textFont(textFont); fill(255);
           text("You didn’t survive the semester...", width/2, height/2);
  }
  playX=width/2-playW/2; playY=height/2+50;
  boolean hover=overRect(playX,playY,playW,playH);
  noStroke(); fill(hover?80:60,80,110); rect(playX,playY,playW,playH,10);
  fill(255); textAlign(CENTER,CENTER); textSize(18);
  text("Play Again", playX+playW/2, playY+playH/2+2);
}


void resetGame(){
  week=1; scenarioIndex=0; gameOver=false; won=false; currentScene="menu";
  health=50; eat=30; grades=55; money=60;
}
