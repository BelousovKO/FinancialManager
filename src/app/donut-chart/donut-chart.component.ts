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

  public dataInterfaceExpense = this.data.dataInterfaceExpense;
  public incomeAll = this.data.incomeAll;
  public costs = this.data.sumCosts;
  public costsAll = this.data.costsAll;
  public strokeDashoffset = this.data.strokeDashoffset;
  public stroke = this.data.expenseColors;

  ngOnInit(): void { }

}
