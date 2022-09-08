import { Grid } from "./grid";
import { GridNode } from "./grid-node";

export class Solver {
  grid: Grid;
  startNode: GridNode;
  moves: string[] = [];
  
  private currentWalkthroughTimeout?: any;

  constructor(grid: Grid) {
    this.grid = grid;
    this.startNode = new GridNode({grid: this.grid});

    // Find solution
    const solvedNode = this.findSolvedNode();
    if (solvedNode == null) {
      console.log("No solution");
      return;
    }
    this.moves = this.getMoves(solvedNode);
  }

  nextMove() {
    switch (this.moves.shift()) {
      case 'up':
        this.grid.moveUp();
        return 'up';
      case 'down':
        this.grid.moveDown();
        return 'up';
      case 'left':
        this.grid.moveLeft();
        return 'up';
      case 'right':
        this.grid.moveRight();
        return 'up';
      default:
        console.log("No move");
        return null;
    }
  }
  
  walkthrough() {
    this.currentWalkthroughTimeout = setTimeout(() => {
      if (this.nextMove() == null) return;
      this.walkthrough();
    }, 200);
  }

  stopWalkthrough() {
    clearTimeout(this.currentWalkthroughTimeout);
  }

  private findSolvedNode() {
    // Initialize the open list
    const openList: GridNode[] = [this.startNode];

    // Initialize the closed list
    // put the starting node on the open
    // list (you can leave its f at zero)
    const closedList: GridNode[] = [];

    let counter = 0;
    // while the open list is not empty
    while (openList.length > 0) {
      // a) find the node with the least f on
      //    the open list, call it "q"
      let qIndex = 0;
      for (let i = 1; i < openList.length; i++) {
        if (openList[i].f >= openList[i-1].f) continue;
        qIndex = i;
      }

      // b) pop q off the open list
      const q = openList.splice(qIndex, 1)[0];
      // console.log('q:', {
      //   aGrid: q.grid.grid[0],
      //   bGrid: q.grid.grid[1],
      //   cGrid: q.grid.grid[2],
      //   f: q.f,
      //   g: q.g,
      //   h: q.h
      // });

      // c) generate q's 4 successors and set their
      //    parents to q
      const successors = [];
      const moves = ["up", "down", "left", "right"];
      for (let i = 0; i < moves.length; i++) {
        const grid = new Grid(q.grid);
        successors.push(new GridNode({grid, parent: q, move: moves[i]}));
      }
      successors[0].grid.moveUp();
      successors[1].grid.moveDown();
      successors[2].grid.moveLeft();
      successors[3].grid.moveRight();

      let sucIndex = -1;
      // d) for each successor
      for (let successor of successors) {
        sucIndex++;
        // skip if successor is the same as q
        if (q.grid.equals(successor.grid)) continue;
        
        // switch (sucIndex) {
        //   case 0: console.log('successor-up:', {
        //     aGrid: successor.grid.grid[0],
        //     bGrid: successor.grid.grid[1],
        //     cGrid: successor.grid.grid[2],
        //     f: successor.f,
        //     g: successor.g,
        //     h: successor.h
        //   });
        //   break;
        //   case 1: console.log('successor-down:', {
        //     aGrid: successor.grid.grid[0],
        //     bGrid: successor.grid.grid[1],
        //     cGrid: successor.grid.grid[2],
        //     f: successor.f,
        //     g: successor.g,
        //     h: successor.h
        //   });
        //   break;
        //   case 2: console.log('successor-left:', {
        //     aGrid: successor.grid.grid[0],
        //     bGrid: successor.grid.grid[1],
        //     cGrid: successor.grid.grid[2],
        //     f: successor.f,
        //     g: successor.g,
        //     h: successor.h
        //   });
        //   break;
        //   case 3: console.log('successor-right:', {
        //     aGrid: successor.grid.grid[0],
        //     bGrid: successor.grid.grid[1],
        //     cGrid: successor.grid.grid[2],
        //     f: successor.f,
        //     g: successor.g,
        //     h: successor.h
        //   });
        //   break;
        //   default: console.log('INVALID SUCCESSOR');
        //   break;
        // }
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
        if (foundFasterPath) continue;

        // iv) if a node with the same position as successor is in the CLOSED list, which has a lower f than successor, skip this successor otherwise, add the node to the open list
        const alreadyVisitedPath = !!closedList.find(closedNode => {
          return closedNode.grid.equals(successor.grid) && closedNode.f < successor.f;
        });
        if (alreadyVisitedPath) continue;

        openList.push(successor);
      }
      // end for loop

      // e) push q on the closed list
      closedList.push(q);

    } // end while loop
    console.log('No solution');
    return null;
  }

  private getMoves(solvedNode: GridNode) {
    const moves: string[] = [];

    let currentNode = solvedNode;

    while (currentNode?.move != null) {
      moves.unshift(currentNode.move);
      currentNode = currentNode.parent!;
    }
    console.log('start:', currentNode?.grid.grid);
    console.log('moves:', moves);
    return moves;
  }
}