import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';
import {UserDataService} from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  constructor( private data: UserDataService) {
  }

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

  changeRange(dir: number): void {
    let difference = this.data.choiceLastDay.diff(this.data.choiceFirstDay, 'day');
    dir >  0 ? difference = difference * dir + 1 : difference = difference * dir - 1;
    this.data.choiceFirstDay.add(difference, 'day');
    this.data.choiceLastDay.add(difference, 'day');

  }

  selectDay(date: moment.Moment): void {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month(),
      year: date.year()
    });
    this.date.next(value);
  }
}
