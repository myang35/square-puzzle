import { Component, ViewChild } from '@angular/core';
import { GridComponent } from './components/grid/grid.component';
import { GridNode } from './scripts/grid-node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("grid") gridEl!: GridComponent;
  @ViewChild("gridSolvePlan") gridSolvePlanEl!: GridComponent;

  timeoutLength = 0;
  f = 0;
  g = 0;
  h = 0;
  counter = 0;

  onSolveClick() {
    this.counter = 0;
    this.gridEl.grid.solve();
  }

  onShuffleClick() {
    this.gridEl.grid.shuffle();
  }

  onNextMove(e: GridNode) {
    setTimeout(() => {
      this.counter++;
      this.gridSolvePlanEl.grid.grid = e.grid.grid;
      this.f = e.f;
      this.g = e.g;
      this.h = e.h;

      if (e.grid.isComplete()) {
        this.gridEl.grid.startSolve();
        this.timeoutLength = 0;
      }
    }, this.timeoutLength);
    this.timeoutLength += 1;
  }
}
