import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../services/user-data.service';
import {ChangeInterface} from '../services/change-interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public data: UserDataService,
              public changeInterface: ChangeInterface) {
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
  private token = localStorage.getItem('token');

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
    let temp = 12;
    this.modalCreateExpenseCategory = false;
    this.data.dataInterfaceExpense.forEach((e, idx) => {
      if (!e.title && temp > idx) {
        temp = idx;
        this.data.dataInterfaceExpense[idx].title = this.newCategory;
        this.titlesExpense[idx] = this.newCategory;
        const body = {userId: this.data.userId, expense: this.data.dataInterfaceExpense, token: this.token};
        this.changeInterface.change(body)
          .subscribe(
            response => { if (response.status === 'OK'){
            }},
            error => console.error('Error! ', error)
          );
      }
    });
  }

}
