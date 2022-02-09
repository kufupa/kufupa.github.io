class Pacman {

  constructor() {
    // Location on 2D grid
    this.i = 13
    this.j = 23
    
    // Calculation for dynamic size
    this.rectSize = (height*29/900) | 0; // 29 at 900px height For same as image
    this.diameter = this.rectSize*33/29 // Calculate diameter once for when drawing itself

    this.dx = this.rectSize; // How much xPos changes each time
    this.dy = this.rectSize; // Will change later depending on difficulty and level 
    
    // Canvas coordinates
    this.xPos = 814.5-this.dy // Initial positions
    this.yPos = 681.5
    
    
    this.pos= new p5.Vector(this.xPos, this.yPos); // create vector to store position for dynamic updating
    this.vel = new p5.Vector(1, 0); // Known speed it moves at
  
    //For temporarily storing user input
    this.turnTo = new p5.Vector(-1, 0);
    // this.turn = false; // Indicating when user input occurs
    
    // General variables
    this.score = 0;
    this.gameOver = false;
    
    this.maze = new Maze();
    this.maze = this.maze.grid;  // Discard object, keep array
    
    this.moveTimer = 10;
    this.moveTime = 0;
    
  }
  
  resetPos(){ // reset positions on grid and on canvas
    // Location on 2D grid
    this.i = 13
    this.j = 23
    
    // Canvas coordinates
    this.xPos = 814.5-this.dy
    this.yPos = 681.5
  }
  
  updatePos(){
    this.j += this.vel.y
    this.i += this.vel.x
    this.pos.x += this.vel.x * this.dx
    this.pos.y += this.vel.y * this.dy
  }
  
  move(){
    if (this.moveTime < this.moveTimer){
      this.moveTime++; // Increment as one frame closer to moving
      return false// Exit as not time to move yet
    } else{
      this.moveTime = 0; // Reset time as it will now move
    }
      
    // Process user input
    // if (this.turn){
      // this.turn = false; // As user input processed    
      // If can move in that direction
      // index using [row][column]
      if (this.maze[this.j + this.turnTo.y][this.i + this.turnTo.x]!=1){ 
        this.vel = this.turnTo // Set velocity to that direction
      }
    // }
    
    // Check if can move onto node in that direction
    let nextNode = this.maze[this.j + this.vel.y][this.i + this.vel.x]
    if (nextNode!=1){ // - can if it is not a wall
      this.updatePos()    
    }
    

// 			If pellet in path
// 				Increment score by 10
// 				Remove pellet from grid
// 			Else If powerPellet in path
// 				Increment score by 50
// 				Set ghostState = vulnerable
// Remove powerPellet from grid
// 		Display Pacman
// 		If all pellets are eaten
// 			levelBeat()
    
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  
  //Draws pacman as an circle (use image later)
  show() {
    fill(255, 255, 0); // Filled with yellow
    stroke(255, 255, 0); // Yellow outline
    ellipse(this.pos.x, this.pos.y, this.diameter);
  }
  
  setInput(x, y) {
    //For temporarily storing user input
    this.turnTo = new p5.Vector(x, y);
    this.turn = true; // Indicating when user input occured
    // print(this.turnTo.x, this.turnTo.y, this.vel.x, this.vel.y) // Check if they point to same thing
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  //move pacman if not facing wall
  

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  
  //returns whether the input vector hits pacman
   hitPacman(GhostPos) {
    if (dist(GhostPos.x, GhostPos.y, this.pos.x, this.pos.y) < 10) {
      return true;
    }
    return false;
  }
  
  
  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  //called when a ghost hits pacman
  kill() {
    lives -=1;
    if (lives < 0) { //game over if no lives left
      gameOver = true;
    } else { //reset positions  
      this.pos= new p5.Vector(13*16+8, 23*16 +8);     
    }
  }

  //-------------------------------------------------------------------------------------------------------------------------------------------------
  //returns whether pacman can move i.e. there is no wall in the direction of vel
   checkPosition() {

   }
}