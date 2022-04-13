class Ghost {
  // Time parameter how long till ghost release, based on DIFFICULTY
  // Take parameter of selfs colour, else set to dark blue = (40,36,252)
  constructor(time, rgb=[40,36,252]) {
    // Location on 2D grid
    this.i = 12+time
    this.j = 14
    
    // Calculation for dynamic size
    this.rectSize = (height*29/900) | 0; // 29 at 900px height For same as image
    this.diameter = this.rectSize*33/29 // Calculate diameter once for when drawing itself

    this.dx = this.rectSize; // How much xPos changes each time
    this.dy = this.rectSize; // Will change later depending on difficulty and level 
    
    // Canvas coordinates
    this.xPos = 814.5-29*(14-this.i)// Initial positions
    this.yPos = 681.5-29*(23-this.j)
    
    
    this.pos= new p5.Vector(this.xPos, this.yPos); // create vector to store position for dynamic updating
    this.vel = new p5.Vector(1, 0); // Known speed it moves at
  
    this.maze = maze.grid;  // Discard object, keep array
    // this.grid = Array(this.maze.length);
    
    this.moveTimer = 10;
    this.moveTime = 0;
    this.releaseTimer = 25+20*time; // Seconds till release
    this.released = false;
    
    this.graph = new Graph();
    
    this.rgb = rgb;
    this.route = [];
    
  }
  
  //Draws ghost as an Rectangle (use image later)
  show() {
    fill(this.rgb[0], this.rgb[1], this.rgb[2]); // Filled with dark blue
    stroke(this.rgb[0], this.rgb[1], this.rgb[2]); // Dark blue outline
    rect(this.xPos, this.yPos, this.diameter);
    if(this.released){
      this.showRoute() // Draw fastest route to Pacman - will not work if in jail
    }
  }
  
  showRoute(){
    // for (var i = 0; i < path.length; i++) {
    // path[i].show(color(0, 0, 255));
    //}

    // Drawing path as continuous line
    noFill(); // Do not colour the inner shape
    stroke(this.rgb[0], this.rgb[1], this.rgb[2]); // Line colour
    strokeWeight(5); // Thickness of line
    beginShape(); // Start plotting lines
    
    // For each node in fastest route
    for (let index in this.route) { 
      let node = this.route[index];
      // Vertex = point where line must pass through
      vertex(814.5-29*(14-node.i), // x coordinate
             681.5-29*(23-node.j)); // y coordinate
    }
    // Line to itself
    vertex(814.5-29*(14-this.i), // x coordinate
           681.5-29*(23-this.j)); // y coordinate
    
    endShape(); // No more lines to plot
  }
  
  move(){
    this.moveTime++; // Increment timer
    if (!this.released){ // If not yet released
      // Check if allowed to be released
      if (this.releaseTimer < this.moveTime){ 
        this.released = true;
        this.moveTime = 0; // Reset timer
        this.pos.y -= 3*this.dy; // Set coordinate
        this.j -= 3; // Set grid index
      }
    } 
    else{ // Has been released
      // this.graph = new Graph();
      // Find fastest route and save it
      this.route = this.graph.aStar([this.i, this.j,], [player.i, player.j] );
      // When to move - based on difficulty
      if (this.moveTime>(10-DIFFICULTY)/3){ 
        this.moveTime = 0; // Reset timer
        // Assign next node in route
        let next = this.route.pop(); 
        // If Ghost has reached player
        if(next === undefined){ 
          gameState = "GAME_OVER"; // Change game state
          return // exit Since game is over
        }
        // Travel to next node
        this.i = next.i; // Change grid position
        this.j = next.j;
        this.xPos = 814.5-29*(14-next.i)-29/2; // Canvas x coordinate
        this.yPos = 681.5-29*(23-next.j)-29/2; // Canvas y coordinate}
      }
      this.showRoute(); // Display route with selfs colour
    
    
    }
  }
  
}