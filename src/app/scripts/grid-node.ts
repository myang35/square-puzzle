import { Grid } from "./grid";

export class GridNode {
  grid: Grid;
  goal: Grid;
  successor?: GridNode;
  g: number;

  constructor(args: {grid: Grid, goal: Grid, successor?: GridNode, g?: number}) {
    this.grid = args.grid;
    this.goal = args.goal;
    this.successor = args.successor;
    this.g = args.g ?? 0;
  }

  get f() {
    return this.g + this.h;
  }

  get h() {
    let result = 0;
    for (let i = 0; i < this.grid.width; i++) {
      for (let j = 0; j < this.grid.height; j++) {
        if (this.grid.getBlock(i, j) !== this.goal.getBlock(i, j)) continue;
        result++;
      }
    }
    return result;
  }
}