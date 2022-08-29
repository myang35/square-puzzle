import { Grid } from "./grid";

export class GridNode {
  grid: Grid;
  parent?: GridNode;

  constructor(args: {grid: Grid, parent?: GridNode}) {
    this.grid = args.grid;
    this.parent = args.parent;
  }

  get f(): number {
    return this.g + this.h;
  }

  get g(): number {
    let counter = 0;
    let currentNode: GridNode = this;
    while (currentNode.parent) {
      counter++;
      currentNode = currentNode.parent;
    }
    return counter;
  }

  get h(): number {
    let result = 0;
    for (let x = 0; x < this.grid.width; x++) {
      for (let y = 0; y < this.grid.height; y++) {
        const block = this.grid.getBlock(x, y);
        const goalIndex = this.grid.goalIndexOfBlock(block);
        if (goalIndex == null) continue;
        result += Math.abs(goalIndex.x - x);
        result += Math.abs(goalIndex.y - y);
      }
    }
    return result;
  }
}