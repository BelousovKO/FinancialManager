import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());
  public sectDay: moment.Moment;

  backToToday(): void {
    let difference = moment().diff(this.date.value, 'day');
    if (difference < 0) {
      difference -= 1;
    }
    const value = this.date.value.add(difference, 'day');
    this.date.next(value);
  }

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

  selectDay(date: moment.Moment): void {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month(),
      year: date.year()
    });
    this.date.next(value);
  }

  constructor() {
  }
}
