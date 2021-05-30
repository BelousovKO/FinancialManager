import {Component, OnInit} from '@angular/core';
import {DateService} from '../services/date.service';
import * as moment from 'moment';
import 'moment/locale/ru';
import {UserDataService} from '../services/user-data.service';

@Component({
  selector: 'app-choose-range',
  templateUrl: './choose-range.component.html',
  styleUrls: ['./choose-range.component.scss']
})
export class ChooseRangeComponent implements OnInit {

  constructor(public dateService: DateService,
              public userData: UserDataService) {
  }

  public firstDayRange = moment();
  public lastDayRange = moment();
  public ChoiceDayRange = moment();
  public modalChoiceDay = false;
  public headerFirstDay = false;
  public headerLastDay = false;

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generateDate.bind(this));
  }

  generateDate(now: moment.Moment): void {
    moment.locale('ru');
    this.ChoiceDayRange = now.clone();
  }

  choiceFirstDay(): void {
    moment.locale('ru');
    this.firstDayRange = this.ChoiceDayRange.clone();
    this.userData.choiceFirstDay = this.firstDayRange;
  }

  choiceLastDay(): void {
    moment.locale('ru');
    this.lastDayRange = this.ChoiceDayRange.clone();
    this.userData.choiceLastDay = this.lastDayRange;
  }
}
