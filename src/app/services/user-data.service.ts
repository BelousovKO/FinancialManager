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
  public transactionsAll = 0;
  public costsAll = 0;
  public incomeAll = 0;
  public dataInterface = {expense: [], income: []};
  public dataInterfaceExpense = [];
  public dataInterfaceIncome = [];
  public dataInterfaceTransaction = this.dataInterfaceExpense;
  public transactionColors = [];
  public sumTransaction = [];
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
    this.typeTransaction.value === 'cost' ? this.typeTransaction.next('income') : this.typeTransaction.next('cost');
  }
}
