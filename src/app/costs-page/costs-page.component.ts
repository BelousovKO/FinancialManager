import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../services/user-data.service';
import {ChangeInterface} from '../services/change-interface';
import {CreateCostService} from '../services/create-cost.service';
import {DateService} from '../services/date.service';
import * as moment from 'moment';
import 'moment/locale/ru';

@Component({
  selector: 'app-costs-page',
  templateUrl: './costs-page.component.html',
  styleUrls: ['./costs-page.component.scss']
})
export class CostsPageComponent implements OnInit {

  constructor(public data: UserDataService,
              public changeInterface: ChangeInterface,
              public createCost: CreateCostService,
              public dateService: DateService) {

  }

  public transactionData = this.data.transaction;
  public transactionDataFiltered = [];
  public costDataFiltered = [];
  public incomeDataFiltered = [];
  public transactions = [];
  public colors = [];
  public backgroundColors = [];
  public colorsTransactions = this.data.transactionColors;
  public titlesTransactions = [];
  public iconTransactions = [];
  public dataInterfaceTransactions = this.data.dataInterfaceTransaction;
  public dateFilter = this.data.dateFilter;
  private temp: number;
  public modalCreateCategory = false;
  public inputValue = '';
  public modalCreateTransaction: boolean;
  public modalChangeIcon = false;
  public modalDateFilter = false;
  public modalChoiceDay = false;
  public modalChooseRange = false;
  public indexCategory: number;
  public colorNewCategory = '';
  public iconNewCategory = '';
  public countCategories: number;
  private token = localStorage.getItem('token');
  public transactionsAll = 0;
  public costsAll = 0;
  public incomeAll = 0;
  public strokeDasharray = [];
  public strokeDashoffset = [25];
  public firstDayWeek: moment.Moment;
  public lastDayWeek: moment.Moment;
  public lastDayMonth: moment.Moment;
  public yesterday = moment().clone().add(-1, 'day');
  public tempTitleCategory = '';
  public tempColorCategory = '';
  public tempIconCategory = '';
  public typeTransactionColor = `color: red`;
  public transactionType = 'Расход';
  public today = {
    today: moment().format('DD MMMM Y'),
    firstDayOfWeek: moment().startOf('week').format('D'),
    lastDayOfWeek: moment().endOf('week').format('D MMMM'),
    lastDayOfMonth: moment().endOf('month').format('D'),
    month: moment().format('MMMM Y'),
    year: moment().format('Y')
  };
  public listIcon = ['favorite_border', 'language', 'pets', 'work', 'supervisor_account', 'flight_takeoff', 'settings_phone',
    'build', 'bookmark_add', 'commute', 'theaters', 'anchor', 'camera_enhance', 'rowing', 'maps_home_work', 'content_cut', 'biotech',
    'build', 'weekend', 'school', 'public', 'construction', 'sentiment_very_satisfied', 'emoji_events', 'cake', 'coronavirus',
    'sports_esports', 'self_improvement', 'female', 'male', 'sports_soccer', 'luggage', 'sports_basketball', 'emoji_food_beverage',
    'outdoor_grill', 'piano', 'restaurant', 'directions_car', 'celebration', 'fastfood', 'local_gas_station', 'hotel', 'liquor',
    'local_airport', 'theater_comedy', 'star_border', 'wifi', 'fitness_center', 'ac_unit', 'family_restroom', 'checkroom', 'child_care',
    'beach_access', 'child_friendly', 'smoking_rooms', 'add_shopping_cart', 'apartment', 'local_hospital', 'local_grocery_store', 'hiking',
    'savings', 'movie_creation', 'account_balance', 'attach_money'];

  ngOnInit(): void {
    this.data.typeTransaction.subscribe(this.toggleTypeTransactions.bind(this));

    this.dateService.date.subscribe(this.generateDate.bind(this));

    this.createDataDonut();
  }

  backToNowDate(): void {
    this.dateService.backToToday();
  }

