import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public typeTransaction = new BehaviorSubject('cost');

  public userData = [];
  public transaction = [];
  public costs = [];
  public income = [];
  public costsAll = 0;
  public incomeAll = 0;
  public dataInterfaceExpense = [];
  public dataInterfaceIncome = [];
  public expenseColors = [];
  public sumCosts = [];
  public userId = '';
  public coefficient: number;
  public strokeDasharray = [];
  public strokeDashoffset = [];
  public icons = [];
  public dateFilter = 'm';
  public choiceFirstDay = moment();
  public choiceLastDay = moment();
  public editState = false;

  constructor() { }

  toggleTypeTransaction(): void {
    this.typeTransaction.next('income');
    console.log('this.typeTransaction: ', this.typeTransaction.value);
  }

  // toggleTypeTransaction(): void {
  //   this.typeTransaction = 'income';
  // }
}
