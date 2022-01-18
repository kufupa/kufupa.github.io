// An object for each position(node) in the grid
class Node {

  constructor(i, j, previous){
    // Location
    this.i = i;
    this.j = j;
    
    // f, g, and h values for A*
    this.f = 0;
    this.g = 0;
    this.h = 0;

    // Where did I come from?
    this.previous = previous;
    
  }
}

//     // Neighbors
//     this.neighbors = [];

function findRoute(current){ // Find fastest route to start node
  route = [current] // add final node to list
  
  while (current.previous != null){ // check if start node has been reached
    route.push(current.previous) // add previous node to list
    current = current.previous // evaluate previous node
  }
  
  return route // return route from final to start node
}