  generateDate(now: moment.Moment): void {
    moment.locale('ru');
    this.firstDayWeek = now.clone().startOf('week');
    this.lastDayWeek = now.clone().endOf('week');
    this.lastDayMonth = now.clone().endOf('month');
    this.strokeDasharray = [];
    this.strokeDashoffset = [25];
    this.transactionDataFiltered = [];
    this.incomeDataFiltered = [];
    this.costDataFiltered = [];

    switch (this.dateFilter) {

      case 't':
        this.transactionData.forEach(e => {
          if (e.date.substr(0, 10) === now.format('YYYY-MM-DD')) {
            this.transactionDataFiltered.push(e);
          }
        });
        this.data.costs.forEach(e => {
          if (e.date.substr(0, 10) === now.format('YYYY-MM-DD')) {
            this.costDataFiltered.push(e);
          }
        });
        this.data.income.forEach(e => {
          if (e.date.substr(0, 10) === now.format('YYYY-MM-DD')) {
            this.incomeDataFiltered.push(e);
          }
        });
        break;

      case 'd':
        this.transactionData.forEach(e => {
          if (e.date.substr(0, 10) === now.format('YYYY-MM-DD')) {
            this.transactionDataFiltered.push(e);
          }
        });
        this.data.costs.forEach(e => {
          if (e.date.substr(0, 10) === now.format('YYYY-MM-DD')) {
            this.costDataFiltered.push(e);
          }
        });
        this.data.income.forEach(e => {
          if (e.date.substr(0, 10) === now.format('YYYY-MM-DD')) {
            this.incomeDataFiltered.push(e);
          }
        });
        break;

      case 'w':
        const fdw = Number(this.firstDayWeek.format('x'));
        const ldw = Number(this.lastDayWeek.format('x'));
        this.transactionData.forEach(e => {
          if (Number(Date.parse(e.date)) >= fdw && Number(Date.parse(e.date)) <= ldw) {
            this.transactionDataFiltered.push(e);
          }
        });
        this.data.costs.forEach(e => {
          if (Number(Date.parse(e.date)) >= fdw && Number(Date.parse(e.date)) <= ldw) {
            this.costDataFiltered.push(e);
          }
        });
        this.data.income.forEach(e => {
          if (Number(Date.parse(e.date)) >= fdw && Number(Date.parse(e.date)) <= ldw) {
            this.incomeDataFiltered.push(e);
          }
        });
        break;

      case 'm':
        this.transactionData.forEach(e => {
          if (e.date.substr(0, 7) === now.format('YYYY-MM')) {
            this.transactionDataFiltered.push(e);
          }
        });
        this.data.costs.forEach(e => {
          if (e.date.substr(0, 7) === now.format('YYYY-MM')) {
            this.costDataFiltered.push(e);
          }
        });
        this.data.income.forEach(e => {
          if (e.date.substr(0, 7) === now.format('YYYY-MM')) {
            this.incomeDataFiltered.push(e);
          }
        });
        break;

      case 'y':
        this.transactionData.forEach(e => {
          if (e.date.substr(0, 4) === now.format('YYYY')) {
            this.transactionDataFiltered.push(e);
          }
        });
        this.data.costs.forEach(e => {
          if (e.date.substr(0, 4) === now.format('YYYY')) {
            this.costDataFiltered.push(e);
          }
        });
        this.data.income.forEach(e => {
          if (e.date.substr(0, 4) === now.format('YYYY')) {
            this.incomeDataFiltered.push(e);
          }
        });
        break;

      case 'i':
        this.transactionDataFiltered = this.transactionData;
        this.costDataFiltered = this.data.costs;
        this.incomeDataFiltered = this.data.income;
        break;

      case 'r':
        const fdr = Number(this.data.choiceFirstDay.startOf('day').format('x'));
        const ldr = Number(this.data.choiceLastDay.endOf('day').format('x'));
        this.transactionData.forEach(e => {
          if (Number(Date.parse(e.date)) >= fdr && Number(Date.parse(e.date)) <= ldr) {
            this.transactionDataFiltered.push(e);
          }
        });
        this.data.costs.forEach(e => {
          if (Number(Date.parse(e.date)) >= fdr && Number(Date.parse(e.date)) <= ldr) {
            this.costDataFiltered.push(e);
          }
        });
        this.data.income.forEach(e => {
          if (Number(Date.parse(e.date)) >= fdr && Number(Date.parse(e.date)) <= ldr) {
            this.incomeDataFiltered.push(e);
          }
        });
        break;
    }

    this.transactions = [];
    this.dataInterfaceTransactions.forEach((e, idx) => {
      this.temp = 0;
      this.transactionDataFiltered.forEach((elem) => {
        if (elem.category === idx) {
          this.temp += elem.amount;
        }
      });
      this.transactions.push(this.temp);
    });
    this.data.sumTransaction = this.transactions;
    this.incomeAll = 0;
    this.incomeDataFiltered.forEach((elem) => {
      this.incomeAll += elem.amount;
    });
    this.data.incomeAll = this.incomeAll;
    this.costsAll = 0;
    this.costDataFiltered.forEach((elem) => {
      this.costsAll += elem.amount;
    });
    this.data.costsAll = this.costsAll;

    this.createDataDonut();
  }

