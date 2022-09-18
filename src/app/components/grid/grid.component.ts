import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Grid } from 'src/app/scripts/grid';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  @Output() nextMove = new EventEmitter();

  grid: Grid;

  constructor() {
    this.grid = new Grid();
  }

  ngOnInit(): void {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          this.grid.moveUp();
          break;
        case 'ArrowDown':
          this.grid.moveDown();
          break;
        case 'ArrowLeft':
          this.grid.moveLeft();
          break;
        case 'ArrowRight':
          this.grid.moveRight();
          break;
        default:
          break;
      }
    });
    window.addEventListener('nextMove', (e: any) => {
      this.nextMove.emit(e.detail);
    });
  }
}
