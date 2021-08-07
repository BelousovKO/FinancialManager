import {Component, EventEmitter, Output} from '@angular/core';
import {DateService} from '../../../services/date.service';
import * as moment from 'moment';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-date-filtering',
  templateUrl: './date-filtering.component.html',
  styleUrls: ['./date-filtering.component.scss'],
  animations: [trigger('myAnimation', [
    transition(':enter', [
      style({transform: 'translateY(-100%)', opacity: 0}),
      animate('.2s', style({transform: 'translateY(0)', opacity: 1})),
    ])
  ])]
})
export class DateFilteringComponent {

  @Output() closeDateFiltering: EventEmitter<any> = new EventEmitter();

  public today = moment();

  constructor(public dateService: DateService) {
  }
}