  createDataDonut(): void {

    this.strokeDasharray = [];
    this.strokeDashoffset = [25];
    this.transactions = [];
    this.colorsTransactions = [];
    this.titlesTransactions = [];
    this.iconTransactions = [];
    this.backgroundColors = [];
    this.colors = [];
    this.dataInterfaceTransactions.forEach((e, idx) => {
      this.colorsTransactions.push(e.color);
      this.titlesTransactions.push(e.title);
      this.iconTransactions.push(e.icon);
      this.backgroundColors.push(`background-color: ${this.colorsTransactions[idx]}`);
      this.colors.push(`color: ${this.colorsTransactions[idx]}`);
      this.temp = 0;
      this.transactionDataFiltered.forEach((elem) => {
        if (elem.category === idx) {
          this.temp += elem.amount;
        }
      });
      this.transactions.push(this.temp);
    });
    this.data.icons = this.iconTransactions;
    this.data.sumTransaction = this.transactions;
    this.transactionsAll = 0;
    this.transactionsAll = this.data.sumTransaction.reduce((total, amount) => {
      return total + amount;
    });
    this.data.transactionsAll = this.transactionsAll;
    this.data.coefficient = 100 / this.transactionsAll;
    if (this.transactionsAll) {
      this.strokeDasharray = this.transactions.map(currentValue =>
        `${currentValue * this.data.coefficient} ${100 - currentValue * this.data.coefficient}`);
      this.transactions.forEach((elem, idx) => {
        if (idx > 0) {
          this.strokeDashoffset.push(this.strokeDashoffset[idx - 1] + this.transactions[idx] * this.data.coefficient);
        }
      });
    } else {
      this.strokeDasharray = this.transactions.map(() => `0 100`);
      this.transactions.forEach(() => {
        this.strokeDashoffset.push(25);
      });
    }
    this.data.strokeDasharray = this.strokeDasharray;
    this.data.strokeDashoffset = this.strokeDashoffset;
    this.data.transactionColors = this.colorsTransactions;
  }

  inputHandlerCategory(event: any): any {
    this.inputValue = event.target.value;
  }

  inputHandlerColor(event: any): any {
    this.tempColorCategory = event.target.value;
    this.colorNewCategory = `background-color: ${event.target.value}`;
  }

  openModalCreateExpenseCategory(idx): void {
    this.tempTitleCategory = '';
    this.tempColorCategory = this.colorsTransactions[idx];
    this.modalCreateCategory = true;
    this.colorNewCategory = `background-color: ${this.colorsTransactions[idx]}`;
    this.iconNewCategory = this.iconTransactions[idx];
  }

  changeIcon(): void {
    this.modalChangeIcon = false;
  }

