import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../../../services/date.service';
import 'moment/locale/ru';

interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  public calendar: Week[];
  private subs;

  constructor(private dateService: DateService) {
  }

  ngOnInit(): void {
    this.subs = this.dateService.calendarDate.subscribe(this.generate.bind(this));
  }

  generate(now: moment.Moment): void {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');
    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];
    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');
            return {
              value, active, disabled, selected
            };
          })
      });
    }
    this.calendar = calendar;
  }

  select(day: moment.Moment): void {
    this.dateService.selectDay(day);
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
