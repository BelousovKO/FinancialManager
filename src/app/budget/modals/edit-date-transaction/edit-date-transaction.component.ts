import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../../../services/date.service';

@Component({
  selector: 'app-edit-date-transaction',
  templateUrl: './edit-date-transaction.component.html',
  styleUrls: ['./edit-date-transaction.component.scss']
})
export class EditDateTransactionComponent implements OnInit {

  @Input() transactionDate: moment.Moment;
  @Input() backgroundColor: string;
  @Output() closeChoiceDate: EventEmitter<any> = new EventEmitter();

  public modalCalendar = false;
  public yesterday = moment().add(-1, 'day');
  public today = moment();

  constructor(public dateService: DateService) { }

  ngOnInit(): void {
  }

  close(newDate: moment.Moment): void {
    this.closeChoiceDate.emit(newDate);
  }
}
