import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserDataService} from '../../../services/user-data.service';
import {ChangeInterface} from '../../../services/change-interface';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() indexCategory: number;
  @Input() interface: any;
  @Output() closeEditCategory: EventEmitter<any> = new EventEmitter();

  public titleCategory: string;
  public iconCategory: string;
  public modalChangeIcon = false;
  public color: string;
  private token = localStorage.getItem('token');

  constructor(public userData: UserDataService,
              public changeInterface: ChangeInterface) {
  }

  ngOnInit(): void {
    this.titleCategory = this.interface[this.indexCategory].title;
    this.iconCategory = this.interface[this.indexCategory].icon;
    this.color = this.interface[this.indexCategory].color;
  }

  backgroundColor(): string {
    return `background-${this.colorCategory()}`;
  }

  colorCategory(): string {
    return `color: ${this.color}`;
  }

  inputHandlerCategory(event: any): any {
    this.titleCategory = event.target.value;
  }

  editCategory(): void {
    this.userData.loading = true;
    let typeCategory: string;
    if (this.interface.length === 6) {
      this.userData.interfaceIncome[this.indexCategory].title = this.titleCategory;
      this.userData.interfaceIncome[this.indexCategory].icon = this.iconCategory;
      this.userData.interfaceIncome[this.indexCategory].color = this.color;
      typeCategory = 'income';
    } else {
      this.userData.interfaceCosts[this.indexCategory].title = this.titleCategory;
      this.userData.interfaceCosts[this.indexCategory].icon = this.iconCategory;
      this.userData.interfaceCosts[this.indexCategory].color = this.color;
      typeCategory = 'cost';
    }
    if (this.userData.demo) {
      const demoData = JSON.parse(localStorage.getItem('demoData'));
      this.interface.length === 6 ?
        demoData.userData.interface.income = this.userData.interfaceIncome :
        demoData.userData.interface.expense = this.userData.interfaceCosts;
      localStorage.setItem('demoData', JSON.stringify(demoData));
      this.userData.loading = false;
      this.closeEditCategory.emit();
      return;
    }
    const body = {userId: this.userData.userId, interface: this.interface, typeInterface: typeCategory, token: this.token};
    this.changeInterface.change(body)
      .subscribe(
        response => {
          this.userData.loading = false;
          if (response.status === 'OK') {
            this.closeEditCategory.emit();
          }
        }
      );
  }

  changeIcon(newValues: any): void {
    this.iconCategory = newValues[0];
    this.color = newValues[1];
    this.modalChangeIcon = false;
  }
}
