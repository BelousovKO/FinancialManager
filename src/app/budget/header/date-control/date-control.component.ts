import { Component, OnInit } from '@angular/core';
import {DateService} from '../../../services/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss']
})
export class DateControlComponent implements OnInit {

  public modalDateFiltering = false;
  public modalCalendar = false;
  public modalChooseRange = false;

  constructor(public dateService: DateService) { }

  ngOnInit(): void {
  }

  closeDateFiltering(modal?: string): void {
    this.modalDateFiltering = false;
    if (modal === 'calendar') {
      this.modalCalendar = true;
    }
    if (modal === 'range') {
      this.modalChooseRange = true;
    }
  }

  closeCalendar(newDate: moment.Moment): void {
    this.dateService.date.next(newDate);
    this.modalCalendar = false;
  }

  closeChooseRange(selected: boolean): void {
    this.modalChooseRange = false;
    if (selected) {
      if (this.dateService.choiceFirstDay.format('x') > this.dateService.choiceLastDay.format('x')) {
        const temp = this.dateService.choiceFirstDay;
        this.dateService.choiceFirstDay = this.dateService.choiceLastDay;
        this.dateService.choiceLastDay = temp;
      }
      this.dateService.dateFilter = 'r';
      this.dateService.date.next(this.dateService.choiceFirstDay);
    }
  }
}
