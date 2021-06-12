import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DateService} from '../../../services/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-date-filtering',
  templateUrl: './date-filtering.component.html',
  styleUrls: ['./date-filtering.component.scss']
})
export class DateFilteringComponent implements OnInit {

  @Output() closeDateFiltering: EventEmitter<any> = new EventEmitter();

  public today = moment();

  constructor(public dateService: DateService) { }

  ngOnInit(): void {
  }
}
