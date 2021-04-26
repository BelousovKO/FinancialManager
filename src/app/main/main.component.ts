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
  public costs = [1, 3, 1, 1, 1, 10, 1, 1, 1, 1, 1, 1];
  public costsAll = this.costs.reduce((total, amount) => {
    return total + amount;
  });
  public coefficient = 100 / this.costsAll;
  public strokeDasharray0 = `${this.costs[0] * this.coefficient} ${100 - this.costs[0] * this.coefficient}`;
  public strokeDasharray1 = `${this.costs[1] * this.coefficient} ${100 - this.costs[1] * this.coefficient}`;
  public strokeDasharray2 = `${this.costs[2] * this.coefficient} ${100 - this.costs[2] * this.coefficient}`;
  public strokeDasharray3 = `${this.costs[3] * this.coefficient} ${100 - this.costs[3] * this.coefficient}`;
  public strokeDasharray4 = `${this.costs[4] * this.coefficient} ${100 - this.costs[4] * this.coefficient}`;
  public strokeDasharray5 = `${this.costs[5] * this.coefficient} ${100 - this.costs[5] * this.coefficient}`;
  public strokeDasharray6 = `${this.costs[6] * this.coefficient} ${100 - this.costs[6] * this.coefficient}`;
  public strokeDasharray7 = `${this.costs[7] * this.coefficient} ${100 - this.costs[7] * this.coefficient}`;
  public strokeDasharray8 = `${this.costs[8] * this.coefficient} ${100 - this.costs[8] * this.coefficient}`;
  public strokeDasharray9 = `${this.costs[9] * this.coefficient} ${100 - this.costs[9] * this.coefficient}`;
  public strokeDasharray10 = `${this.costs[10] * this.coefficient} ${100 - this.costs[10] * this.coefficient}`;
  public strokeDasharray11 = `${this.costs[11] * this.coefficient} ${100 - this.costs[11] * this.coefficient}`;
  public strokeDashoffset1 = 25 + this.costs[1] * this.coefficient;
  public strokeDashoffset2 = this.strokeDashoffset1 + this.costs[2] * this.coefficient;
  public strokeDashoffset3 = this.strokeDashoffset2 + this.costs[3] * this.coefficient;
  public strokeDashoffset4 = this.strokeDashoffset3 + this.costs[4] * this.coefficient;
  public strokeDashoffset5 = this.strokeDashoffset4 + this.costs[5] * this.coefficient;
  public strokeDashoffset6 = this.strokeDashoffset5 + this.costs[6] * this.coefficient;
  public strokeDashoffset7 = this.strokeDashoffset6 + this.costs[7] * this.coefficient;
  public strokeDashoffset8 = this.strokeDashoffset7 + this.costs[8] * this.coefficient;
  public strokeDashoffset9 = this.strokeDashoffset8 + this.costs[9] * this.coefficient;
  public strokeDashoffset10 = this.strokeDashoffset9 + this.costs[10] * this.coefficient;
  public strokeDashoffset11 = this.strokeDashoffset10 + this.costs[11] * this.coefficient;

  ngOnInit(): void {
  }


}
