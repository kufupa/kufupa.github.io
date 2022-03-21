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
let mazeImage; // START_GAME game state

// Variables for leaderboard data
let leaderBoardScores = []; // Scores sorted ascendingly
let leaderBoardNames = []; // Names, respective to score achieved
let leaderBoardText = ""; // Text written or read from storage

// Menu game state variables
let screenVariable = 5; // Which screen to display
let mouseHeld = false;
let difficultySlider; // Assigned to difficulty slider in background loop 
let DIFFICULTY; // Difficulty value saved from slider

// START-GAME game state variables
let scoreCounter = 0;
let levelCounter = 0;
// Will take away DIFFICULTY/3 once DIFFICULTY has been assigned during runtime
let lifeCounter = 6; 

let maze; // Variable for 2D grid array
let player;
let change = false;
let song;

let blinky = [240,36,36]; // Blinky is red ghost
let pinky = [256,188,220]; // Pinky is pink ghost
let inky = [8,252,220]; // Inky is blue ghost
let clyde = [256,180,76]; // Clyde is orange ghost

let allGhosts = [blinky, clyde, pinky, inky];
// Define array, not currently initialsed since number of ghosts decided based on difficulty input of user
let ghostArray = []; 

function countdownTimer(){
  // setInterval(function(){ // also tried setTimeout
  //   text("HEYO", width/2, height/2)
  // } , 1000 )
  for(let i = 0; i<60*5; i++){
    switch(i){
      case i<60*2:
        break;
      case i<60*3:
        break;
      case i<60*4:
        break;
      case i<60*5:
        break;
    }
  }
    
}

// Draw vertical and horizontal lines on maze to visualise grid data structure
function createMazeLines(){ 
  stroke(255, 255, 0); // Change colour of line  
  change = 29
  
  sy = 0
  sx = 394
  
  // line(0, sy, width, sy); // horizontal
  // line(sx, 0, sx, height); // Vertical
  // line(0, sy + y, width, sy + y); // horizontal
  // line(sx + x, 0, sx + x, height); // Vertical
  rectNumber = 33
  
  for (let i=1; i<rectNumber; i++){
    // line(x1, y1, x2, y2)
    line(394, sy, width-394, sy); // horizontal
    line(sx, 0, sx, height); // Vertical
    sy += change
    sx += change
  }
}


function loadMaze(){ // Load and display maze screen
  
  mazeImage = loadImage("Assets/maze.jpg", 
    // Resize the image to fit on the screen.                  
    // Whole height of canvas and same proportion for width 
    mazeImage => {mazeImage.resize(0, height)} // Resize on successful callback
  ); 
  // Calculate resize width
  // Keep aspect ratio for width, and use bitwise OR to convert to int
  // newWidth = (mazeImage.width/mazeImage.height * height) | 0 
  displayAndCentreImage(mazeImage); // Display it after the resize
}

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
  text("HIGH SCORES", xPos-xDistance, yPos);
  yPos += yDistance + 50;
  
  fill(0, 200, 200); // Colour of text - Cyan
  textSize(70); // Size of text - p5js procedure
  
  for(let i=names.length-1; i>-1; i--){ // Loop through all the different scores
    text(names[i], xPos-xDistance, yPos); // Display name
    text(scores[i], xPos+xDistance, yPos); // Display text
    yPos += yDistance; // Update vertical position for next pair of data
  }
  
}

function displayContinueText(){
  textSize(40); // Size of text - p5js procedure
  fill(255, 255, 255); // Colour of text - white
  // text("Click to continue", width/2-160, height/2+350); // Centered
  text("Click to continue", 0, 40);
}

function displayEndScreen(){
  background(0); // Black background, cover up previous frame
  textSize(120); // Size of text - p5js procedure
  fill(255, 255, 255); // Colour of text - white
  // text("Click to continue", width/2-160, height/2+350); // Centered
  let dy = 60;
  let dx = 340;
  text("GAME OVER", width/2-dx, height/2-dy-20);
  
  textSize(70); // Size of text - p5js procedure
  fill(200, 200, 255); // Colour of text - lavender
  stroke(200, 200, 255); // Outline colour - lavender
  text("Score: "+String(player.score), width/2-dx, height/2+90-dy); // Render text at bottom left of canvas
  text("Level: "+String(player.level), width/2-dx+490, height/2+90-dy)
    
  
}

function menuScreens(screenVariable){ // For what to display on screen
  if (screenVariable == 0){ // Loading screen
    displayAndCentreImage(titleImage);
    displayContinueText();
  } 
  else if (screenVariable == 1) { // Instructions screen
    displayAndCentreImage(instructionsImg);
    displayContinueText();
  } 
  else if (screenVariable == 2) { // Leaderboard screen
    displayLeaderboard(leaderBoardNames, leaderBoardScores);
    displayContinueText();
  } 
  // Use >= so that extra clicks do not change screen
  else if (screenVariable >= 3) { // Difficulty screen
    displayAndCentreImage(difficultyImg); // Background
    displayDifficultySlider(); // Show the slider
    displayStartButton(); // Show the start button   
  } 
  else{
    print("ERROR") // As this should never occur
  }
  
}

