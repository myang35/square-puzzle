import { Grid } from "./grid";
import { GridNode } from "./grid-node";

export class Solver {
  grid: Grid;
  currentNode: GridNode;

  constructor(grid: Grid) {
    this.grid = grid;
    const goal = [
      [1,2,3],
      [4,5,6],
      [7,8,0]
    ];
    this.currentNode = new GridNode({grid: this.grid, goal: new Grid(goal)});
  }

  solve() {
    console.log('solving');
    // Initialize the open list
    const openList = [this.currentNode];

    // Initialize the closed list
    // put the starting node on the open
    // list (you can leave its f at zero)
    const closedList = [];

    // while the open list is not empty
    while (openList.length > 0) {
      // a) find the node with the least f on
      //    the open list, call it "q"
      let qIndex = 0;
      for (let i = 1; i < openList.length; i++) {
        if (openList[i] >= openList[i-1]) continue;
        qIndex = i;
      }

      // b) pop q off the open list
      const q = openList.splice(qIndex, 1);

      // c) generate q's 4 successors and set their
      //    parents to q
      const successors = [];

      // d) for each successor
        // i) if successor is the goal, stop search

        // ii) else, compute both g and h for successor
        //     successor.g = q.g + distance between successor and q
        //     successor.h = distance from goal to successor

        // iii) if a node with the same position as
        //      successor is in the OPEN list which has a
        //      lower f than successor, skip this successor

        // iv) if a node with the same position as successor is in the CLOSED list, which has a lower f than successor, skip this successor otherwise, add the node to the open list
      
      // end for loop

      // e) push q on the closed list

    } // end while loop
    console.log('solved');
  }
}