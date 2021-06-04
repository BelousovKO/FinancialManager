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
  public days = [];
  public momentDays = [];
  public modalCreateTransaction = false;

  constructor(public data: UserDataService,
              public dateService: DateService) {
  }

  ngOnInit(): void {
    this.createData();
    this.dateService.date.subscribe(this.filteredData.bind(this));
    this.data.dateFilter.subscribe(this.filteredData.bind(this));
  }

  filteredData(): any {
    this.days = [];
    this.momentDays = [];
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
    this.transactionDataFiltered.sort((a: any, b: any): any => a.dateX < b.dateX ? 1 : -1);
    if (this.transactionDataFiltered[0]) {
      this.days[0] = [moment(this.transactionDataFiltered[0].date, 'YYYY-MM-DD:HH:mm:ss').format('DD.MM.YYYY')];
      this.transactionDataFiltered.forEach(elem => {
        if (moment(this.days[0], 'DD.MM.YYYY').startOf('day').format('x') >
          moment(elem.date, 'YYYY-MM-DD:HH:mm:ss').startOf('day').format('x') &&
          moment(elem.date, 'YYYY-MM-DD:HH:mm:ss').startOf('day').format('x') !==
          moment(this.days[this.days.length - 1], 'DD.MM.YYYY').startOf('day').format('x')) {
          this.days.push([moment(elem.date, 'YYYY-MM-DD:HH:mm:ss').format('DD.MM.YYYY')]);
        }
      });
      this.days.forEach(elem => {
        this.momentDays.push(moment(elem[0], 'DD.MM.YYYY'));
        elem.transactions = [];
        this.transactionDataFiltered.forEach(e => {
          if (moment(e.date, 'YYYY-MM-DD:HH:mm:ss').startOf('day').format('x') ===
            moment(elem, 'DD.MM.YYYY').startOf('day').format('x')) {
            elem.transactions.push(e);
          }
        });
      });

    }
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
    this.transaction.forEach(elem => {
      elem.dateX = moment(elem.date, 'YYYY-MM-DD:HH:mm:ss').format('x');
    });
  }

  dayAmount(dataDay): string {
    let amount = 0;
    dataDay.forEach(elem => {
      if (elem.typeTransaction === 'cost') {
        amount -= elem.amount;
      } else {
        amount += elem.amount;
      }
    });
    if (amount <= 0) {
      return `${amount}`;
    }
    return `+${amount}`;
  }

  category(type: string, idx: number): string {
    if (type === 'cost') {
      return `${this.data.dataInterfaceExpense[idx].title}`;
    }
    return `${this.data.dataInterfaceIncome[idx].title}`;
  }

  icon(type: string, idx: number): string {
    if (type === 'cost') {
      return `${this.data.dataInterfaceExpense[idx].icon}`;
    }
    return `${this.data.dataInterfaceIncome[idx].icon}`;
  }

  backgroundColor(type: string, idx: number): string {
    if (type === 'cost') {
      return `background-color: ${this.data.dataInterfaceExpense[idx].color}`;
    }
    return `background-color: ${this.data.dataInterfaceIncome[idx].color}`;
  }

  transactionAmount(transaction): string {
    if (transaction.typeTransaction === 'cost') {
      return `-${transaction.amount}`;
    }
    return `+${transaction.amount}`;
  }

  colorAmount(arg): string {
    if (arg === 'cost') {
      return 'color: red';
    }
    if (arg === 'income') {
      return 'color: green';
    }
    if (this.dayAmount(arg).includes('-')) {
      return 'color: red';
    }
    return 'color: green';
  }
}
