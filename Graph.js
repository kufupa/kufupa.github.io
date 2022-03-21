class Graph{
  
  constructor(){
    
    this.maze = maze.grid; // 2D array containing node types
    this.grid = Array(maze.grid.length); // Array for storing all nodes of graph
    this.rowLen = this.maze.length // Total number of rows in grid
    this.columnLen = this.maze[0].length // Number of nodes per row
    // Iterate through all items in 2D array
    for (let row = 0; row<this.rowLen; row++){ // For each row
      this.grid[row] = new Array(this.columnLen) // Add an empty array of column size
      for (let col = 0; col<this.columnLen; col++){ // For each column
        // Create nodes if not wall
        if (this.maze[row][col] != 1){
          this.grid[row][col] = new Node(col, row) // Add node
          this.addNeighbours(this.grid[row][col]) // Fill adjacency list
        }
      }
    }
  
    this.openSet = [];
    this.closedSet = [];
    this.route = [];
  
  }
  
  addNeighbours(node){
    let i = node.i;
    let j = node.j;
    if (i > 0 && this.maze[j][i-1] != 1){ // left
      node.neighbours.push([i-1, j])
    }
    if (i+1 < this.columnLen &&this.maze[j][i+1] != 1){ // right
      node.neighbours.push([i+1, j])
    }
    if (j > 0 && this.maze[j-1][i] != 1){ // up
      node.neighbours.push([i, j-1])
    }
    if (j+1 < this.rowLen && this.maze[j+1][i] != 1){ // down
      node.neighbours.push([i, j+1])
    }
    
  }
  
  resetPathfinding(){
    for(let i in this.openSet){
      this.openSet[i].reset();
    }
    for(let i in this.closedSet){
      this.closedSet[i].reset();
    }
    this.openSet = [];
    this.closedSet = [];
    this.route = [];
    
  }
  
  aStar(start, target){
    
    this.resetPathfinding();
    let sI = start[0];
    let sJ = start[1];
    let tI = target[0];
    let tJ = target[1];
    target = this.grid[tJ][tI];
    start = this.grid[sJ][sI];
    // Add starting node to openSet
    this.openSet.push(this.grid[sJ][sI]);
    let openSet = this.openSet
    let closedSet = this.closedSet
    let current = start; // Storing node currently being evaluated
    let curI = 0; // Index of current's index in openSet
    while(openSet.length > 0){ // While openSet not empty

      // Assign current to first item in openSet
      current = openSet[0];
      // current's index in openSet
      curI = 0; 
      
      // Current = path in openSet with lowest fScore
      for(let i = 1; i<openSet.length; i++){
        if (openSet[i].f < current.f){
          current = openSet[i];
          curI = i;
        }
      }
      // Remove node from openSet
      openSet.splice(curI, 1); 
      // Add nod to closedSet
      closedSet.push(current);
      
      if (current === target){
        return this.findRoute(current);
      }
      
      // For each neighbour of current
      for(let coords in current.neighbours){
        // Next = next node using coords of neighbours adjacency list
        coords = current.neighbours[coords] // Access from adjacency list
        let next = this.grid[coords[1]][coords[0]] 
        // if neighbour in closedSet
        if (closedSet.indexOf(next) != -1){ // Is in
          if (next.g > current.g+1){ // If faster route
            next.setPrevious(current); // Set new faster route
            openSet.push(next); // Add to openSet for evaluation
          }
        } else { // Not in closed set 
          next.setPrevious(current); // Node leading to it
          next.setH(target); // Calculate heuristic
          openSet.push(next); // Add to openSet for evaluation
        }
        
        
      }
      
    }
    
  }
  
  
  findRoute(current){ // Find fastest route to start node
    this.route = [] // add final node to list

    while (current.previous != null){ // check if start node has been reached
      this.route.push(current) // add previous node to list
      current = current.previous // evaluate previous node
    }
    
    return this.route // return route from final to start node
  }
  
  
  showRoute(){ // Draw white line tracing aStar route
    // for (var i = 0; i < path.length; i++) {
    // path[i].show(color(0, 0, 255));
    //}

    // Drawing path as continuous line
    noFill(); // Do not colour the inner shape
    // stroke(this.rgb[0], this.rgb[1], this.rgb[2]); // Line colour
    stroke(250, 250, 250); // Line colour - White
    strokeWeight(5); // Thickness of line
    beginShape(); // Start plotting lines
    // For each node in fastest route
    for (let index in this.route) { 
      let node = this.route[index];
      // Vertex = point where line must pass through
      vertex(814.5-29*(14-node.i), // x coordinate
             681.5-29*(23-node.j)); // y coordinate
    }
    endShape(); // No more lines to plot
  }
  
  
  
}