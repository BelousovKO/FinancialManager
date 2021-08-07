import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateService} from '../../../services/date.service';
import * as moment from 'moment';
import {UserDataService} from '../../../services/user-data.service';
import {EditTransactionService} from '../../../services/edit-transaction.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

  @Input() indexCategory: number;
  @Input() interface: any;
  @Input() amount: number;
  @Input() transactionTitle: string;
  @Input() idTransaction: string;
  @Input() edit: boolean;
  @Input() date: string;
  @Output() closeModalTransaction: EventEmitter<any> = new EventEmitter();

  public transactionTypeRu = 'Расход';
  public transactionType = 'cost';
  public transactionSum: string;
  public modalNote = false;
  public modalChoiceDate = false;
  public modalDelete = false;
  public modalSelectCategories = false;
  public buttonValues = [7, 8, 9, 'mdi:backspace', 4, 5, 6, 1, 2, 3, '', 0, '.'];
  public transactionDate: moment.Moment;
  public today = moment().format('DD.MM.YYYY');
  public yesterday = moment().add(-1, 'day').format('DD.MM.YYYY');

  constructor(public dateService: DateService,
              public userData: UserDataService,
              private editTransaction: EditTransactionService) {
  }

  ngOnInit(): void {
    this.date ? this.transactionDate = moment(this.date, 'YYYY-MM-DD') : this.generateDate();
    !this.amount ? this.transactionSum = '0' : this.transactionSum = `${this.amount}`;
  }

  backgroundColor(): string {
    return `background-${this.color()}`;
  }

  color(): string {
    return `color: ${this.interface[this.indexCategory].color}`;
  }

  typeTransactionColor(): string {
    if (this.interface.length === 6) {
      this.transactionTypeRu = 'Доход';
      this.transactionType = 'income';
      return 'color: #14802D';
    }
    this.transactionTypeRu = 'Расход';
    this.transactionType = 'cost';
    return 'color: #B51515';
  }

  clickButtons(value): any {
    let characters = 0;
    if (this.transactionSum.indexOf('.') > 0) {
      characters = this.transactionSum.length - this.transactionSum.indexOf('.');
    }

    if (this.transactionSum !== '0' &&
      value !== '.' &&
      value !== 'mdi:backspace' &&
      value !== 'ic:baseline-today' &&
      characters < 3) {
      this.transactionSum = `${this.transactionSum}${value}`;
    }
    if (typeof value === 'number' && this.transactionSum === '0') {
      this.transactionSum = `${value}`;
    }
    if (value === '.' && !this.transactionSum.includes('.')) {
      this.transactionSum = `${this.transactionSum}${value}`;
    }
    if (value === 'mdi:backspace' && this.transactionSum !== '0') {
      this.transactionSum = this.transactionSum.slice(0, this.transactionSum.length - 1);
    }
    if (this.transactionSum.length === 0) {
      this.transactionSum = '0';
    }
  }

  getTransactionTitle(newTitle: string): void {
    this.transactionTitle = newTitle;
    this.modalNote = false;
  }

  getTransactionDate(newDate: moment.Moment): void {
    this.transactionDate = newDate;
    this.modalChoiceDate = false;
  }

  generateDate(): void {
    this.transactionDate = this.dateService.date.value;
    if (this.dateService.dateFilter !== 'r') {
      const difference = this.dateService.date.value.startOf('day').diff(moment().startOf('day'), 'day');
      if (difference === 0) {
        this.transactionDate = moment();
      }
      if (difference > 0) {
        switch (this.dateService.dateFilter) {
          case 't':
            this.transactionDate = this.dateService.date.value.clone().startOf('day');
            break;
          case 'd':
            this.transactionDate = this.dateService.date.value.clone().startOf('day');
            break;
          case 'w':
            this.transactionDate = this.dateService.date.value.clone().startOf('week');
            break;
          case 'm':
            this.transactionDate = this.dateService.date.value.clone().startOf('month');
            break;
          case 'y':
            this.transactionDate = this.dateService.date.value.clone().startOf('year');
            break;
        }
      }
      if (difference < 0) {
        switch (this.dateService.dateFilter) {
          case 't':
            this.transactionDate = this.dateService.date.value.clone().endOf('day');
            break;
          case 'd':
            this.transactionDate = this.dateService.date.value.clone().endOf('day');
            break;
          case 'w':
            this.transactionDate = this.dateService.date.value.clone().endOf('week');
            break;
          case 'm':
            this.transactionDate = this.dateService.date.value.clone().endOf('month');
            break;
          case 'y':
            this.transactionDate = this.dateService.date.value.clone().endOf('year');
            break;
        }
      }
    } else {
      const differenceFirstDay = this.dateService.choiceFirstDay.startOf('day').diff(moment().startOf('day'), 'day');
      const differenceLastDay = this.dateService.choiceLastDay.startOf('day').diff(moment().startOf('day'), 'day');
      if (differenceFirstDay <= 0 && differenceLastDay >= 0) {
        this.transactionDate = moment();
      }
      if (differenceFirstDay > 0 && differenceLastDay > 0) {
        this.transactionDate = this.dateService.choiceFirstDay.startOf('day');
      }
      if (differenceFirstDay < 0 && differenceLastDay < 0) {
        this.transactionDate = this.dateService.choiceLastDay.endOf('day');
      }
    }
  }

  makeTransaction(): void {
    this.userData.loading = true;
    let title;
    this.transactionTitle ? title = this.transactionTitle : title = '';
    if (this.transactionSum !== '0') {
      const token = localStorage.getItem('token');
      const transaction = {
        id: Math.random().toString(),
        type: this.transactionType,
        title,
        date: this.transactionDate.format('YYYY-MM-DD'),
        category: this.indexCategory,
        amount: Number(this.transactionSum)
      };
      const body = {
        id: '',
        userId: this.userData.userId,
        typeTransaction: this.transactionType,
        title,
        date: this.transactionDate.format('YYYY-MM-DD'),
        category: this.indexCategory,
        amount: Number(this.transactionSum),
        token
      };
      if (this.idTransaction) {
        if (this.userData.demo) {
          transaction.id = this.idTransaction;
          this.userData.transactions = this.userData.transactions.filter(e => e.id !== this.idTransaction);
          this.pushTransactionInLocalStorage(transaction);
          return;
        }
        body.id = this.idTransaction;
        this.editTransaction.edit(body)
          .subscribe(
            response => {
              this.userData.loading = false;
              if (response.status === 'OK') {
                this.userData.transactions = this.userData.transactions.filter(e => e.id !== this.idTransaction);
                this.userData.transactions.push(response.data);
                this.dateService.date.next(this.dateService.date.value);
              }
            }
          );
        this.closeModalTransaction.emit();
        this.userData.loading = false;
        return;
      }
      if (this.userData.demo) {
        this.pushTransactionInLocalStorage(transaction);
        return;
      }
      this.editTransaction.create(body)
        .subscribe(
          response => {
            this.userData.loading = false;
            if (response.status === 'OK') {
              this.userData.transactions.push(response.data);
              this.closeModalTransaction.emit();
              this.dateService.date.next(this.dateService.date.value);
            }
          }
        );
    }
    this.transactionSum = '0';
    this.userData.loading = false;
    this.closeModalTransaction.emit();
  }

  SelectedCategory([newInterface, category]): void {
    if (newInterface && category !== undefined) {
      this.interface = newInterface;
      this.indexCategory = category;
    }
    this.modalSelectCategories = false;
  }

  pushTransactionInLocalStorage(transaction): void {
    this.userData.transactions.push(transaction);
    const demoData = JSON.parse(localStorage.getItem('demoData'));
    demoData.userData.transactions = this.userData.transactions;
    localStorage.setItem('demoData', JSON.stringify(demoData));
    this.closeModalTransaction.emit();
    this.dateService.date.next(this.dateService.date.value);
    this.userData.loading = false;
  }
}
