import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../services/user-data.service';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {

  constructor(public data: UserDataService) {
  }

  public costsData = this.data.costs;
  public dataInterfaceExpense = this.data.dataInterfaceExpense;
  public income = 0;
  public costs = [];
  public costsAll = 0;
  public coefficient = 0;
  public strokeDasharray = [];
  public strokeDashoffset = [25];
  public stroke = this.data.stroke;
  public temp = 0;

  ngOnInit(): void {
    this.data.dataInterfaceExpense.forEach((e, idx) => {
      this.stroke.push(e.color);
      this.temp = 0;
      this.costsData.forEach((elem) => {
        if (elem.category === idx) {
          this.temp += elem.amount;
        }
      });
      this.costs.push(this.temp);
    });

    this.costsAll = this.costs.reduce((total, amount) => {
      return total + amount;
    });

    this.coefficient = 100 / this.costsAll;

    if (this.costsAll) {
      this.strokeDasharray = this.costs.map(currentValue => `${currentValue * this.coefficient} ${100 - currentValue * this.coefficient}`);
      this.costs.forEach((elem, idx) => {
        if (idx > 0) {
          this.strokeDashoffset.push(this.strokeDashoffset[idx - 1] + this.costs[idx] * this.coefficient);
        }
      });
    } else {
      this.strokeDasharray = this.costs.map(() => `0 100`);
      this.costs.forEach(() => {
        this.strokeDashoffset.push(25);
      });
    }
  }
}
