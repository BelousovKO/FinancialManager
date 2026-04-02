import {
  Component,
  computed,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { DateService } from '../../services/date.service';
import { Transaction } from '../models';
import { Category } from 'src/app/models';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  private _userData = inject(UserDataService);
  private _dateService = inject(DateService);
  // TODO Задать тип и исправить подписку
  private _subs: any;

  /** Активировано ли редактирование категорий */
  isEditState = computed<boolean>(() => this._userData.editState());

  /** Список категорий */
  categories: Category[] = [];
  /** Тип транзакции траты/поступления */
  typeTransactions: Transaction = 'cost';
  /** Индекс активной категории */
  indexCategory = 0;
  /** Редактируется ли категория */
  isEditCategory = false;
  /** Добаляется ли транзакция */
  isAddTransaction = false;

  /** @inheritdoc */
  ngOnInit(): void {
    this._subs = this._dateService.date.subscribe(
      this.interfaceUpdate.bind(this),
    );
  }

  /** @inheritdoc */
  ngOnDestroy(): void {
    if (this._subs) {
      this._subs.unsubscribe();
    }
  }

  /** Список сумм категорий */
  sumsCategory(): number[] {
    return this.typeTransactions === 'cost'
      ? this._userData.costsCategorySums
      : this._userData.incomeCategorySums;
  }

  /** Сумма категории */
  sumCategory(index: number): number {
    return this.typeTransactions === 'cost'
      ? this._userData.costsCategorySums[index]
      : this._userData.incomeCategorySums[index];
  }

  /** Событие клика по категории */
  clickToCategory(index: number): void {
    this.indexCategory = index;

    if (this.isEditState() || !this.categories[index].title) {
      this.isEditCategory = true;
    } else {
      this.isAddTransaction = true;
    }
  }

  /** Закрытие модального окна */
  closeModal(): void {
    this.isEditCategory = false;
    this.isAddTransaction = false;
    this.interfaceUpdate();
  }

  /** Отображать ли кнопку добавления категории */
  isShowAddButton(index: number): boolean {
    return (
      !this.categories[index].title &&
      !!this.categories[index - 1].title &&
      !this.isEditState()
    );
  }

  backgroundColor(index: number): string {
    return `background-${this.color(index)}`;
  }

  color(index: number): string {
    return `color: ${this.categories[index].color}`;
  }

  toggleTypeTransactions(): void {
    this.typeTransactions === 'cost'
      ? (this.typeTransactions = 'income')
      : (this.typeTransactions = 'cost');

    this.interfaceUpdate();
  }

  private interfaceUpdate(): void {
    this.typeTransactions === 'cost'
      ? (this.categories = this._userData.interfaceCosts)
      : (this.categories = this._userData.interfaceIncome);
    this._userData.dataGeneration();
  }
}
