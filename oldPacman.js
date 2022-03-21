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
    this.xPos = 681.5 // Initial positions
    this.yPos = 814.5
    
    
    this.pos= new p5.Vector(this.xPos, this.yPos); // create vector to store position for dynamic updating
    this.vel = new p5.Vector(1, 0); // Known speed it moves at
  
    //For temporarily storing user input
    this.turnTo = new p5.Vector(-1, 0);
    this.turn = false; // Indicating when user input occurs
    
    // General variables
    this.score = 0;
    this.gameOver = false;
    
    this.maze = new Maze();
    this.maze = this.maze.grid;  // Discard object, keep array
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
    
    // Process user input
    if (this.turn){
      this.turn = false; // As user input processed    
      // If can move in that direction
      // index using [row][column]
      if (this.maze[this.j + this.turnTo.y][this.i + this.turnTo.x]!=1){ 
        this.vel = this.turnTo // Set velocity to that direction
      }
    }
    
    // Check if can move onto node in that direction
    // - can if it is not a wall
    if (this.maze[this.j + this.vel.y][this.i + this.vel.x]!=1){ 
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





class Pacman {

  constructor() {
    this.i = 23
    this.j = 13
    
    this.rectSize = (height*29/900) | 0; // 29 at 900px height For same as image

    this.dx = this.rectSize; // How much xPos changes each time

    this.dy = this.rectSize;

    this.xPos = 814.5-this.dy
    this.yPos = 681.5
    

    this.pos= new p5.Vector(this.xPos, this.yPos);
    this.vel = new p5.Vector(-1, 0);
  
    //when pacman reaches a node its velocity changes to the value stored in turnto
    this.turnTo = new p5.Vector(-1, 0);
    this.turn = false;
    this.score = 0;
    this.gameOver = false;
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  
  //draws pacman
  show() {
    fill(255, 255, 0);
    stroke(255, 255, 0);
    ellipse(this.pos.x, this.pos.y, 33);
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  //move pacman if not facing wall
  move() {
    if (checkPosition()) {
      pos.add(vel);
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  
  //returns whether the input vector hits pacman
   hitPacman( GhostPos) {
    if (dist(GhostPos.x, GhostPos.y, this.pos.x, this.pos.y) < 10) {
      return true;
    }
    return false;
  }
  
  
  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  //called when a ghost hits pacman
  kill() {
    lives -=1;
    if (lives < 0) {//game over if no lives left
      gameOver = true;
    } else {
      this.pos= new p5.Vector(13*16+8, 23*16 +8);     //reset positions  

      blinky = new Blinky();
      clyde = new Clyde();
      pinky = new Pinky();
      inky = new Inky();
      vel = new p5.Vector(-1, 0);
      turnTo = new p5.Vector(-1, 0);
    }
  }

  //-------------------------------------------------------------------------------------------------------------------------------------------------
  //returns whether pacman can move i.e. there is no wall in the direction of vel
   checkPosition() {

    if ((this.pos.x-8)%16 == 0 && (this.pos.y - 8)% 16 ==0) {//if on a critical position

       matrixPosition = new p5.Vector((this.pos.x-8)/16, (this.pos.y - 8)/16);//convert position to an array position

      //reset all the paths for all the ghosts  
      blinky.setPath();
      pinky.setPath();
      clyde.setPath();
      inky.setPath(); 
      
      //check if the position has been eaten or not, note the blank spaces are initialised as already eaten
      if (!tiles[floor(matrixPosition.y)][floor(matrixPosition.x)].eaten) {
        tiles[floor(matrixPosition.y)][floor(matrixPosition.x)].eaten =true;
        score +=1;//add a point
        if (tiles[floor(matrixPosition.y)][floor(matrixPosition.x)].bigDot) {//if big dot eaten
          //set all ghosts to frightened
          blinky.frightened = true;
          blinky.flashCount = 0;
          clyde.frightened = true;
          clyde.flashCount = 0;
          pinky.frightened = true;
          pinky.flashCount = 0;
          inky.frightened = true;
          inky.flashCount = 0;
        }
      }
      
      
       positionToCheck= new p5.Vector(matrixPosition.x + turnTo.x, matrixPosition.y+ turnTo.y); // the position in the tiles double array that the player is turning towards

      if (tiles[floor(positionToCheck.y)][floor(positionToCheck.x)].wall) {//check if there is a free space in the direction that it is going to turn
        if (tiles[floor(matrixPosition.y + vel.y)][floor(matrixPosition.x + vel.x)].wall) {//if not check if the path ahead is free
          return false;//if neither are free then dont move
        } else {//forward is free
          return true;
        }
      } else {//free to turn
        vel = new p5.Vector(turnTo.x, turnTo.y);
        return true;
      }
    } else {
      if ((this.pos.x+10*vel.x-8)%16 == 0 && (this.pos.y + 10*vel.y - 8)% 16 ==0) {//if 10 places off a critical position in the direction that pacman is moving
         matrixPosition = new p5.Vector((this.pos.x+10*vel.x-8)/16, (this.pos.y+10*vel.y-8)/16);//convert that position to an array position
        if (!tiles[floor(matrixPosition.y)][floor(matrixPosition.x)].eaten ) {//if that tile has not been eaten 
          tiles[floor(matrixPosition.y)][floor(matrixPosition.x)].eaten =true;//eat it
          score +=1;
          println("Score:", score);
          if (tiles[floor(matrixPosition.y)][floor(matrixPosition.x)].bigDot) {//big dot eaten
            //set all ghosts as frightened
            blinky.frightened = true;
            blinky.flashCount = 0;
            clyde.frightened = true;
            clyde.flashCount = 0;
            pinky.frightened = true;
            pinky.flashCount = 0;
            inky.frightened = true;
            inky.flashCount = 0;
          }
        }
      }
      if (turnTo.x + vel.x == 0 && vel.y + turnTo.y ==0) {//if turning chenging directions entirely i.e. 180 degree turn
        vel = new p5.Vector(turnTo.x, turnTo.y);//turn
        return true;
      }
      return true;//if not on a critical postion then continue forward
    }

  }
}
