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

  public costsData = this.data.costs;
  public costsDataFiltered = [];
  public costs = this.data.sumCosts;
  public costsColor = [];
  public backgroundColors = [];
  public colorsExpense = this.data.expenseColors;
  public titlesExpense = [];
  public iconExpense = [];
  public dataInterfaceExpense = this.data.dataInterfaceExpense;
  public dateFilter = this.data.dateFilter;
  private temp: number;
  public indexNewExpenseCategory: number;
  public modalCreateExpenseCategory = false;
  public inputValue = '';
  public inputValueNotes = '';
  public modalCreateCost = false;
  public modalChangeIcon = false;
  public modalDateFilter = false;
  public modalChoiceDay = false;
  public modalChooseRange = false;
  private indexCostCategory: number;
  public colorCost = '';
  public colorNewExpenseCategory = '';
  public iconNewExpenseCategory = '';
  private token = localStorage.getItem('token');
  public dateCost: moment.Moment;
  public costsAll = 0;
  public strokeDasharray = [];
  public strokeDashoffset = [25];
  public firstDayWeek: moment.Moment;
  public lastDayWeek: moment.Moment;
  public lastDayMonth: moment.Moment;
  public tempTitleCategory = '';
  public tempColorCategory = '';
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
    'beach_access', 'child_friendly', 'smoking_rooms', 'add_shopping_cart', 'apartment', 'local_hospital', 'local_grocery_store', 'hiking'];

  ngOnInit(): void {
    this.dateCost = moment();
    this.dateService.date.subscribe(this.generateDate.bind(this));
    this.strokeDasharray = [];
    this.strokeDashoffset = [25];
    this.costs = [];
    this.data.dataInterfaceExpense.forEach((e, idx) => {
      this.colorsExpense.push(e.color);
      this.titlesExpense.push(e.title);
      this.iconExpense.push(e.icon);
      this.backgroundColors.push(`background-color: ${this.colorsExpense[idx]}`);
      this.costsColor.push(`color: ${this.colorsExpense[idx]}`);
      this.temp = 0;
      this.costsDataFiltered.forEach((elem) => {
        if (elem.category === idx) {
          this.temp += elem.amount;
        }
      });
      this.costs.push(this.temp);
    });
    this.data.icons = this.iconExpense;
    this.data.sumCosts = this.costs;
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
    if (this.dateFilter !== 'r') {
      const difference = now.startOf('day').diff(moment().startOf('day'), 'day');
      if (difference === 0) {
        this.dateCost = moment();
      }
      if (difference > 0) {
        switch (this.dateFilter) {
          case 't':
            this.dateCost = now.clone().startOf('day');
            break;
          case 'w':
            this.dateCost = now.clone().startOf('week');
            break;
          case 'm':
            this.dateCost = now.clone().startOf('month');
            break;
          case 'y':
            this.dateCost = now.clone().startOf('year');
            break;
        }
      }
      if (difference < 0) {
        switch (this.dateFilter) {
          case 't':
            this.dateCost = now.clone().endOf('day');
            break;
          case 'w':
            this.dateCost = now.clone().endOf('week');
            break;
          case 'm':
            this.dateCost = now.clone().endOf('month');
            break;
          case 'y':
            this.dateCost = now.clone().endOf('year');
            break;
        }
      }
    } else {
      const differenceFirstDay = this.data.choiceFirstDay.startOf('day').diff(moment().startOf('day'), 'day');
      const differenceLastDay = this.data.choiceLastDay.startOf('day').diff(moment().startOf('day'), 'day');
      if (differenceFirstDay <= 0 && differenceLastDay >= 0) {
        this.dateCost = moment();
      }
      if (differenceFirstDay > 0 && differenceLastDay > 0) {
        this.dateCost = this.data.choiceFirstDay.startOf('day');
      }
      if (differenceFirstDay < 0 && differenceLastDay < 0) {
        this.dateCost = this.data.choiceLastDay.endOf('day');
      }
    }

    this.strokeDasharray = [];
    this.strokeDashoffset = [25];
    this.costsDataFiltered = [];

    switch (this.dateFilter) {

      case 't':
        this.costsData.forEach(e => {
          if (e.date.substr(0, 10) === now.format('YYYY-MM-DD')) {
            this.costsDataFiltered.push(e);
          }
        });
        break;

      case 'w':
        const fdw = Number(this.firstDayWeek.format('x'));
        const ldw = Number(this.lastDayWeek.format('x'));
        this.costsData.forEach(e => {
          if (Number(Date.parse(e.date)) >= fdw && Number(Date.parse(e.date)) <= ldw) {
            this.costsDataFiltered.push(e);
          }
        });
        break;

      case 'm':
        this.costsData.forEach(e => {
          if (e.date.substr(0, 7) === now.format('YYYY-MM')) {
            this.costsDataFiltered.push(e);
          }
        });
        break;

      case 'y':
        this.costsData.forEach(e => {
          if (e.date.substr(0, 4) === now.format('YYYY')) {
            this.costsDataFiltered.push(e);
          }
        });
        break;

      case 'i':
        this.costsDataFiltered = this.costsData;
        break;

      case 'r':
        const fdr = Number(this.data.choiceFirstDay.startOf('day').format('x'));
        const ldr = Number(this.data.choiceLastDay.endOf('day').format('x'));
        this.costsData.forEach(e => {
          if (Number(Date.parse(e.date)) >= fdr && Number(Date.parse(e.date)) <= ldr) {
            this.costsDataFiltered.push(e);
          }
        });
        break;
    }

    this.costs = [];
    this.data.dataInterfaceExpense.forEach((e, idx) => {
      this.temp = 0;
      this.costsDataFiltered.forEach((elem) => {
        if (elem.category === idx) {
          this.temp += elem.amount;
        }
      });
      this.costs.push(this.temp);
    });
    this.data.sumCosts = this.costs;
    this.createDataDonut();
  }

  createDataDonut(): void {
    this.costsAll = 0;
    this.costsAll = this.data.sumCosts.reduce((total, amount) => {
      return total + amount;
    });
    this.data.costsAll = this.costsAll;
    this.data.coefficient = 100 / this.costsAll;
    if (this.costsAll) {
      this.strokeDasharray = this.costs.map(currentValue =>
        `${currentValue * this.data.coefficient} ${100 - currentValue * this.data.coefficient}`);
      this.costs.forEach((elem, idx) => {
        if (idx > 0) {
          this.strokeDashoffset.push(this.strokeDashoffset[idx - 1] + this.costs[idx] * this.data.coefficient);
        }
      });
    } else {
      this.strokeDasharray = this.costs.map(() => `0 100`);
      this.costs.forEach(() => {
        this.strokeDashoffset.push(25);
      });
    }
    this.data.strokeDasharray = this.strokeDasharray;
    this.data.strokeDashoffset = this.strokeDashoffset;
  }

  inputHandlerCategory(event: any): any {
    this.inputValue = event.target.value;
  }

  inputHandlerColor(event: any): any {
    this.tempColorCategory = event.target.value;
    this.colorNewExpenseCategory = `background-color: ${event.target.value}`;
  }

  inputHandlerCost(event: any): any {
    this.inputValue = event.target.value;
  }

  inputHandlerNotes(event: any): any {
    this.inputValueNotes = event.target.value;
  }

  openModalCreateExpenseCategory(idx): void {
    this.modalCreateExpenseCategory = true;
    this.colorNewExpenseCategory = `background-color: ${this.colorsExpense[idx]}`;
    this.iconNewExpenseCategory = this.iconExpense[idx];
    this.indexNewExpenseCategory = idx;
  }

  changeIcon(): void {
    this.modalChangeIcon = false;
  }

  createExpenseCategory(): void {
    if (!this.data.editState) {
      let temp = 12;
      this.data.dataInterfaceExpense.forEach((e, idx) => {
        if (!e.title && temp > idx) {
          temp = idx;
          this.data.dataInterfaceExpense[idx].title = this.inputValue;
          this.data.dataInterfaceExpense[idx].icon = this.iconNewExpenseCategory;
          this.titlesExpense[idx] = this.inputValue;
          this.iconExpense[idx] = this.iconNewExpenseCategory;
          if (this.tempColorCategory) {
            this.data.dataInterfaceExpense[idx].color = this.tempColorCategory;
            this.data.expenseColors[idx] = this.tempColorCategory;
            this.colorsExpense[idx] = this.tempColorCategory;
            this.backgroundColors[idx] = `background-color: ${this.tempColorCategory}`;
            this.costsColor[idx] = `color: ${this.tempColorCategory}`;
          }
        }
      });
    } else {
      if (this.inputValue) {
        this.data.dataInterfaceExpense[this.indexCostCategory].title = this.inputValue;
        this.titlesExpense[this.indexCostCategory] = this.inputValue;
      } else {
        this.inputValue = this.data.dataInterfaceExpense[this.indexCostCategory].title;
      }
      this.data.dataInterfaceExpense[this.indexCostCategory].icon = this.iconNewExpenseCategory;
      this.iconExpense[this.indexCostCategory] = this.iconNewExpenseCategory;

      if (this.tempColorCategory) {
        this.data.dataInterfaceExpense[this.indexCostCategory].color = this.tempColorCategory;
        this.data.expenseColors[this.indexCostCategory] = this.tempColorCategory;
        this.colorsExpense[this.indexCostCategory] = this.tempColorCategory;
        this.backgroundColors[this.indexCostCategory] = `background-color: ${this.tempColorCategory}`;
        this.costsColor[this.indexCostCategory] = `color: ${this.tempColorCategory}`;
      }
    }
    this.modalCreateExpenseCategory = false;
    this.tempTitleCategory = '';
    const body = {userId: this.data.userId, expense: this.data.dataInterfaceExpense, token: this.token};
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
    this.data.editState ? this.tempTitleCategory = this.data.dataInterfaceExpense[i].title : this.tempTitleCategory = '';
    this.indexCostCategory = i;
    this.colorCost = `background-color: ${this.colorsExpense[i]}`;
    this.data.editState ? this.modalCreateExpenseCategory = true : this.modalCreateCost = true;
    this.colorNewExpenseCategory = `background-color: ${this.colorsExpense[i]}`;
    this.iconNewExpenseCategory = this.iconExpense[i];
  }

  createNewCost(): void {
    const newCost = Number(this.inputValue);
    const token = localStorage.getItem('token');
    const body = {
      userId: this.data.userId,
      title: this.inputValueNotes,
      date: this.dateCost.format('YYYY-MM-DD:HH:mm:ss'),
      category: this.indexCostCategory,
      amount: newCost,
      token
    };
    this.createCost.create(body)
      .subscribe(
        response => {
          if (response.status === 'OK') {
            this.costsData = response.data;
            this.data.costs = response.data;
            this.costs = [];
            this.ngOnInit();
          }
        },
        error => console.error('Error! ', error)
      );
    this.modalCreateCost = false;
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

    if (this.dateFilter === 'm') {

    }

    if (this.dateFilter === 't') {

    }

    if (this.dateFilter === 'w') {

    }

    if (this.dateFilter === 'y') {

    }

    if (this.dateFilter === 'r') {

    }
  }

  clearChoiceDate(): void {
    this.data.choiceFirstDay = moment();
    this.data.choiceLastDay = moment();
  }

  closeAllModal(): void {
    this.modalChangeIcon = false;
    this.modalChoiceDay = false;
    this.modalChooseRange = false;
    this.modalCreateCost = false;
    this.modalCreateExpenseCategory = false;
  }
}
