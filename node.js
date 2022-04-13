// An object for each position(node) in the grid
class Node {

  constructor(i, j){
    // Location on grid
    this.i = i;
    this.j = j;
    
    // f, g, and h values for A*
    this.f = 0; // f = g + h
    this.g = 0; // g = dist from start
    this.h = 0; // h = heuristic
    
    // Node which leads to it
    this.previous = null;
    
    // Adjacency list for graph data structure
    this.neighbours = [];
    
  }
  
  reset(){ // Reset after each path found for next time
    // f, g, and h values for A*
    this.f = 0;
    this.g = 0;
    this.h = 0;
    
    // Node which leads to it
    this.previous = null;
  }
  
  // Assign node to the node which leads to it
  setPrevious(current){ 
    this.previous = current;
    this.setG(current);
  }
  
  // Calculate estimated distance to the target node
  setH(target){
    this.h = this.heuristic(target)
    this.f = this.g + this.h
  }
  
  // Distance travelled from the start node
  setG(current){
    this.g = current.g + 1
    this.f = this.g + this.h
  }
  
  // Algorithm for estimate of distance to target node
  heuristic(b){ // Manhattan distance
    return abs(this.i - b.i) + abs(this.j - b.j);
  }
  
}



