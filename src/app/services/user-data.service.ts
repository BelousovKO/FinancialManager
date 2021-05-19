import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public userData = [];
  public costs = [];
  public costsAll = 0;
  public dataInterfaceExpense = [];
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
}
