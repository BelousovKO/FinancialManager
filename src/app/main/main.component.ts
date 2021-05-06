import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../services/user-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public data: UserDataService) {
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
  public newCategory = '';

  ngOnInit(): void {
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
  }

  inputHandler(event: any): any {
    this.newCategory = event.target.value;
  }

  createExpenseCategory(): void {
    this.modalCreateExpenseCategory = false;
    this.data.dataInterfaceExpense.forEach((e, idx) => {
      if (!e.title && e[idx].title !== e[idx - 1].title) {
        e.title = this.newCategory;
      }
      console.log('this.data.dataInterfaceExpense: ', this.data.dataInterfaceExpense);
    });
  }

}
