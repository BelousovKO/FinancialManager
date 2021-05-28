import { Component, OnInit } from '@angular/core';
import {UserDataService} from '../services/user-data.service';
import {AuthorizationService} from '../services/authorization.service';

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
    this.data.balance.subscribe(this.changeColorBalance.bind(this));
  }

  changeColorBalance(): any {
    this.balance = this.data.balance.value;
    this.data.balance.value >= 0 ? this.colorBalance = 'color: green' : this.colorBalance = 'color: red';
  }

  exit(): any {
    this.authorization.login = false;
    this.authorization.username = '';
    localStorage.removeItem('token');
    this.data.transactionsAll = 0;
    this.data.sumTransaction = [];
  }

}
