import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {DateService} from './date.service';
import {AuthorizationService} from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public demo = false;
  public userId: string;
  public transactions = [];
  public costs = [];
  public income = [];
  public sumIncome = 0;
  public sumCosts = 0;
  public costsCategorySums = [];
  public incomeCategorySums = [];
  public balance = 0;
  public interface = [];
  public interfaceCosts = [];
  public interfaceIncome = [];
  public editState = false;
  public loading = false;
  public demoData = {userData: {
      userId: 'demo',
      interface: {
        expense: [
          {
            title: 'Продукты',
            color: '#ce4b99',
            icon: 'add_shopping_cart'
          },
          {
            title: 'Квартплата',
            color: '#b1c94e',
            icon: 'apartment'
          },
          {
            title: 'Досуг',
            color: '#563227',
            icon: 'outdoor_grill'
          },
          {
            title: 'Транспорт',
            color: '#cf7e1a',
            icon: 'drive_eta'
          },
          {
            title: 'Здоровье',
            color: '#601480',
            icon: 'local_hospital'
          },
          {
            title: 'Подарки',
            color: '#377bbc',
            icon: 'cake'
          },
          {
            title: 'Семья',
            color: '#A50606',
            icon: 'family_restroom'
          },
          {
            title: 'Покупки',
            color: '#138539',
            icon: 'local_grocery_store'
          },
          {
            title: '',
            color: '#00B7C6',
            icon: 'beach_access'
          },
          {
            title: '',
            color: '#EA09B9',
            icon: 'ac_unit'
          },
          {
            title: '',
            color: '#d0db00',
            icon: 'fitness_center'
          },
          {
            title: '',
            color: '#09EA9B',
            icon: 'hiking'
          }
        ],
        income: [
          {
            title: 'Зарплата',
            color: '#155331',
            icon: 'account_balance_wallet'
          },
          {
            title: '',
            color: '#b1c94e',
            icon: 'paid'
          },
          {
            title: '',
            color: '#257d7e',
            icon: 'credit_card'
          },
          {
            title: '',
            color: '#05a335',
            icon: 'account_balance'
          },
          {
            title: '',
            color: '#34d5ba',
            icon: 'savings'
          },
          {
            title: '',
            color: '#3ea22a',
            icon: 'card_giftcard'
          }
        ]
      },
      transactions: []
    }};


  constructor(public dateService: DateService,
              public authorization: AuthorizationService) {
  }

  updateUserData(response): void {
    this.transactions = response.userData.transactions;
    this.interfaceCosts = response.userData.interface.expense;
    this.interfaceIncome = response.userData.interface.income;
    this.userId = response.userData.userId;
  }

  dataGeneration(): void {
    this.costs = [];
    this.income = [];
    this.costsCategorySums = [];
    this.incomeCategorySums = [];
    this.costs = this.transactions.filter(e => e.type === 'cost');
    this.income = this.transactions.filter(e => e.type === 'income');
    switch (this.dateService.dateFilter) {
      case 'i':
        this.balance = this.balanceGenerate();
        break;
      case 'd':
        this.filteredTransactions('DD-MM-YYYY');
        break;
      case 't':
        this.filteredTransactions('DD-MM-YYYY');
        break;
      case 'm':
        this.filteredTransactions('MM-YYYY');
        break;
      case 'y':
        this.filteredTransactions('YYYY');
        break;
      case 'w':
        this.costs = this.costs.filter(e => this.conditionWeek(e));
        this.income = this.income.filter(e => this.conditionWeek(e));
        this.balance = this.balanceGenerate();
        break;
      case 'r':
        this.costs = this.costs.filter(e => this.conditionRange(e));
        this.income = this.income.filter(e => this.conditionRange(e));
        this.balance = this.balanceGenerate();
        break;
    }
  }

  conditionWeek(e): boolean {
    return moment(e.date).format('x') >= this.dateService.date.value.clone().startOf('week').format('x') &&
      moment(e.date).format('x') <= this.dateService.date.value.clone().endOf('week').format('x');
  }

  conditionRange(e): boolean {
    return moment(e.date).format('x') >= this.dateService.choiceFirstDay.startOf('day').format('x') &&
      moment(e.date).format('x') <= this.dateService.choiceLastDay.endOf('day').format('x');
  }

  filteredTransactions(format: string): void {
    this.costs = this.costs.filter(e =>
      moment(e.date).format(format) === this.dateService.date.value.clone().format(format));
    this.income = this.income.filter(e =>
      moment(e.date).format(format) === this.dateService.date.value.clone().format(format));
    this.balance = this.balanceGenerate();
  }

  balanceGenerate(): number {
    this.sumIncome = this.income.reduce((total, amount) => total + amount.amount, 0);
    this.sumCosts = this.costs.reduce((total, amount) => total + amount.amount, 0);
    this.sumsCategoryTransactions();
    return this.sumIncome - this.sumCosts;
  }

  sumsCategoryTransactions(): void {
    this.interfaceCosts.forEach((elem, idx) => {
      this.costsCategorySums.push(this.costs.filter(e => e.category === idx).reduce((total, amount) => total + amount.amount, 0));
    });
    this.interfaceIncome.forEach((elem, idx) => {
      this.incomeCategorySums.push(this.income.filter(e => e.category === idx).reduce((total, amount) => total + amount.amount, 0));
    });
  }

  createDemoData(): void {
    localStorage.setItem('demo', 'true');
    this.demo = true;
    this.authorization.username = 'demo';
    this.authorization.login = true;
    localStorage.getItem('demoData') ?
      this.demoData = JSON.parse(localStorage.getItem('demoData')) :
      localStorage.setItem('demoData', JSON.stringify(this.demoData));
    this.updateUserData(this.demoData);
  }
}
