// Declare all variables
let canvasWidth = 1600;
let canvasHeight = 900;
let gameState = null;

// Variables for the images that will be loaded
let titleImage; // title & loading screen image
let instructionsImg; // controls and game information image
let difficultyImg; // pictures for the 3 difficulty icons

// Load and display title screen
function displayTitle(){ 
  background(0); // Apply black background
  
  loadImage("Assets/titleScreen.jpg", // Load screen
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
  if (!localStorage.getItem('leaderboard')){ // if no scores stored
    localStorage.setItem('myCat', 'Tom'); // add leaderboard with default vales
  } else { // load the stored score
    console.log(localStorage.getItem('myCat')) 
  }
 
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  displayTitle();
}

// LeaderboardText = getTopPlayers(10) // to get top 10 players from leaderboard.csv file
// Load Leaderboard screen
// Display LeaderboardText
// Set gameState = MENU
// Set paused = False// initialize variable
// backgroundLoop(gameState) 



function draw() {
  // background(0);
}