import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor() {
  }

  public income = 0;
  public costs = [10, 10, 10, 2, 1, 2, 1, 2, 1, 2, 1, 2];
  public costsAll = this.costs.reduce((total, amount) => {
    return total + amount;
  });
  public coefficient = 100 / this.costsAll;
  public strokeDasharray = this.costs.map(currentValue => `${currentValue * this.coefficient} ${100 - currentValue * this.coefficient}`);

  public strokeDashoffset = [25];

  private temp = this.costs.forEach((elem, idx) => {
    if (idx > 0) {
      this.strokeDashoffset.push(this.strokeDashoffset[idx - 1] + this.costs[idx] * this.coefficient);
    }
  });


  ngOnInit(): void {
  }


}
