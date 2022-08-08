import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  BLANK_VALUE = 0;

  grid: number[][] = [
    [1, 2, 3],
    [4, 0, 5],
    [6, 7, 8],
  ];
  blankPos = {
    x: 1,
    y: 1,
  };

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          this.moveUp();
          break;
        case 'ArrowDown':
          this.moveDown();
          break;
        case 'ArrowLeft':
          this.moveLeft();
          break;
        case 'ArrowRight':
          this.moveRight();
          break;
        case 'Enter':
          this.shuffle();
          break;
        default:
          break;
      }
    });
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
    this.blankPos = { x, y };
  }

  getWidth() {
    return this.grid[0].length;
  }

  getHeight() {
    return this.grid.length;
  }

  getNumBlocks() {
    return this.getWidth() * this.getHeight();
  }

  isComplete(): boolean {
    let counter = 1;
    for (let y = 0; y < this.getHeight(); y++) {
      for (let x = 0; x < this.getWidth(); x++) {
        if (counter === this.getNumBlocks()) {
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
    if (this.blankPos.x >= this.getWidth() - 1) return;
    this.move(this.blankPos.x + 1, this.blankPos.y);
  }

  moveRight() {
    if (this.blankPos.x <= 0) return;
    this.move(this.blankPos.x - 1, this.blankPos.y);
  }

  moveUp() {
    if (this.blankPos.y >= this.getHeight() - 1) return;
    this.move(this.blankPos.x, this.blankPos.y + 1);
  }

  moveDown() {
    if (this.blankPos.y <= 0) return;
    this.move(this.blankPos.x, this.blankPos.y - 1);
  }

  private move(x: number, y: number) {
    this.setBlock(this.blankPos.x, this.blankPos.y, this.getBlock(x, y));
    this.setBlank(x, y);
  }

  // SOLVER
}
