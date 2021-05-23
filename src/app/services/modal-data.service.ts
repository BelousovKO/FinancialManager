import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';

@Injectable({
  providedIn: 'root'
})
export class ModalDataService {

  public modalCreateCost = false;
  public color = '#9c9cf6';
  public transactionType = 'Расход';
  public transactionCategory = 'Категория';
  public icon = 'home_work';
  public transactionSum = 0;
  public transactionTitle = '';
  public transactionDate = moment();

  constructor() { }

}
