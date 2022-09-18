import { Component, ViewChild } from '@angular/core';
import { GridComponent } from './components/grid/grid.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("grid") gridEl!: GridComponent;

  onSolveClick() {
    this.gridEl.grid.solve();
  }

  onShuffleClick() {
    this.gridEl.grid.shuffle();
  }
}
