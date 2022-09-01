import { Component, OnInit } from '@angular/core';
import { Grid } from 'src/app/scripts/grid';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
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
        case 's':
          this.grid.shuffle();
          break;
        case 'r':
          this.grid.shuffle();
          break;
        case 'Enter':
          this.grid.solve();
          break;
        default:
          break;
      }
    });
  }
}
