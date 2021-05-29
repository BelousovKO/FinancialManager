import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';
import {UserDataService} from '../services/user-data.service';
import {DateService} from '../services/date.service';

@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss']
})
export class DateControlComponent implements OnInit {

  public dateFilter = this.data.dateFilter.value;
  public modalDateFilter = false;
  public lastDayWeek: moment.Moment;
  public lastDayMonth: moment.Moment;
  public firstDayWeek: moment.Moment;

  constructor(public data: UserDataService,
              public dateService: DateService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generateDate.bind(this));
  }

  generateDate(now: moment.Moment): void {
    moment.locale('ru');
    this.firstDayWeek = now.clone().startOf('week');
    this.lastDayWeek = now.clone().endOf('week');
    this.lastDayMonth = now.clone().endOf('month');
  }

  go(dir: number): void {

    switch (this.data.dateFilter.value) {
      case 't':
        this.dateService.changeDay(dir);
        break;
      case 'd':
        this.dateService.changeDay(dir);
        break;
      case 'w':
        this.dateService.changeWeek(dir);
        break;
      case 'm':
        this.dateService.changeMonth(dir);
        break;
      case 'y':
        this.dateService.changeYear(dir);
        break;
      case 'r':
        this.dateService.changeRange(dir);
        this.ngOnInit();
        break;
    }
  }

  backToNowDate(): void {
    this.dateService.backToToday();
  }

  clearChoiceDate(): void {
    this.data.choiceFirstDay = moment();
    this.data.choiceLastDay = moment();
    this.backToNowDate();
  }

}