  createCategory(): void {
    if (!this.data.editState) {
      let temp = this.countCategories;
      this.dataInterfaceTransactions.forEach((e, idx) => {
        if (!e.title && temp > idx) {
          temp = idx;
          this.dataInterfaceTransactions[idx].title = this.inputValue;
          this.dataInterfaceTransactions[idx].icon = this.iconNewCategory;
          this.titlesTransactions[idx] = this.inputValue;
          this.iconTransactions[idx] = this.iconNewCategory;
          if (this.tempColorCategory) {
            this.dataInterfaceTransactions[idx].color = this.tempColorCategory;
            this.data.transactionColors[idx] = this.tempColorCategory;
            this.colorsTransactions[idx] = this.tempColorCategory;
            this.backgroundColors[idx] = `background-color: ${this.tempColorCategory}`;
            this.colors[idx] = `color: ${this.tempColorCategory}`;
          }
        }
      });
    } else {
      if (this.inputValue) {
        this.dataInterfaceTransactions[this.indexCategory].title = this.inputValue;
        this.titlesTransactions[this.indexCategory] = this.inputValue;
      } else {
        this.inputValue = this.dataInterfaceTransactions[this.indexCategory].title;
      }
      this.dataInterfaceTransactions[this.indexCategory].icon = this.iconNewCategory;
      this.iconTransactions[this.indexCategory] = this.iconNewCategory;

      if (this.tempColorCategory) {
        this.dataInterfaceTransactions[this.indexCategory].color = this.tempColorCategory;
        this.data.transactionColors[this.indexCategory] = this.tempColorCategory;
        this.colorsTransactions[this.indexCategory] = this.tempColorCategory;
        this.backgroundColors[this.indexCategory] = `background-color: ${this.tempColorCategory}`;
        this.colors[this.indexCategory] = `color: ${this.tempColorCategory}`;
      }
    }
    this.modalCreateCategory = false;
    this.tempTitleCategory = '';

    if (this.data.typeTransaction.value === 'cost') {
      this.data.dataInterface.expense = this.dataInterfaceTransactions;
    } else {
      this.data.dataInterface.income = this.dataInterfaceTransactions;
    }


    const body = {userId: this.data.userId, interface: this.data.dataInterface, token: this.token};
    this.changeInterface.change(body)
      .subscribe(
        response => {
          if (response.status === 'OK') {
          }
        },
        error => console.error('Error! ', error)
      );
    this.inputValue = '';
    this.tempColorCategory = '';
  }

  openModalCreateCost(i): void {
    this.tempColorCategory = this.colorsTransactions[i];
    this.tempTitleCategory = this.dataInterfaceTransactions[i].title;
    this.indexCategory = i;
    this.data.editState ? this.modalCreateCategory = true : this.modalCreateTransaction = true;
    this.colorNewCategory = `background-color: ${this.colorsTransactions[i]}`;
    this.iconNewCategory = this.iconTransactions[i];
    this.tempIconCategory = this.iconTransactions[i];
  }

  go(dir: number): void {

    switch (this.dateFilter) {
      case 't':
        this.dateService.changeDay(dir);
        break;
      case 'd':
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

  clearChoiceDate(): void {
    this.data.choiceFirstDay = moment();
    this.data.choiceLastDay = moment();
    this.backToNowDate();
  }

  createdTransaction(): any {
    this.transactionData = this.data.transaction;
    this.transactions = [];
    this.backToNowDate();
    this.ngOnInit();
  }

  closeAllModal(): void {
    this.modalChangeIcon = false;
    this.modalChoiceDay = false;
    this.modalChooseRange = false;
    this.modalCreateTransaction = false;
    this.modalCreateCategory = false;
  }

  toggleTypeTransactions(): any {
    if (this.data.typeTransaction.value === 'cost') {
      this.countCategories = 12;
      this.data.transaction = this.data.costs;
      this.transactionData = this.data.transaction;
      this.data.dataInterfaceTransaction = this.data.dataInterfaceExpense;
      this.dataInterfaceTransactions = this.data.dataInterfaceExpense;
    } else {
      this.countCategories = 6;
      this.data.transaction = this.data.income;
      this.transactionData = this.data.transaction;
      this.data.dataInterfaceTransaction = this.data.dataInterfaceIncome;
      this.dataInterfaceTransactions = this.data.dataInterfaceIncome;
    }
    this.dateService.date.subscribe(this.generateDate.bind(this));
    this.createDataDonut();
  }
}
