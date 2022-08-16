import { Solver } from "./solver";

export class Grid {
  BLANK_VALUE = 0;

  grid: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];

  constructor(grid?: number[][]) {
    if (grid) {
      const cloneGrid = [];
      for (let i = 0; i < grid.length; i++) {
        cloneGrid[i] = [...grid[i]];
      }
      this.grid = cloneGrid;
    }
  }

  get blankPos() {
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[0].length; y++) {
        if (this.grid[y][x] === this.BLANK_VALUE) {
          return { x, y };
        }
      }
    }
    return {
      x: -1,
      y: -1,
    };
  }
  
  shuffle() {
    for (let i = 0; i < 1000; i++) {
      const randomMove = Math.floor(Math.random() * 4);
      switch (randomMove) {
        case 0:
          this.moveUp();
          break;
        case 1:
          this.moveDown();
          break;
        case 2:
          this.moveLeft();
          break;
        case 3:
          this.moveRight();
          break;
        default:
          console.log('Invalid Move');
          break;
      }
    }
  }

  setBlock(x: number, y: number, value: number) {
    this.grid[y][x] = value;
  }

  getBlock(x: number, y: number) {
    return this.grid[y][x];
  }

  setBlank(x: number, y: number) {
    this.setBlock(x, y, this.BLANK_VALUE);
  }

  get width() {
    return this.grid[0].length;
  }

  get height() {
    return this.grid.length;
  }

  get numBlocks() {
    return this.width * this.height;
  }

  isComplete(): boolean {
    let counter = 1;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (counter === this.numBlocks) {
          return true;
        } else if (this.getBlock(x, y) === counter) {
          counter++;
        } else {
          return false;
        }
      }
    }
    return true;
  }

  // CONTROLLER
  moveLeft() {
    if (this.blankPos.x >= this.width - 1) return;
    this.move(this.blankPos.x + 1, this.blankPos.y);
  }

  moveRight() {
    if (this.blankPos.x <= 0) return;
    this.move(this.blankPos.x - 1, this.blankPos.y);
  }

  moveUp() {
    if (this.blankPos.y >= this.height - 1) return;
    this.move(this.blankPos.x, this.blankPos.y + 1);
  }

  moveDown() {
    if (this.blankPos.y <= 0) return;
    this.move(this.blankPos.x, this.blankPos.y - 1);
  }

  move(x: number, y: number) {
    this.setBlock(this.blankPos.x, this.blankPos.y, this.getBlock(x, y));
    this.setBlank(x, y);
  }

  // SOLVER
  solve() {
    const solver = new Solver(this);
    solver.solve();
  }
}