import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';
import {UserDataService} from '../services/user-data.service';
import {DateService} from '../services/date.service';
import {CreateCostService} from '../services/create-cost.service';

@Component({
  selector: 'app-modal-transaction',
  templateUrl: './modal-transaction.component.html',
  styleUrls: ['./modal-transaction.component.scss']
})
export class ModalTransactionComponent implements OnInit {

  @Input() dateFilter: string;
  @Input() tempColorCategory: string;
  @Input() indexCategory: number;
  @Input() dateServiceDate: any;
  @Input() firstDayWeek: moment.Moment;
  @Input() lastDayWeek: moment.Moment;
  @Input() lastDayMonth: moment.Moment;
  @Input() yesterday: moment.Moment;
  @Input() tempTitleCategory: string;
  @Input() typeTransactionColor: string;
  @Input() tempIconCategory: string;
  @Input() transactionType: string;
  @Output() closeModalTransaction: EventEmitter<any> = new EventEmitter();
  @Output() transactionCreated: EventEmitter<any> = new EventEmitter();

  public buttonValues = [7, 8, 9, 'mdi:backspace', 4, 5, 6, 1, 2, 3, '', 0, '.'];
  public color = 'width';
  public textColor = `color: ${this.color}`;
  public backgroundColor = `background-color: ${this.color}`;
  public transactionCategory: string;
  public transactionSum = '0';
  public transactionTitle = '';
  public tempTransactionTitle = 'Заметки...';
  public transactionDate = moment();
  public modalNote = false;
  public modalChoiceDate = false;
  public tempValueInput: string;
  public today = moment();
  public modalCalendar = false;

  constructor(public createCost: CreateCostService,
              public userData: UserDataService,
              public dateService: DateService) {
  }

  onChanges(): void {
    this.ngOnInit();

  }

  ngOnInit(): void {
    moment.locale('ru');
    this.generateDate();
    this.color = this.tempColorCategory;
    this.backgroundColor = `background-color: ${this.color}`;
    this.textColor = `color: ${this.color}`;
    this.transactionCategory = this.tempTitleCategory;
    this.transactionType === 'Расход' ? this.typeTransactionColor = `color: #B51515` : this.typeTransactionColor = `color: #14802D`;
    this.transactionTitle ? this.tempValueInput = this.transactionTitle : this.tempValueInput = '';
  }

  generateDate(): void {
    moment.locale('ru');
    this.transactionDate = this.dateServiceDate.value;
    this.firstDayWeek = this.dateServiceDate.value.clone().startOf('week');
    this.lastDayWeek = this.dateServiceDate.value.clone().endOf('week');
    this.lastDayMonth = this.dateServiceDate.value.clone().endOf('month');
    if (this.dateFilter !== 'r') {
      const difference = this.dateServiceDate.value.startOf('day').diff(moment().startOf('day'), 'day');
      if (difference === 0) {
        this.transactionDate = moment();
      }
      if (difference > 0) {
        switch (this.dateFilter) {
          case 't':
            this.transactionDate = this.dateServiceDate.value.clone().startOf('day');
            break;
          case 'd':
            this.transactionDate = this.dateServiceDate.value.clone().startOf('day');
            break;
          case 'w':
            this.transactionDate = this.dateServiceDate.value.clone().startOf('week');
            break;
          case 'm':
            this.transactionDate = this.dateServiceDate.value.clone().startOf('month');
            break;
          case 'y':
            this.transactionDate = this.dateServiceDate.value.clone().startOf('year');
            break;
        }
      }
      if (difference < 0) {
        switch (this.dateFilter) {
          case 't':
            this.transactionDate = this.dateServiceDate.value.clone().endOf('day');
            break;
          case 'd':
            this.transactionDate = this.dateServiceDate.value.clone().endOf('day');
            break;
          case 'w':
            this.transactionDate = this.dateServiceDate.value.clone().endOf('week');
            break;
          case 'm':
            this.transactionDate = this.dateServiceDate.value.clone().endOf('month');
            break;
          case 'y':
            this.transactionDate = this.dateServiceDate.value.clone().endOf('year');
            break;
        }
      }
    } else {
      const differenceFirstDay = this.userData.choiceFirstDay.startOf('day').diff(moment().startOf('day'), 'day');
      const differenceLastDay = this.userData.choiceLastDay.startOf('day').diff(moment().startOf('day'), 'day');
      if (differenceFirstDay <= 0 && differenceLastDay >= 0) {
        this.transactionDate = moment();
      }
      if (differenceFirstDay > 0 && differenceLastDay > 0) {
        this.transactionDate = this.userData.choiceFirstDay.startOf('day');
      }
      if (differenceFirstDay < 0 && differenceLastDay < 0) {
        this.transactionDate = this.userData.choiceLastDay.endOf('day');
      }
    }
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

  addTitle(event): void {
    this.transactionTitle = event.target.value;
  }

  openModalNote(): void {
    this.ngOnInit();
  }

  choiceToday(): void {
    this.transactionDate = moment();
    this.modalChoiceDate = false;
    this.dateFilter = 't';
    this.ngOnInit();
  }

  choiceYesterday(): void {
    this.transactionDate = moment().clone().add(-1, 'day');
    this.modalChoiceDate = false;
    this.dateFilter = 't';
    this.ngOnInit();
  }

  go(dir: number): void {

    switch (this.dateFilter) {
      case 't':
        this.dateService.changeDay(dir);
        break;
      case 'w':
        this.dateService.changeWeek(dir);
        break;
      case 'm':
        this.dateService.changeMonth(dir);
        break;
      case 'y':
        this.dateService.changeYear(dir);
        break;
      case 'r':
        this.dateService.changeRange(dir);
        this.ngOnInit();
        break;
    }
  }

  choiceCalendarDate(): void {
    this.transactionDate = this.dateService.date.value;
    this.dateFilter = 't';
    this.modalCalendar = false;
    this.ngOnInit();
  }

  makeTransaction(): void {
    if (this.transactionSum !== '0') {
      const token = localStorage.getItem('token');
      const body = {
        userId: this.userData.userId,
        title: this.transactionTitle,
        date: this.transactionDate.format('YYYY-MM-DD:HH:mm:ss'),
        category: this.indexCategory,
        amount: Number(this.transactionSum),
        token
      };
      this.createCost.create(body)
        .subscribe(
          response => {
            if (response.status === 'OK') {
              this.userData.transaction = response.data;
              this.transactionCreated.emit();
              this.closeModalTransaction.emit();
            }
          },
          error => console.error('Error! ', error)
        );
      this.transactionSum = '0';
    }
  }
}
