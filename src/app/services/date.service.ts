import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class DateService {

  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  public calendarDate: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  public dateFilter = 'm';
  public choiceFirstDay = moment();
  public choiceLastDay = moment();
  public lastDayMonth = this.date.value.clone().endOf('month');

  constructor() {
  }

  go(dir: number): void {
    switch (this.dateFilter) {
      case 'd':
        this.date.next(this.date.value.add(dir, 'day'));
        break;
      case 't':
        this.date.next(this.date.value.add(dir, 'day'));
        break;
      case 'w':
        this.date.next(this.date.value.add(dir, 'week'));
        break;
      case 'm':
        this.changeMonth(dir);
        break;
      case 'y':
        this.changeYear(dir);
        break;
      case 'r':
        this.changeRange(dir);
        break;
    }
    this.lastDayMonth = this.date.value.clone().endOf('month');
  }

  changeMonth(dir: number, typeDate?: string): void {
    typeDate === 'cd' ?
      this.calendarDate.next(this.calendarDate.value.add(dir, 'month')) :
      this.date.next(this.date.value.add(dir, 'month'));
  }

  changeYear(dir: number, typeDate?: string): void {
    typeDate === 'cd' ?
      this.calendarDate.next(this.calendarDate.value.add(dir, 'year')) :
      this.date.next(this.date.value.add(dir, 'year'));
  }

  changeRange(dir: number): void {
    let difference = this.choiceLastDay.startOf('day')
      .diff(this.choiceFirstDay.startOf('day'), 'day');
    dir > 0 ? difference = difference * dir + 1 : difference = difference * dir - 1;
    this.choiceFirstDay.add(difference, 'day');
    this.choiceLastDay.add(difference, 'day');
    this.date.next(this.choiceFirstDay);
  }

  selectDay(date: moment.Moment): void {
    const value = this.calendarDate.value.set({
      date: date.date(),
      month: date.month(),
      year: date.year()
    });
    this.calendarDate.next(value);
  }
}
