import { Component, OnInit } from '@angular/core';
import {UserDataService} from '../services/user-data.service';
import {AuthorizationService} from '../services/authorization.service';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public balance = this.data.balance.value;

  constructor(public data: UserDataService,
              public authorization: AuthorizationService) { }

  ngOnInit(): void {
    this.data.balance.pipe(debounceTime(0)).subscribe(this.changeBalance.bind(this));
  }

  changeBalance(): any {
    this.balance = this.data.balance.value;
  }

  exit(): any {
    this.authorization.login = false;
    this.authorization.username = '';
    localStorage.removeItem('token');
    this.data.transactionsAll = 0;
    this.data.sumTransaction = [];
  }

}
