import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public userData = [];
  public costs = [];
  public dataInterfaceExpense = [];
  public stroke = [];

  constructor() { }
}
