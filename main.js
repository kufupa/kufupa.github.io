// Declare all constants
let canvasWidth = 1600;
let canvasHeight = 900;
let FPS = 60;

// Background loop variables
let gameState = null;
let paused = false;

// Variables for the images that will be loaded
let titleImage; // title & loading screen image
let instructionsImg; // controls and game information image
let difficultyImg; // pictures for the 3 difficulty icons

// Variables for leaderboard data
let leaderBoardScores = []; // Scores sorted ascendingly
let leaderBoardNames = []; // Names, respective to score achieved
let leaderBoardText = ""; // Text written or read from storage

// Menu game state variables
let screenVariable = 3; // Which screen to display
let mouseHeld = false;
let difficultySlider; // Assigned to difficulty slider in background loop 


// Load and display title screen
function displayTitle(){ 
  background(0); // Apply black background
  
  titleImage = loadImage("Assets/titleScreen.jpg", // Load screen
    titleImage => { // Display it on successful loading
      image(titleImage, 
        width/2 - titleImage.width/2, // position in center of window
        height/2 - titleImage.height/2
      );  
    }
  );
}

// parameter states maximum number of top player scores to return
function getTopPlayers(number) { 
  
  // first check if there is any scores locally stored
  if (!localStorage.getItem('leaderboard')){ // if no scores stored, use default and save
    // Create array of the names
    leaderBoardNames  = ["Chandler", "Kar1", "Fl0rence", "Dylan", "Thilaxan",
                             "Katy", "R1cky99", "Rachel33", "Jimmy", "MrBeast" ];
    // Create array of sorted scores
    leaderBoardScores = [100, 212, 369, 420, 512, 
                             678, 737, 840, 951, 1000];
    
    // Convert to text to store on user's system
    leaderBoardText = ""
    for (let i=0; i<leaderBoardNames.length; i++){
      leaderBoardText += leaderBoardNames[i] + ",";
      leaderBoardText += str(leaderBoardScores[i]) + ",";
    }
      
    // add leaderboard with default values
    localStorage.setItem("leaderboard", leaderBoardText ); 
  } 
  else { // load the stored score
    leaderBoardText = localStorage.getItem("leaderboard"); // Read text
    // Separate text to respective arrays
    let leaderBoardData = leaderBoardText.split(","); // Since stored as CSV
    
    for (let i=0; i<leaderBoardData.length-1; i++ ){ 
      if (i%2 == 0) { // Every other is a name
        leaderBoardNames.push( leaderBoardData[i] )
      } else{ // Its a score
        leaderBoardScores.push( int(leaderBoardData[i]) )     
      }
    } 
  }
  
  // Spliced to return 10 items from end of array - so only top 10 items 
  return (
    leaderBoardNames = leaderBoardNames.splice(leaderBoardNames.length-10,10), 
    leaderBoardScores = leaderBoardScores.splice(leaderBoardNames.length-10,10)
  )
}

function loadInstructions(){
  instructionsImg = loadImage("Assets/instructions.jpg"); // Load screen
}

function loadDifficulty(){
  difficultyImg = loadImage("Assets/difficulty.jpg"); // Load screen
}

function displayAndCentreImage(Img){
  image(Img, // Pass arguement
        width/2 - Img.width/2, // position in center of canvas
        height/2 - Img.height/2
    );  
}

function displayLeaderboard(names, scores){
  background(0); // Apply black background & cover anything previously displayed
  let xDistance = 175; // How far apart the names are from the scores
  let yDistance = 70; // Vertical spacing between records
  let xPos = width/2 - (xDistance/2|0); // Center the text horizontally
  let yPos = yDistance + 20; // Vertically where the text begins being written from
  
  textSize(75); // Size of text - p5js procedure
  fill(200, 200, 255); // Colour of text - lavender
  text("HIGH SCORES", xPos-xDistance, yPos)
  yPos += yDistance + 50
  
  fill(0, 200, 200); // Colour of text - Cyan
  textSize(70); // Size of text - p5js procedure
  
  for(let i=names.length-1; i>-1; i--){ // Loop through all the different scores
    text(names[i], xPos-xDistance, yPos); // Display name
    text(scores[i], xPos+xDistance, yPos); // Display text
    yPos += yDistance; // Update vertical position for next pair of data
  }
  
}

function menuScreens(screenVariable){ // For what to display on screen
    if (screenVariable == 0){
      displayAndCentreImage(titleImage);
    } 
    else if (screenVariable == 1) {
      displayAndCentreImage(instructionsImg);
    } 
    else if (screenVariable == 2) {
      displayLeaderboard(leaderBoardNames, leaderBoardScores);
    } 
    else if (screenVariable == 3) {
      displayAndCentreImage(difficultyImg); // Background
      displayDifficultySlider();
    } 
    else if (screenVariable == 4) {
    }
}

function displayDifficultySlider(){
  fill(0); // make box black
  rect(width/2-140, height/2-30, 290, 70);
  difficultySlider.position(width/2-150, height/2-30); 
  // difficulty = difficultySlider.value();
}

// let slider;
// function setup() {
// }

// function draw() {
//   let val = slider.value();
//   background(val);
// }

function setup() { // Setup function - called once only
  frameRate(FPS); // Refresh only at stated FPS
  createCanvas(canvasWidth, canvasHeight);
  displayTitle();
  
  leaderBoardNames, leaderBoardScores = getTopPlayers(10);
  
  // Load instructions and Difficulty screens only once
  loadInstructions() ;
  loadDifficulty();
  
  gameState = "MENU"; // change gamestate
  
  // Min:1, Max:9, Default:5, Step:10
  difficultySlider = createSlider(1, 9, 5, 1); 
  difficultySlider.addClass("difficultySlider");
  
  
}


// 	Show difficulty slider
// If screenVariable == 4:
// 	Save value difficulty slider to global constant DIFFICULTY
// 	Display start button
// If screenVariable == 4:
// 	if mouseX and mouseY are on start button
// 		Set Game_state = START_GAME



function draw() { // Background loop - 60 times per second
  
  // Execute code relevant to current game state
  if (gameState == "MENU"){ 
    // Update screen variable if left mouse click pressed
    if (mouseIsPressed  && mouseButton === LEFT){
      // Only increment if mouse is held
      if (!mouseHeld) {
        // Increment and ensure its not > 2 using modulo operator(%)
        screenVariable = (screenVariable + 1) % 5; 
      }  
      mouseHeld = true; // Since button has now been clicked
    } else { // LMC not clicked
      mouseHeld = false;
    } 
    background(0); // Clear anything previously on screen
    menuScreens(screenVariable); // Display new relevant item to screen
     
  }
}