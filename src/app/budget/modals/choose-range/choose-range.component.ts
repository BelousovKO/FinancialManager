import {Component, EventEmitter, Output} from '@angular/core';
import {DateService} from '../../../services/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-choose-range',
  templateUrl: './choose-range.component.html',
  styleUrls: ['./choose-range.component.scss']
})
export class ChooseRangeComponent {

  @Output() closeChooseRange: EventEmitter<any> = new EventEmitter();

  public modalCalendar = false;
  public date: moment.Moment;
  public day: string;

  constructor(public dateService: DateService) {
  }

  close(rangeDate: moment.Moment): void {
    this.day === 'first' ? this.dateService.choiceFirstDay = rangeDate : this.dateService.choiceLastDay = rangeDate;
    this.dateService.calendarDate.next(moment());
    this.modalCalendar = false;
  }
}
