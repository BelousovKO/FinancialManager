import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../../../services/date.service';

@Component({
  selector: 'app-edit-date-transaction',
  templateUrl: './edit-date-transaction.component.html',
  styleUrls: ['./edit-date-transaction.component.scss']
})
export class EditDateTransactionComponent {

  @Input() transactionDate: moment.Moment;
  @Input() backgroundColor: string;
  @Output() closeChoiceDate: EventEmitter<any> = new EventEmitter();

  public modalCalendar = false;
  public yesterday = moment().add(-1, 'day');
  public today = moment();
  public dataFilter = this.dateService.dateFilter;

  constructor(public dateService: DateService) { }

  close(newDate: moment.Moment): void {
    this.closeChoiceDate.emit(newDate);
    this.dateService.dateFilter = this.dataFilter;
  }
}
