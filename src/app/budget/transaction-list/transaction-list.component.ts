import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {UserDataService} from '../../services/user-data.service';
import {DateService} from '../../services/date.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnDestroy {

  public transaction: any;
  public transactionDataFiltered = [];
  public days = [];
  public momentDays = [];
  public modalCreateTransaction = false;
  public modalSelectCategories = false;
  public idTransaction: string;
  public indexCategory: number;
  public interface: any;
  public amountTransaction: number;
  public transactionTitle: string;
  public dateTransaction: string;
  public edit = true;
  private subs;

  constructor(public userData: UserDataService,
              public dateService: DateService) {
  }

  ngOnInit(): void {
    this.subs = this.dateService.date.subscribe(this.filteredData.bind(this));
  }

  filteredData(): any {
    this.transaction = this.userData.transactions;
    this.transaction.forEach(elem => {
      elem.dateX = moment(elem.date, 'YYYY-MM-DD').format('x');
    });
    this.days = [];
    this.momentDays = [];
    this.transactionDataFiltered = [];
    const now = this.dateService.date.value;
    const firstDayWeek = now.clone().startOf('week');
    const lastDayWeek = now.clone().endOf('week');

    switch (this.dateService.dateFilter) {

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
        const fdr = Number(this.dateService.choiceFirstDay.startOf('day').format('x'));
        const ldr = Number(this.dateService.choiceLastDay.endOf('day').format('x'));
        this.transaction.forEach(e => {
          if (Number(Date.parse(e.date)) >= fdr && Number(Date.parse(e.date)) <= ldr) {
            this.transactionDataFiltered.push(e);
          }
        });
        break;
    }
    this.transactionDataFiltered.sort((a: any, b: any): any => a.dateX < b.dateX ? 1 : -1);
    if (this.transactionDataFiltered[0]) {
      this.days[0] = [moment(this.transactionDataFiltered[0].date, 'YYYY-MM-DD').format('DD.MM.YYYY')];
      this.transactionDataFiltered.forEach(elem => {
        if (moment(this.days[0], 'DD.MM.YYYY').startOf('day').format('x') >
          moment(elem.date, 'YYYY-MM-DD:HH').startOf('day').format('x') &&
          moment(elem.date, 'YYYY-MM-DD:HH').startOf('day').format('x') !==
          moment(this.days[this.days.length - 1], 'DD.MM.YYYY').startOf('day').format('x')) {
          this.days.push([moment(elem.date, 'YYYY-MM-DD:HH').format('DD.MM.YYYY')]);
        }
      });
      this.days.forEach(elem => {
        this.momentDays.push(moment(elem[0], 'DD.MM.YYYY'));
        elem.transactions = [];
        this.transactionDataFiltered.forEach(e => {
          if (moment(e.date, 'YYYY-MM-DD:HH').startOf('day').format('x') ===
            moment(elem, 'DD.MM.YYYY').startOf('day').format('x')) {
            elem.transactions.push(e);
          }
        });
      });

    }
  }

  dayAmount(dataDay): string {
    let amount = 0;
    dataDay.forEach(elem => {
      if (elem.type === 'cost') {
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
      return `${this.userData.interfaceCosts[idx].title}`;
    }
    return `${this.userData.interfaceIncome[idx].title}`;
  }

  icon(type: string, idx: number): string {
    if (type === 'cost') {
      return `${this.userData.interfaceCosts[idx].icon}`;
    }
    return `${this.userData.interfaceIncome[idx].icon}`;
  }

  color(type: string, idx: number): string {
    if (type === 'cost') {
      return `${this.userData.interfaceCosts[idx].color}`;
    }
    return `${this.userData.interfaceIncome[idx].color}`;
  }

  backgroundColor(type: string, idx: number): string {
    return `background-color: ${this.color(type, idx)}`;
  }

  transactionAmount(transaction): string {
    if (transaction.type === 'cost') {
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

  selectCategory(transaction: any): void {
    this.idTransaction = transaction.id;
    this.indexCategory = transaction.category;
    this.amountTransaction = transaction.amount;
    this.transactionTitle = transaction.title;
    this.dateTransaction = transaction.date;
    if (transaction.type === 'cost') {
      this.interface = this.userData.interfaceCosts;
    } else {
      this.interface = this.userData.interfaceIncome;
    }
    this.modalCreateTransaction = true;
  }

  openCreateTransaction([newInterface, category]): void {
    if (newInterface && category !== undefined) {
      this.interface = newInterface;
      this.indexCategory = category;
    }
    this.modalSelectCategories = false;
    this.edit = false;
    this.modalCreateTransaction = true;
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
