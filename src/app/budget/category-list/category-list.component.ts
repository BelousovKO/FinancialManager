import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UserDataService} from '../../services/user-data.service';
import {DateService} from '../../services/date.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  public interface = [];
  public typeTransactions = 'cost';
  public modal = false;
  public createCategory = false;
  public indexCategory: number;
  private subs;

  constructor(public userData: UserDataService,
              public dateService: DateService) {
  }

  ngOnInit(): void {
    this.subs = this.dateService.date.subscribe(this.interfaceUpdate.bind(this));
  }

  interfaceUpdate(): void {
    this.typeTransactions === 'cost' ? this.interface = this.userData.interfaceCosts : this.interface = this.userData.interfaceIncome;
    this.userData.dataGeneration();
  }

  sumsCategory(): object {
    if (this.typeTransactions === 'cost') {
      return this.userData.costsCategorySums;
    }
    return this.userData.incomeCategorySums;
  }

  backgroundColor(idx: number): string {
    return `background-${this.color(idx)}`;
  }

  color(idx: number): string {
    return `color: ${this.interface[idx].color}`;
  }

  toggleTypeTransactions(): void {
    this.typeTransactions === 'cost' ? this.typeTransactions = 'income' : this.typeTransactions = 'cost';
    this.interfaceUpdate();
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
