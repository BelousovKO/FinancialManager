import { Injectable } from '@angular/core';

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

  constructor() { }
}