function displayDifficultySlider(){
  fill(0); // make rect black
  rect(width/2-140, height/2-30, 290, 70); // Cover up anything behind it
  difficultySlider.position(width/2-150, height/2-30); 
}


function displayStartButton(){
  // Set position so it can be displayed
  startButton.position(width/2-100, height/2+175); 
}

function exitMenuState(){
  // Save the current difficulty value
  DIFFICULTY = difficultySlider.value(); 
  // Change lifeCounter variable to account for difficulty
  lifeCounter -= DIFFICULTY/3 | 0
  // Hide slider and button
  difficultySlider.remove();
  startButton.remove();
  gameState = "START_GAME"; // change gamestate
  loadMaze(); // Load maze image and display it
}

function keyTyped() {
  x = y = 0; // Multiple assigment
  // Using logical OR "||" to make it non case sensitive
  if (key === 'w' || key === "W") {
    y = -1 // As moving up
  } else if (key === 's' || key === "S") {
    y = 1 // Moving down
  } else if (key === 'a' || key === "A") {
    x = -1 // Moving left
  } else if (key === 'd' || key === "D") {
    x = 1 // Moving right
  }
  
  if (x!=0 || y!= 0){ // Valid input
    player.setInput(x, y) // Call input method for player
  }
  
  // To prevent any default behavior, return false
  return false;
}

function generateGhosts(DIFFICULTY){
  let numGhosts = (DIFFICULTY+1)/3||0 + 1; // Number of ghosts
  for(let i = 0; i<numGhosts; i++){
    let gho = new Ghost( i, allGhosts[i] ); // instantiate new ghost
    ghostArray.push(gho); // Add ghost instance to array
  }
  print(ghostArray) // Debugging
  
}


function setup() { // Setup function - called once only
  frameRate(FPS); // Refresh only at stated FPS
  pixelDensity(1); // Compatability for different sized browsers
  createCanvas(canvasWidth, canvasHeight);
  // displayTitle();
  
  leaderBoardNames, leaderBoardScores = getTopPlayers(10);
  
  // Load instructions and Difficulty screens only once
  loadInstructions() ;
  loadDifficulty();
  
  gameState = "START_GAME"; // change gamestate
  
  
  // Create slider with Min:1, Max:9, Default:5, Step:1
  difficultySlider = createSlider(1, 9, 5, 1); 
  // Add CSS styling to slider
  difficultySlider.addClass("difficultySlider"); 
  // Initliase slider offscreen so that it is not visible
  difficultySlider.position(-1000, -1000); 
  
  
  // Create button with text "PLAY"
  startButton = createButton("PLAY");
  // Add CSS styling to button
  startButton.addClass("startButton"); 
  // Add callback for when it is pressed
  startButton.mousePressed(exitMenuState);
  // Initliase button offscreen so that it is not visible
  startButton.position(-1000, -1000); 
  
  maze = new Maze();
  player = new Pacman();
  song = loadSound("Assets/music.m4a"); // Load and play music once game begins


}



function draw() { // Background loop - 60 times per second
  
  // Execute code relevant to current game state
  if (gameState == "MENU"){ 
    // Update screen variable if left mouse click pressed
    if (mouseIsPressed  && mouseButton === LEFT){
      // Only increment if mouse is held
      if (!mouseHeld) {
        // Increment
        screenVariable = screenVariable + 1; 
      }  
      mouseHeld = true; // Since button has now been clicked
    } else { // LMC not clicked
      mouseHeld = false;
    } 
    background(0); // Clear anything previously on screen
    menuScreens(screenVariable); // Display new relevant item to screen
     
  }
  else if (gameState == "START_GAME"){ // Game state
    background(0); // Apply black background & cover anything previously displayed
    displayAndCentreImage(mazeImage);
    // createMazeLines();
    maze.show() // Draw grid to screen
    gameState = "PLAYING"
    song.play(); // Only start playing once - avoid too much memory usage
    generateGhosts(DIFFICULTY); // Generate ghosts
    
  }
  else if (gameState == "PLAYING"){ // Game state
    // countdownTimer() // TEST
    background(0); // Apply black background & cover anything previously displayed
    displayAndCentreImage(mazeImage);
    maze.show(); // Draw grid to screen
    player.show(); // 
    player.displayScore(); // Render current score as text to screen
    change = player.move();
    
    for (let i in ghostArray){
      ghostArray[i].show()
    }
    if (change) {
      for (let i in ghostArray){
        ghostArray[i].move()
      }
      if(change !== true){
        maze.grid[change[1]][change[0]] = 6; // Set it to be eaten
      }
    }
    
    
    // me = new Graph(); // initialise new test graph
    // // Find fastest route between these two paths on grid
    // a = me.aStar([player.i, player.j], [13, 11]); 
    // me.showRoute(); // Display route
    
    // print(frameRate()) // Print current FPS to monitor performance
  }
  
  else if (gameState == "GAME_OVER"){
    displayEndScreen(); // Procedure for final end screen
  }
  
}



// Load difficulty constant
// 	Spawn that many ghosts

