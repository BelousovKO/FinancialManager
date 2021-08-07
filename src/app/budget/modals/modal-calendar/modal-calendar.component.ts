import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DateService} from '../../../services/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-calendar',
  templateUrl: './modal-calendar.component.html',
  styleUrls: ['./modal-calendar.component.scss']
})
export class ModalCalendarComponent {

  @Input() backgroundColor: string;
  @Input() date: moment.Moment;
  @Output() closeModalCalendar: EventEmitter<any> = new EventEmitter();

  public destroy = false;

  constructor(public dateService: DateService) { }

  close(): void {
    this.date = this.dateService.calendarDate.value;
    this.dateService.dateFilter = 'd';
    this.closeModalCalendar.emit(this.date);
  }
}
