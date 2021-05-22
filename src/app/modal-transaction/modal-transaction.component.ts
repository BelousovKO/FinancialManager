import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';
import {ModalDataService} from '../services/modal-data.service';
import {UserDataService} from '../services/user-data.service';
import {DateService} from '../services/date.service';

@Component({
  selector: 'app-modal-transaction',
  templateUrl: './modal-transaction.component.html',
  styleUrls: ['./modal-transaction.component.scss']
})
export class ModalTransactionComponent implements OnInit {

  @Input() dateFilter: string;
  @Input() tempColorCategory: string;
  @Input() firstDayWeek: moment.Moment;
  @Input() lastDayWeek: moment.Moment;
  @Input() tempTitleCategory: string;
  @Input() typeTransactionColor: string;
  @Input() tempIconCategory: string;

  public buttonValues = [7, 8, 9, 'mdi:backspace', 4, 5, 6, 'ic:baseline-today', 1, 2, 3, '', 0, '.'];
  public color = this.data.color;
  public textColor = `color: ${this.color}`;
  public backgroundColor = `background-color: ${this.color}`;
  public transactionType = this.data.transactionType;
  public transactionCategory = this.data.transactionCategory;
  public transactionSum = '0';
  public tempTransactionSum: number;
  public transactionTitle = this.data.transactionTitle;
  public transactionDate = moment();

  constructor(public data: ModalDataService,
              public userData: UserDataService,
              public dateService: DateService) {
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.color = this.tempColorCategory;
    this.backgroundColor = `background-color: ${this.color}`;
    this.textColor = `color: ${this.color}`;
    this.transactionCategory = this.tempTitleCategory;
    this.dateService.date.subscribe(this.generateDate);
    this.transactionType === 'Расход' ? this.typeTransactionColor = `color: #B51515` : this.typeTransactionColor = `color: #14802D`;
  }

  generateDate(now: moment.Moment): void {
    moment.locale('ru');
    this.transactionDate = now;
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


  makeTransaction(): void {
    this.tempTransactionSum = Number(this.transactionSum);
    console.log('tempTransactionSum', this.tempTransactionSum);
    this.transactionSum = '0';
  }
}
