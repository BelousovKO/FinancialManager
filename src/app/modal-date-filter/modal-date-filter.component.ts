import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {UserDataService} from '../services/user-data.service';
import {DateService} from '../services/date.service';

@Component({
  selector: 'app-modal-date-filter',
  templateUrl: './modal-date-filter.component.html',
  styleUrls: ['./modal-date-filter.component.scss']
})
export class ModalDateFilterComponent implements OnInit {

  @Output() closeModalDataFilter: EventEmitter<any> = new EventEmitter();

  constructor(public data: UserDataService,
              public dateService: DateService) { }

  public modalChooseRange = false;
  public modalChoiceDay = false;
  public modalDateFilter = true;
  public today = {
    today: moment().format('DD MMMM Y'),
    firstDayOfWeek: moment().startOf('week').format('D'),
    lastDayOfWeek: moment().endOf('week').format('D MMMM'),
    lastDayOfMonth: moment().endOf('month').format('D'),
    month: moment().format('MMMM Y'),
    year: moment().format('Y')
  };

  ngOnInit(): void { }
}
