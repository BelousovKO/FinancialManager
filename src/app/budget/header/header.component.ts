import { Component, computed, inject, OnInit } from '@angular/core';
import {UserDataService} from '../../services/user-data.service';
import {AuthorizationService} from '../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _userData = inject(UserDataService);
  private _authorization = inject(AuthorizationService);

  /** Активировано ли редактирование категорий */
  isEditState = computed<boolean>(() => this._userData.editState());
  /** Баланс */
  balance = computed<number>(() => this._userData.balance());
  /** Положительный ли баланс */
  isBalancePositive = computed<boolean>(() => this.balance() >= 0);
  
  /** Имя пользователя */
  get username(): string {
    return this._authorization.username;
  }

  /** @inheritdoc */
  ngOnInit(): void {
    this._userData.dataGeneration();
  }

  /** Разлогин */
  exit(): void {
    this._userData.demo = false;
    this._userData.transactions = [];
    this._userData.interfaceCosts = [];
    this._userData.interfaceIncome = [];
    this._authorization.login = false;
    this._authorization.username = '';
    localStorage.removeItem('token');
    localStorage.removeItem('demo');
  }

  /** Переключение режима редактирования категорий */
  toggleEditState(): void {
    this._userData.toggleEditState();
  }
}
