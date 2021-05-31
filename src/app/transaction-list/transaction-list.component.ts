import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../services/user-data.service';
import {DateService} from '../services/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  public transaction = [];
  public costs = [];
  public income = [];
  public transactionDataFiltered = [];

  constructor(public data: UserDataService,
              public dateService: DateService) {
  }

  ngOnInit(): void {
    this.createData();
    this.dateService.date.subscribe(this.filteredData.bind(this));
    this.data.dateFilter.subscribe(this.filteredData.bind(this));
  }

  filteredData(): any {
    this.transactionDataFiltered = [];
    const now = this.dateService.date.value;
    moment.locale('ru');
    const firstDayWeek = now.clone().startOf('week');
    const lastDayWeek = now.clone().endOf('week');

    switch (this.data.dateFilter.value) {

      case 't':
        this.transaction.forEach(e => {
          if (e.date.substr(0, 10) === now.format('YYYY-MM-DD')) {
            this.transactionDataFiltered.push(e);
          }
        });
        break;

      case 'd':
        this.transaction.forEach(e => {
          if (e.date.substr(0, 10) === now.format('YYYY-MM-DD')) {
            this.transactionDataFiltered.push(e);
          }
        });
        break;

      case 'w':
        const fdw = Number(firstDayWeek.format('x'));
        const ldw = Number(lastDayWeek.format('x'));
        this.transaction.forEach(e => {
          if (Number(Date.parse(e.date)) >= fdw && Number(Date.parse(e.date)) <= ldw) {
            this.transactionDataFiltered.push(e);
          }
        });
        break;

      case 'm':
        this.transaction.forEach(e => {
          if (e.date.substr(0, 7) === now.format('YYYY-MM')) {
            this.transactionDataFiltered.push(e);
          }
        });
        break;

      case 'y':
        this.transaction.forEach(e => {
          if (e.date.substr(0, 4) === now.format('YYYY')) {
            this.transactionDataFiltered.push(e);
          }
        });
        break;

      case 'i':
        this.transactionDataFiltered = this.transaction;
        break;

      case 'r':
        const fdr = Number(this.data.choiceFirstDay.startOf('day').format('x'));
        const ldr = Number(this.data.choiceLastDay.endOf('day').format('x'));
        this.transaction.forEach(e => {
          if (Number(Date.parse(e.date)) >= fdr && Number(Date.parse(e.date)) <= ldr) {
            this.transactionDataFiltered.push(e);
          }
        });
        break;
    }
    console.log('this.transactionDataFiltered: ', this.transactionDataFiltered);
  }


  createData(): any {
    this.costs = [...this.data.costs];
    this.costs.forEach(elem => {
      elem.typeTransaction = 'cost';
    });
    this.income = [...this.data.income];
    this.income.forEach(elem => {
      elem.typeTransaction = 'income';
    });
    this.transaction = [...this.costs, ...this.income];
    console.log('createData(): ', this.transaction);
  }
}
