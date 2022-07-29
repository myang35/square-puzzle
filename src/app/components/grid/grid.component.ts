import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  blocks: number[][] = [[1,2,3],[4,-1,5],[6,7,8]];
  blankPos = {
    x: 1,
    y: 1
  }

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('keydown', (e) => {
      console.log(e.key);
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
        default:
          break;
      }
    })
  }

  moveLeft() {
    if (this.blankPos.x >= this.getWidth()-1) return;
    this.move(this.blankPos.x + 1, this.blankPos.y);
  }

  moveRight() {
    if (this.blankPos.x <= 0) return;
    this.move(this.blankPos.x - 1, this.blankPos.y);
  }

  moveUp() {
    if (this.blankPos.y >= this.getHeight()-1) return;
    this.move(this.blankPos.x, this.blankPos.y + 1);
  }

  moveDown() {
    if (this.blankPos.y <= 0) return;
    this.move(this.blankPos.x, this.blankPos.y - 1);
  }

  private move(x: number, y: number) {
    this.blocks[this.blankPos.y][this.blankPos.x] = this.blocks[y][x];
    this.setBlank(x, y);
  }

  private setBlank(x: number, y: number) {
    this.blankPos.x = x;
    this.blankPos.y = y;
    this.blocks[this.blankPos.y][this.blankPos.x] = -1;
  }

  private getWidth() {
    return this.blocks[0].length;
  }

  private getHeight() {
    return this.blocks.length;
  }

  private isComplete(): boolean {
    let counter = 1;
    // for (let block of this.blocks) {
    //   if (block === counter) {
    //     block++;
    //   }
    // }
    return counter === 9;
  }

}
