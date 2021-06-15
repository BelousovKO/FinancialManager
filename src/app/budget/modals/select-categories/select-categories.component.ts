import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserDataService} from '../../../services/user-data.service';

@Component({
  selector: 'app-select-categories',
  templateUrl: './select-categories.component.html',
  styleUrls: ['./select-categories.component.scss']
})
export class SelectCategoriesComponent implements OnInit {

  @Input() interface: any;
  @Input() indexCategory: number;
  @Output() closeSelectCategories: EventEmitter<any> = new EventEmitter();
  @Output() selectedCategories: EventEmitter<any> = new EventEmitter();

  public categoriesSums = [];
  public lengthActiveInterface: number;

  constructor(public userData: UserDataService) {
  }

  ngOnInit(): void {
    this.interface.length === 6 ?
      this.categoriesSums = this.userData.incomeCategorySums :
      this.categoriesSums = this.userData.costsCategorySums;
    this.lengthActiveInterface = this.interface.length;
  }

  color(idx: number): string {
    return `color: ${this.interface[idx].color}`;
  }

  backgroundColor(idx: number): string {
    return `background-${this.color(idx)}`;
  }

  toggleInterface(length: number): void {
    length === 6 ? this.interface = this.userData.interfaceIncome : this.interface = this.userData.interfaceCosts;
  }
}
