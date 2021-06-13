import {Component, Input, OnChanges} from '@angular/core';
import {UserDataService} from '../../../services/user-data.service';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnChanges {

  @Input() interface: any;
  @Input() sumsCategory: any;
  @Input() typeTransactions: string;

  public strokeDasharray = [];
  public coefficient: number;
  public strokeDashoffset = [25];
  public title: string;
  public sumActive: number;
  public sumDisabled: number;
  public colorSumActive: string;
  public colorSumDisabled: string;

  constructor(public userData: UserDataService) {
  }

  ngOnChanges(): void {
    this.strokeDasharray = [];
    this.strokeDashoffset = [25];
    this.typeTransactions === 'cost' ? this.title = 'расходы' : this.title = 'доходы';
    if (this.sumsCategory.reduce((total, amount) => total + amount)) {
      if (this.typeTransactions === 'cost') {
        this.sumActive = this.userData.sumCosts;
        this.sumDisabled = this.userData.sumIncome;
        this.colorSumActive = '#B51515';
        this.colorSumDisabled = '#14802D';
        this.coefficient = 100 / this.userData.sumCosts;
        this.strokeDasharray = this.userData.costsCategorySums.map(e => `${e * this.coefficient} ${100 - e * this.coefficient}`);
      } else {
        this.sumActive = this.userData.sumIncome;
        this.sumDisabled = this.userData.sumCosts;
        this.colorSumActive = '#14802D';
        this.colorSumDisabled = '#B51515';
        this.coefficient = 100 / this.userData.sumIncome;
        this.strokeDasharray = this.userData.incomeCategorySums.map(e => `${e * this.coefficient} ${100 - e * this.coefficient}`);
      }
      this.sumsCategory.forEach((elem, idx) => {
        if (idx > 0) {
          this.strokeDashoffset.push(this.strokeDashoffset[idx - 1] + elem * this.coefficient);
        }
      });
    } else {
      this.sumActive = 0;
      this.sumDisabled = 0;
      this.strokeDasharray = this.sumsCategory.map(() => `0 100`);
      this.strokeDashoffset = this.sumsCategory.map(() => 25);
    }
  }
}
