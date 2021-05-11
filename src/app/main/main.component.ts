import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../services/user-data.service';
import {ChangeInterface} from '../services/change-interface';
import {CreateCostService} from '../services/create-cost.service';
import {DateService} from '../services/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

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
  public dateFilter = 'm';
  private temp: number;
  public modalCreateExpenseCategory = false;
  public inputValue = '';
  public inputValueNotes = '';
  public modalCreateCost = false;
  public modalChangeIcon = false;
  private indexCostCategory: number;
  public colorNewCost = '';
  public colorNewExpenseCategory = '';
  public iconNewExpenseCategory = '';
  private token = localStorage.getItem('token');
  public dateCost: any;
  public costsAll = 0;
  public strokeDasharray = [];
  public strokeDashoffset = [25];
  public listIcon = ['favorite_border', 'language', 'pets', 'work', 'supervisor_account', 'flight_takeoff', 'settings_phone',
    'build', 'bookmark_add', 'commute', 'theaters', 'anchor', 'camera_enhance', 'rowing', 'maps_home_work', 'content_cut', 'biotech',
    'build', 'weekend', 'school', 'public', 'construction', 'sentiment_very_satisfied', 'emoji_events', 'cake', 'coronavirus',
    'sports_esports', 'self_improvement', 'female', 'male', 'sports_soccer', 'luggage', 'sports_basketball', 'emoji_food_beverage',
    'outdoor_grill', 'piano', 'restaurant', 'directions_car', 'celebration', 'fastfood', 'local_gas_station', 'hotel', 'liquor',
    'local_airport', 'theater_comedy', 'star_border', 'wifi', 'fitness_center', 'ac_unit', 'family_restroom', 'checkroom', 'child_care',
    'beach_access', 'child_friendly', 'smoking_rooms', 'add_shopping_cart', 'apartment', 'local_hospital', 'local_grocery_store', 'hiking'];

  ngOnInit(): void {
    this.dateCost = new Date();
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

  generateDate(now: moment.Moment): void {
    /*console.log(now.toISOString());
    console.log(now.toISOString().substr(0, 7));
    console.log(now.format('YYYY-MM'));*/
    console.log('dateCost: ', this.dateCost.toISOString().substr(0, 7));
    this.dateCost = now;
    this.strokeDasharray = [];
    this.strokeDashoffset = [25];
    this.costsDataFiltered = [];
    if (this.dateFilter === 'm') {
      this.costsData.forEach(e => {
        if (e.date.substr(0, 7) === now.toISOString().substr(0, 7)) {
          this.costsDataFiltered.push(e);
        }
      });
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

  inputHandlerCost(event: any): any {
    this.inputValue = event.target.value;
  }

  inputHandlerNotes(event: any): any {
    this.inputValueNotes = event.target.value;
  }

  openModalCreateExpenseCategory(): void {
    this.modalCreateExpenseCategory = true;
    let temp = 12;
    this.data.dataInterfaceExpense.forEach((e, idx) => {
      if (!e.title && temp > idx) {
        temp = idx;
        this.colorNewExpenseCategory = `background-color: ${this.colorsExpense[idx]}`;
        this.iconNewExpenseCategory = this.iconExpense[idx];
      }
    });
  }

  changeIcon(): void {
    this.modalChangeIcon = false;
  }

  createExpenseCategory(): void {
    let temp = 12;
    this.modalCreateExpenseCategory = false;
    this.data.dataInterfaceExpense.forEach((e, idx) => {
      if (!e.title && temp > idx) {
        temp = idx;
        this.data.dataInterfaceExpense[idx].title = this.inputValue;
        this.data.dataInterfaceExpense[idx].icon = this.iconNewExpenseCategory;
        this.titlesExpense[idx] = this.inputValue;
        this.iconExpense[idx] = this.iconNewExpenseCategory;
        const body = {userId: this.data.userId, expense: this.data.dataInterfaceExpense, token: this.token};
        this.changeInterface.change(body)
          .subscribe(
            response => {
              if (response.status === 'OK') {
              }
            },
            error => console.error('Error! ', error)
          );
      }
    });
  }

  openModalCreateCost(i): void {
    this.modalCreateCost = true;
    this.indexCostCategory = i;
    this.colorNewCost = `background-color: ${this.colorsExpense[i]}`;
  }

  createNewCost(now: moment.Moment): void {
    const newCost = Number(this.inputValue);
    console.log('dateCost: ', this.dateCost);
    const token = localStorage.getItem('token');
    const body = {
      userId: this.data.userId,
      title: this.inputValueNotes,
      date: this.dateCost,
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
    this.dateService.changeMonth(dir);
  }
}
