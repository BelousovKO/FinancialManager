import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../services/user-data.service';
import {ChangeInterface} from '../services/change-interface';
import {CreateCostService} from '../services/create-cost.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public data: UserDataService,
              public changeInterface: ChangeInterface,
              public createCost: CreateCostService) {
  }

  public costsData = this.data.costs;
  public costs = this.data.sumCosts;
  public costsColor = [];
  public backgroundColors = [];
  public colorsExpense = this.data.expenseColors;
  public titlesExpense = [];
  public dataInterfaceExpense = this.data.dataInterfaceExpense;
  private temp: number;
  public modalCreateExpenseCategory = false;
  public inputValue = '';
  public inputValueNotes = '';
  public modalCreateCost = false;
  private indexCostCategory: number;
  private token = localStorage.getItem('token');
  public date1 = new Date();
  public costsAll = 0;
  public strokeDasharray = [];
  public strokeDashoffset = [25];

  ngOnInit(): void {
    this.strokeDasharray = [];
    this.strokeDashoffset = [25];
    console.log('ngOnInit');
    this.data.dataInterfaceExpense.forEach((e, idx) => {
      this.colorsExpense.push(e.color);
      this.titlesExpense.push(e.title);
      this.backgroundColors.push(`background-color: ${this.colorsExpense[idx]}`);
      this.costsColor.push(`color: ${this.colorsExpense[idx]}`);
      this.temp = 0;
      this.costsData.forEach((elem) => {
        if (elem.category === idx) {
          this.temp += elem.amount;
        }
      });
      this.costs.push(this.temp);
    });
    this.data.sumCosts = this.costs;
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

  createExpenseCategory(): void {
    let temp = 12;
    this.modalCreateExpenseCategory = false;
    this.data.dataInterfaceExpense.forEach((e, idx) => {
      if (!e.title && temp > idx) {
        temp = idx;
        this.data.dataInterfaceExpense[idx].title = this.inputValue;
        this.titlesExpense[idx] = this.inputValue;
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
  }

  createNewCost(): void {
    const newCost = Number(this.inputValue);
    const dateCost = new Date();
    const token = localStorage.getItem('token');
    const body = {
      userId: this.data.userId,
      title: this.inputValueNotes,
      date: dateCost,
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
          console.log(response.status);
        },
        error => console.error('Error! ', error)
      );
    this.modalCreateCost = false;
  }
}
