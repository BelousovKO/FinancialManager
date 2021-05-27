import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../services/user-data.service';
import {DateService} from '../services/date.service';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {

  constructor(public data: UserDataService,
              public date: DateService) {
  }

  public title = '';
  public transactionNumberColor = '';
  public transactionInverseNumberColor = '';
  public transactionInverseNumber: number;

  ngOnInit(): void {
    this.data.typeTransaction.subscribe(this.toggleTypeTransactions.bind(this));
    this.date.date.subscribe(this.toggleTypeTransactions.bind(this));
  }

  toggleTypeTransactions(): any {
    if (this.data.typeTransaction.value === 'cost') {
      this.title = 'Расходы';
      this.transactionInverseNumber = this.data.incomeAll;
      this.transactionNumberColor = '#B51515';
      this.transactionInverseNumberColor = '#14802D';
    } else {
      this.title = 'Доходы';
      this.transactionInverseNumber = this.data.costsAll;
      this.transactionNumberColor = '#14802D';
      this.transactionInverseNumberColor = '#B51515';
    }
  }
}


