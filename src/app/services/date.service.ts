import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  changeMonth(dir: number): void {
    const value = this.date.value.add(dir, 'month');
    this.date.next(value);
  }

  changeDay(dir: number): void {
    const value = this.date.value.add(dir, 'day');
    this.date.next(value);
  }

  changeYear(dir: number): void {
    const value = this.date.value.add(dir, 'year');
    this.date.next(value);
  }

  changeWeek(dir: number): void {
    const value = this.date.value.add(dir, 'week');
    this.date.next(value);
  }

  constructor() {
  }
}
