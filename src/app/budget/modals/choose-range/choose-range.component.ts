import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DateService} from '../../../services/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-choose-range',
  templateUrl: './choose-range.component.html',
  styleUrls: ['./choose-range.component.scss']
})
export class ChooseRangeComponent implements OnInit {

  @Output() closeChooseRange: EventEmitter<any> = new EventEmitter();

  public modalCalendar = false;
  public date: moment.Moment;
  public day: string;

  constructor(public dateService: DateService) {
  }

  ngOnInit(): void {
  }

  close(rangeDate: moment.Moment): void {
    this.day === 'first' ? this.dateService.choiceFirstDay = rangeDate : this.dateService.choiceLastDay = rangeDate;
    this.dateService.calendarDate.next(moment());
    this.modalCalendar = false;
  }
}
