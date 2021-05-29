import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {UserDataService} from '../services/user-data.service';
import {DateService} from '../services/date.service';

@Component({
  selector: 'app-modal-date-filter',
  templateUrl: './modal-date-filter.component.html',
  styleUrls: ['./modal-date-filter.component.scss']
})
export class ModalDateFilterComponent implements OnInit {

  @Input() modalDateFilter: boolean;

  constructor(public data: UserDataService,
              public dateService: DateService) { }

  public modalChooseRange = false;
  public modalChoiceDay = false;
  public today = {
    today: moment().format('DD MMMM Y'),
    firstDayOfWeek: moment().startOf('week').format('D'),
    lastDayOfWeek: moment().endOf('week').format('D MMMM'),
    lastDayOfMonth: moment().endOf('month').format('D'),
    month: moment().format('MMMM Y'),
    year: moment().format('Y')
  };

  ngOnInit(): void {
    this.data.dateFilter.subscribe(this.iii());
  }

  iii(): any {
    console.log('DF in modal-data filter: ', this.data.dateFilter.value);
  }
}
