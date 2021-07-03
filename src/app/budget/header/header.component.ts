import { Component, OnInit } from '@angular/core';
import {UserDataService} from '../../services/user-data.service';
import {AuthorizationService} from '../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userData: UserDataService,
              public authorization: AuthorizationService) { }

  ngOnInit(): void {
    this.userData.dataGeneration();
  }

  exit(): void {
    this.userData.demo = false;
    this.userData.transactions = [];
    this.userData.interfaceCosts = [];
    this.userData.interfaceIncome = [];
    this.authorization.login = false;
    this.authorization.username = '';
    localStorage.removeItem('token');
    localStorage.removeItem('demo');
  }
}
