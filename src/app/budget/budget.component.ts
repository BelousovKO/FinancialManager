import {Component} from '@angular/core';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})

export class BudgetComponent {

  public list = 'category';

  constructor() {
  }

  changedList(value: string): void {
    this.list = value;
  }
}
