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
    this.currentNode = new GridNode({grid: this.grid});
  }

  solve() {
    console.log('solving');
    // Initialize the open list
    const openList: GridNode[] = [this.currentNode];

    // Initialize the closed list
    // put the starting node on the open
    // list (you can leave its f at zero)
    const closedList: GridNode[] = [];

    let counter = 0;
    // while the open list is not empty
    while (openList.length > 0 && counter++ < 3) {
      // a) find the node with the least f on
      //    the open list, call it "q"
      let qIndex = 0;
      for (let i = 1; i < openList.length; i++) {
        if (openList[i] >= openList[i-1]) continue;
        qIndex = i;
      }

      // b) pop q off the open list
      const q = openList.splice(qIndex, 1)[0];
      console.log('q:', {
        aGrid: q.grid.grid[0],
        bGrid: q.grid.grid[1],
        cGrid: q.grid.grid[2],
        f: q.f,
        g: q.g,
        h: q.h
      });

      // c) generate q's 4 successors and set their
      //    parents to q
      const successors = [];
      for (let i = 0; i < 4; i++) {
        const grid = new Grid(q.grid);
        successors.push(new GridNode({grid, parent: q}));
      }
      successors[0].grid.moveUp();
      successors[1].grid.moveDown();
      successors[2].grid.moveLeft();
      successors[3].grid.moveRight();

      let sucIndex = 0;
      // d) for each successor
      for (let successor of successors) {
        switch (sucIndex) {
          case 0: console.log('successor-up:', {
            aGrid: successor.grid.grid[0],
            bGrid: successor.grid.grid[1],
            cGrid: successor.grid.grid[2],
            f: successor.f,
            g: successor.g,
            h: successor.h
          });
          break;
          case 1: console.log('successor-down:', {
            aGrid: successor.grid.grid[0],
            bGrid: successor.grid.grid[1],
            cGrid: successor.grid.grid[2],
            f: successor.f,
            g: successor.g,
            h: successor.h
          });
          break;
          case 2: console.log('successor-left:', {
            aGrid: successor.grid.grid[0],
            bGrid: successor.grid.grid[1],
            cGrid: successor.grid.grid[2],
            f: successor.f,
            g: successor.g,
            h: successor.h
          });
          break;
          case 3: console.log('successor-right:', {
            aGrid: successor.grid.grid[0],
            bGrid: successor.grid.grid[1],
            cGrid: successor.grid.grid[2],
            f: successor.f,
            g: successor.g,
            h: successor.h
          });
          break;
          default: console.log('INVALID SUCCESSOR');
          break;
        }
        // i) if successor is the goal, stop search
        if (successor.grid.isComplete()) return successor;

        // ii) else, compute both g and h for successor
        //     successor.g = q.g + distance between successor and q
        //     successor.h = distance from goal to successor
        // Implemented within GridNode

        // iii) if a node with the same position as
        //      successor is in the OPEN list which has a
        //      lower f than successor, skip this successor
        let foundFasterPath = false;
        for (let openNode of openList) {
          if (openNode.grid.equals(successor.grid) && openNode.f < successor.f) {
            foundFasterPath = true;
            break;
          }
        }
        if (foundFasterPath) break;

        // iv) if a node with the same position as successor is in the CLOSED list, which has a lower f than successor, skip this successor otherwise, add the node to the open list
        const alreadyVisitedPath = !!closedList.find(closedNode => {
          return closedNode.grid.equals(successor.grid) && closedNode.f < successor.f;
        });
        if (alreadyVisitedPath) break;

        openList.push(successor);
        sucIndex++;
      }
      // end for loop

      // e) push q on the closed list
      closedList.push(q);

    } // end while loop
    console.log('No solution');
    return null;
  }
}