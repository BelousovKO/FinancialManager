import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})

export class BudgetComponent implements OnInit {

  public list = 'category';

  constructor() {
  }

  ngOnInit(): void {
  }

  changedList(value: string): void {
    this.list = value;
  }
}
