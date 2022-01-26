// Declare all variables
let canvasWidth = 1600;
let canvasHeight = 900;
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
  
  return (leaderBoardNames, leaderBoardScores)
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
  
  let xDistance = 175;
  let yDistance = 75;
  let xPos = width/2;
  let yPos = yDistance + 20;
  
  
  fill(0, 102, 153);
  textSize(75)
  for(let i=0; i<names.length; i++){
    text(names[i], xPos-xDistance, yPos);
    text(scores[i], xPos+xDistance, yPos);
    yPos += yDistance;
  }
  
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  displayTitle();
  
  leaderBoardNames, leaderBoardScores = getTopPlayers(10);
  
  // Load instructions and Difficulty screens only once
  loadInstructions() ;
  loadDifficulty();
  
  gameState = "MENU"; // change gamestate
  
}

// backgroundLoop(gameState) 



function draw() {
  displayLeaderboard(leaderBoardNames, leaderBoardScores);
  // background(0);
}