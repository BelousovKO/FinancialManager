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

  public colorBalance = 'color: black';
  public balance = 0;

  constructor(public data: UserDataService,
              public authorization: AuthorizationService) { }

  ngOnInit(): void {
    this.data.balance.pipe(debounceTime(0)).subscribe(this.changeColorBalance.bind(this));
  }

  changeColorBalance(): any {
    this.balance = this.data.balance.value;
    this.data.balance.value >= 0 ? this.colorBalance = 'color: #7cbc7c' : this.colorBalance = 'color: #e58181';
  }

  exit(): any {
    this.authorization.login = false;
    this.authorization.username = '';
    localStorage.removeItem('token');
    this.data.transactionsAll = 0;
    this.data.sumTransaction = [];
  }

}
